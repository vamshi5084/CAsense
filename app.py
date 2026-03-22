from flask import Flask, render_template, request, redirect, session, url_for, jsonify, send_from_directory, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import sqlite3
import os
import random
import json

from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv

# Load secret environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder="static")
app.secret_key = os.environ.get("SECRET_KEY", "cAsense_secret_key_2026")

DATABASE = "database.db"
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'pdf'}

from google import genai
from google.genai import types

# ──────────────── GEMINI AI CONFIG ──────────────── #
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
try:
    if GEMINI_API_KEY:
        gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    else:
        print("Warning: GEMINI_API_KEY not found in environment.")
        gemini_client = None
except Exception as e:
    print("Error initializing Gemini:", str(e))
    gemini_client = None

# ──────────────── SUPPORTED LANGUAGES ──────────────── #
SUPPORTED_LANGUAGES = {
    'english':  {'name': 'English',    'native': 'English',   'instruction': 'Respond in English.'},
    'telugu':   {'name': 'Telugu',     'native': 'తెలుగు',     'instruction': 'Respond entirely in Telugu (తెలుగు). Use Telugu script.'},
    'hindi':    {'name': 'Hindi',      'native': 'हिन्दी',      'instruction': 'Respond entirely in Hindi (हिन्दी). Use Devanagari script.'},
    'tamil':    {'name': 'Tamil',      'native': 'தமிழ்',      'instruction': 'Respond entirely in Tamil (தமிழ்). Use Tamil script.'},
    'urdu':     {'name': 'Urdu',       'native': 'اردو',       'instruction': 'Respond entirely in Urdu (اردو). Use Urdu/Nastaliq script.'},
    'kannada':  {'name': 'Kannada',    'native': 'ಕನ್ನಡ',      'instruction': 'Respond entirely in Kannada (ಕನ್ನಡ). Use Kannada script.'},
}

# ──────────────── DATABASE INITIALIZATION ──────────────── #

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT DEFAULT '',
            password TEXT,
            country TEXT DEFAULT 'India'
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            type TEXT,
            category TEXT,
            amount REAL,
            date TEXT,
            description TEXT DEFAULT ''
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS bills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            filename TEXT,
            original_name TEXT,
            description TEXT DEFAULT '',
            upload_date TEXT
        )
    ''')

    # Migrations for existing DBs
    for col, sql in [
        ('description', "ALTER TABLE transactions ADD COLUMN description TEXT DEFAULT ''"),
        ('country', "ALTER TABLE users ADD COLUMN country TEXT DEFAULT 'India'"),
        ('email', "ALTER TABLE users ADD COLUMN email TEXT DEFAULT ''"),
    ]:
        try:
            c.execute(sql)
        except sqlite3.OperationalError:
            pass  # Column already exists

    conn.commit()
    conn.close()

# Supported countries and their currency symbols
COUNTRIES = {
    'India':     {'symbol': '₹', 'currency': 'INR'},
    'USA':       {'symbol': '$', 'currency': 'USD'},
    'UK':        {'symbol': '£', 'currency': 'GBP'},
    'Canada':    {'symbol': 'C$', 'currency': 'CAD'},
    'Australia': {'symbol': 'A$', 'currency': 'AUD'},
    'Germany':   {'symbol': '€', 'currency': 'EUR'},
}

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ──────────────── LOGIN REQUIRED DECORATOR ──────────────── #

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

# ──────────────── CACHE CONTROL (LOGOUT SECURITY) ──────────────── #

@app.after_request
def add_cache_control(response):
    """Prevent browser from caching pages so back button after logout won't show dashboard."""
    if 'text/html' in response.content_type:
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    return response

# ──────────────── HOME ──────────────── #

@app.route("/")
def home():
    return render_template("index.html")

# ──────────────── REGISTER ──────────────── #

@app.route("/register", methods=["GET", "POST"])
def register():
    error = None

    if request.method == "POST":
        username = request.form["username"].strip()
        email = request.form.get("email", "").strip()
        password = request.form["password"]
        confirm_password = request.form.get("confirm_password", "")

        if len(username) < 3:
            error = "Username must be at least 3 characters"
        elif not email or '@' not in email:
            error = "Please enter a valid email address"
        elif len(password) < 4:
            error = "Password must be at least 4 characters"
        elif password != confirm_password:
            error = "Passwords do not match"
        else:
            conn = get_db()
            c = conn.cursor()

            c.execute("SELECT * FROM users WHERE username=?", (username,))
            existing_user = c.fetchone()

            if existing_user:
                error = "Username already exists"
                conn.close()
            else:
                c.execute("SELECT * FROM users WHERE email=?", (email,))
                if c.fetchone():
                    error = "This email is already registered"
                    conn.close()
                else:
                    # Create account immediately
                    hashed_pw = generate_password_hash(password)
                    try:
                        c.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                                  (username, email, hashed_pw))
                        conn.commit()
                        conn.close()
                        return redirect("/login")
                    except sqlite3.IntegrityError:
                        conn.close()
                        error = "An error occurred. Please try again."

    return render_template("register.html", error=error)

# ──────────────── LOGIN ──────────────── #

@app.route("/login", methods=["GET", "POST"])
def login():
    error = None

    if request.method == "POST":
        login_id = request.form["username"].strip()
        password = request.form["password"]

        conn = get_db()
        c = conn.cursor()

        # Allow login by username OR email
        c.execute("SELECT * FROM users WHERE username=? OR email=?", (login_id, login_id))
        user = c.fetchone()
        conn.close()

        if user:
            if check_password_hash(user["password"], password):
                session["user_id"] = user["id"]
                session["username"] = user["username"]
                session["country"] = user["country"] or "India"
                return redirect("/dashboard")
            else:
                error = "Incorrect password"
        else:
            error = "User does not exist"

    return render_template("login.html", error=error)

# ──────────────── LOGOUT ──────────────── #

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

# ──────────────── ADD TRANSACTION ──────────────── #

@app.route("/add", methods=["POST"])
@login_required
def add_transaction():
    t_type = request.form["type"]
    category = request.form["category"].strip()
    amount = float(request.form["amount"])
    date = request.form["date"]
    description = request.form.get("description", "").strip()

    conn = get_db()
    c = conn.cursor()
    c.execute(
        "INSERT INTO transactions (user_id, type, category, amount, date, description) VALUES (?, ?, ?, ?, ?, ?)",
        (session["user_id"], t_type, category, amount, date, description)
    )
    conn.commit()
    conn.close()

    return redirect("/dashboard")

# ──────────────── DELETE TRANSACTION ──────────────── #

@app.route("/delete/<int:txn_id>", methods=["POST"])
@login_required
def delete_transaction(txn_id):
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM transactions WHERE id=? AND user_id=?", (txn_id, session["user_id"]))
    conn.commit()
    conn.close()

    return redirect("/dashboard")

# ──────────────── UPDATE COUNTRY ──────────────── #

@app.route("/update-country", methods=["POST"])
@login_required
def update_country():
    country = request.form.get("country", "India")
    if country not in COUNTRIES:
        country = "India"

    conn = get_db()
    c = conn.cursor()
    c.execute("UPDATE users SET country=? WHERE id=?", (country, session["user_id"]))
    conn.commit()
    conn.close()

    session["country"] = country
    return redirect("/dashboard")

# ──────────────── BILL UPLOAD ──────────────── #

@app.route("/upload-bill", methods=["POST"])
@login_required
def upload_bill():
    if 'bill_file' not in request.files:
        return redirect("/dashboard")

    file = request.files['bill_file']
    if file.filename == '':
        return redirect("/dashboard")

    if file and allowed_file(file.filename):
        original_name = file.filename
        # Create unique filename
        ext = original_name.rsplit('.', 1)[1].lower()
        unique_name = f"{session['user_id']}_{datetime.now().strftime('%Y%m%d%H%M%S')}_{random.randint(1000,9999)}.{ext}"
        filepath = os.path.join(UPLOAD_FOLDER, unique_name)
        file.save(filepath)

        description = request.form.get("bill_description", "").strip()
        upload_date = request.form.get("bill_date", datetime.now().strftime("%Y-%m-%d"))

        conn = get_db()
        c = conn.cursor()
        c.execute(
            "INSERT INTO bills (user_id, filename, original_name, description, upload_date) VALUES (?, ?, ?, ?, ?)",
            (session["user_id"], unique_name, original_name, description, upload_date)
        )
        conn.commit()
        conn.close()

    return redirect("/dashboard")

# ──────────────── SERVE BILL IMAGES ──────────────── #

@app.route("/bill-image/<filename>")
@login_required
def bill_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ──────────────── DELETE BILL ──────────────── #

@app.route("/delete-bill/<int:bill_id>", methods=["POST"])
@login_required
def delete_bill(bill_id):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT filename FROM bills WHERE id=? AND user_id=?", (bill_id, session["user_id"]))
    bill = c.fetchone()

    if bill:
        filepath = os.path.join(UPLOAD_FOLDER, bill["filename"])
        if os.path.exists(filepath):
            os.remove(filepath)
        c.execute("DELETE FROM bills WHERE id=? AND user_id=?", (bill_id, session["user_id"]))
        conn.commit()

    conn.close()
    return redirect("/dashboard")

# ──────────────── DASHBOARD ──────────────── #

@app.route("/dashboard")
@login_required
def dashboard():
    # Date-range filtering
    from_date = request.args.get('from_date', '')
    to_date = request.args.get('to_date', '')

    conn = get_db()
    c = conn.cursor()

    # Build query with optional date filters
    base_query = "SELECT * FROM transactions WHERE user_id=?"
    sum_query_income = "SELECT SUM(amount) FROM transactions WHERE user_id=? AND type='Income'"
    sum_query_expense = "SELECT SUM(amount) FROM transactions WHERE user_id=? AND type='Expense'"
    params = [session["user_id"]]

    date_filter = ""
    if from_date:
        date_filter += " AND date >= ?"
        params.append(from_date)
    if to_date:
        date_filter += " AND date <= ?"
        params.append(to_date)

    c.execute(base_query + date_filter + " ORDER BY date DESC", params)
    transactions = c.fetchall()

    # Rebuild params for sum queries (user_id + date filters only)
    sum_params = [session["user_id"]]
    if from_date:
        sum_params.append(from_date)
    if to_date:
        sum_params.append(to_date)

    c.execute(sum_query_income + date_filter, sum_params)
    total_income = c.fetchone()[0] or 0

    c.execute(sum_query_expense + date_filter, sum_params)
    total_expense = c.fetchone()[0] or 0

    # Fetch bills
    c.execute("SELECT * FROM bills WHERE user_id=? ORDER BY upload_date DESC", (session["user_id"],))
    bills = c.fetchall()

    conn.close()

    country = session.get("country", "India")
    profit = total_income - total_expense
    tax = calculate_tax(total_income, country)
    currency = COUNTRIES.get(country, {}).get('symbol', '₹')

    return render_template(
        "dashboard.html",
        transactions=transactions,
        total_income=total_income,
        total_expense=total_expense,
        profit=profit,
        tax=tax,
        username=session.get("username", "User"),
        country=country,
        countries=list(COUNTRIES.keys()),
        currency=currency,
        from_date=from_date,
        to_date=to_date,
        bills=bills
    )

# ──────────────── TAX CALCULATION (MULTI-COUNTRY) ──────────────── #

def calculate_tax(income, country='India'):
    """Calculate estimated tax based on country-specific slabs."""

    if country == 'India':
        # India New Tax Regime 2025-26
        if income <= 300000: return 0
        elif income <= 700000: return (income - 300000) * 0.05
        elif income <= 1000000: return 20000 + (income - 700000) * 0.10
        elif income <= 1200000: return 50000 + (income - 1000000) * 0.15
        elif income <= 1500000: return 80000 + (income - 1200000) * 0.20
        else: return 140000 + (income - 1500000) * 0.30

    elif country == 'USA':
        # US Federal Tax Brackets 2024 (Single filer, approximate)
        if income <= 11600: return 0
        elif income <= 47150: return (income - 11600) * 0.12
        elif income <= 100525: return 4266 + (income - 47150) * 0.22
        elif income <= 191950: return 15943 + (income - 100525) * 0.24
        elif income <= 243725: return 37884 + (income - 191950) * 0.32
        elif income <= 609350: return 54454 + (income - 243725) * 0.35
        else: return 182394 + (income - 609350) * 0.37

    elif country == 'UK':
        # UK Income Tax 2024-25
        if income <= 12570: return 0
        elif income <= 50270: return (income - 12570) * 0.20
        elif income <= 125140: return 7540 + (income - 50270) * 0.40
        else: return 37488 + (income - 125140) * 0.45

    elif country == 'Canada':
        # Canadian Federal Tax 2024
        if income <= 55867: return income * 0.15
        elif income <= 111733: return 8380 + (income - 55867) * 0.205
        elif income <= 154906: return 19833 + (income - 111733) * 0.26
        elif income <= 220000: return 31058 + (income - 154906) * 0.29
        else: return 49935 + (income - 220000) * 0.33

    elif country == 'Australia':
        # Australian Tax 2024-25
        if income <= 18200: return 0
        elif income <= 45000: return (income - 18200) * 0.19
        elif income <= 120000: return 5092 + (income - 45000) * 0.325
        elif income <= 180000: return 29467 + (income - 120000) * 0.37
        else: return 51667 + (income - 180000) * 0.45

    elif country == 'Germany':
        # Germany simplified progressive tax
        if income <= 11604: return 0
        elif income <= 17005: return (income - 11604) * 0.14
        elif income <= 66760: return 756 + (income - 17005) * 0.24
        elif income <= 277825: return 12697 + (income - 66760) * 0.42
        else: return 101344 + (income - 277825) * 0.45

    else:
        # Default flat 20%
        return income * 0.20

# ──────────────── CHART DATA API ──────────────── #

@app.route("/api/chart-data")
def chart_data():
    if "user_id" not in session:
        return jsonify({"error": "unauthorized"}), 401

    # Date-range filtering
    from_date = request.args.get('from_date', '')
    to_date = request.args.get('to_date', '')

    conn = get_db()
    c = conn.cursor()

    date_filter = ""
    params = [session["user_id"]]
    if from_date:
        date_filter += " AND date >= ?"
        params.append(from_date)
    if to_date:
        date_filter += " AND date <= ?"
        params.append(to_date)

    # Monthly income & expense
    c.execute(f"""
        SELECT strftime('%Y-%m', date) AS month,
               type,
               SUM(amount) AS total
        FROM transactions
        WHERE user_id=?{date_filter}
        GROUP BY month, type
        ORDER BY month ASC
    """, params)
    rows = c.fetchall()

    # Category breakdown
    c.execute(f"""
        SELECT category, type, SUM(amount) AS total
        FROM transactions
        WHERE user_id=?{date_filter}
        GROUP BY category, type
    """, params)
    category_rows = c.fetchall()

    conn.close()

    # Build monthly data
    monthly = {}
    for row in rows:
        month = row["month"]
        if month not in monthly:
            monthly[month] = {"income": 0, "expense": 0}
        monthly[month][row["type"].lower()] = row["total"]

    months = sorted(monthly.keys())[-12:]  # Last 12 months
    income_data = [monthly.get(m, {}).get("income", 0) for m in months]
    expense_data = [monthly.get(m, {}).get("expense", 0) for m in months]

    # Build category data
    categories = {"income": {}, "expense": {}}
    for row in category_rows:
        t = row["type"].lower()
        if t in categories:
            categories[t][row["category"]] = row["total"]

    return jsonify({
        "months": months,
        "income": income_data,
        "expense": expense_data,
        "categories": categories
    })

# ──────────────── SMART AI CHATBOT (GEMINI-POWERED) ──────────────── #

def get_financial_context():
    """Collect all financial data for the current user to build AI context."""
    conn = get_db()
    c = conn.cursor()
    uid = session["user_id"]

    c.execute("SELECT SUM(amount) FROM transactions WHERE user_id=? AND type='Income'", (uid,))
    income = c.fetchone()[0] or 0

    c.execute("SELECT SUM(amount) FROM transactions WHERE user_id=? AND type='Expense'", (uid,))
    expense = c.fetchone()[0] or 0

    c.execute("SELECT COUNT(*) FROM transactions WHERE user_id=?", (uid,))
    txn_count = c.fetchone()[0] or 0

    c.execute("""
        SELECT category, SUM(amount) as total FROM transactions
        WHERE user_id=? AND type='Expense'
        GROUP BY category ORDER BY total DESC LIMIT 5
    """, (uid,))
    top_expenses = [{"category": r["category"], "total": r["total"]} for r in c.fetchall()]

    c.execute("""
        SELECT category, SUM(amount) as total FROM transactions
        WHERE user_id=? AND type='Income'
        GROUP BY category ORDER BY total DESC LIMIT 5
    """, (uid,))
    top_incomes = [{"category": r["category"], "total": r["total"]} for r in c.fetchall()]

    c.execute("""
        SELECT type, category, amount, date, description FROM transactions
        WHERE user_id=? ORDER BY date DESC LIMIT 10
    """, (uid,))
    recent = [{"type": r["type"], "category": r["category"], "amount": r["amount"],
               "date": r["date"], "description": r["description"]} for r in c.fetchall()]

    today = datetime.now()
    month_start = datetime(today.year, today.month, 1).strftime("%Y-%m-%d")

    c.execute("SELECT SUM(amount) FROM transactions WHERE user_id=? AND type='Income' AND date >= ?", (uid, month_start))
    monthly_income = c.fetchone()[0] or 0

    c.execute("SELECT SUM(amount) FROM transactions WHERE user_id=? AND type='Expense' AND date >= ?", (uid, month_start))
    monthly_expense = c.fetchone()[0] or 0

    conn.close()

    country = session.get("country", "India")
    currency = COUNTRIES.get(country, {}).get('symbol', '₹')
    profit = income - expense
    tax = calculate_tax(income, country)
    savings_rate = (profit / income * 100) if income > 0 else 0

    return {
        "username": session.get("username", "User"),
        "country": country,
        "currency": currency,
        "total_income": income,
        "total_expense": expense,
        "net_profit": profit,
        "estimated_tax": tax,
        "savings_rate": round(savings_rate, 1),
        "transaction_count": txn_count,
        "top_expense_categories": top_expenses,
        "top_income_sources": top_incomes,
        "recent_transactions": recent,
        "this_month_income": monthly_income,
        "this_month_expense": monthly_expense,
        "this_month_profit": monthly_income - monthly_expense,
        "today_date": today.strftime("%Y-%m-%d"),
        "current_month": today.strftime("%B %Y"),
    }


def build_system_prompt(financial_data, language_key):
    """Build a system prompt for OpenAI with user's financial context and language."""
    lang_info = SUPPORTED_LANGUAGES.get(language_key, SUPPORTED_LANGUAGES['english'])
    lang_instruction = lang_info['instruction']

    ctx = financial_data
    currency = ctx['currency']

    top_exp_str = ", ".join([f"{e['category']}: {currency}{e['total']:,.2f}" for e in ctx['top_expense_categories']]) or "None"
    top_inc_str = ", ".join([f"{i['category']}: {currency}{i['total']:,.2f}" for i in ctx['top_income_sources']]) or "None"

    recent_str = ""
    for t in ctx['recent_transactions'][:5]:
        recent_str += f"  - {t['type']}: {currency}{t['amount']:,.2f} ({t['category']}) on {t['date']}\n"
    if not recent_str:
        recent_str = "  No transactions recorded yet.\n"

    system_prompt = f"""You are CAsense AI Assistant — a smart, friendly financial and business advisor.
You are chatting with {ctx['username']} from {ctx['country']}.

{lang_instruction}

=== USER'S FINANCIAL DATA (from CAsense app) ===
- Country: {ctx['country']}
- Currency: {currency}
- Total Income: {currency}{ctx['total_income']:,.2f}
- Total Expenses: {currency}{ctx['total_expense']:,.2f}
- Net Profit/Savings: {currency}{ctx['net_profit']:,.2f}
- Savings Rate: {ctx['savings_rate']}%
- Estimated Tax ({ctx['country']}): {currency}{ctx['estimated_tax']:,.2f}
- Total Transactions: {ctx['transaction_count']}
- This Month ({ctx['current_month']}): Income {currency}{ctx['this_month_income']:,.2f}, Expense {currency}{ctx['this_month_expense']:,.2f}, Net {currency}{ctx['this_month_profit']:,.2f}
- Top Expense Categories: {top_exp_str}
- Top Income Sources: {top_inc_str}
- Recent Transactions:
{recent_str}
=== END FINANCIAL DATA ===

RULES:
1. Always reference the user's actual financial data when answering finance-related questions.
2. Be specific with numbers — use their real income, expenses, profit, tax figures.
3. **PROACTIVE SUGGESTIONS:** At the end of every response, provide 2-3 specific "💡 Smart Tips" or "🚀 Business Suggestions" based on their data.
4. For business questions, provide practical and actionable advice.
5. Be warm, encouraging, and use emojis to make responses engaging.
6. Keep responses concise but comprehensive.
7. If the user has no transactions, encourage them to start tracking.
8. For tax questions, use {ctx['country']}'s tax rules.
10. {lang_instruction}
11. **FORMATTING:** Use Markdown (bold, lists) to make suggestions stand out.
"""
    return system_prompt


@app.route("/chat")
@login_required
def chat():
    """Render chat page."""
    if "chat_history" not in session:
        session["chat_history"] = []
    lang = session.get("chat_language", "english")
    return render_template("chat.html",
                           chat_history=session.get("chat_history", []),
                           username=session.get("username", "User"),
                           current_language=lang,
                           languages=SUPPORTED_LANGUAGES)


@app.route("/api/chat", methods=["POST"])
@login_required
def api_chat():
    """AJAX endpoint for AI chat using OpenAI."""
    data = request.get_json()
    message = data.get("message", "").strip()
    if not message:
        return jsonify({"error": "Empty message"}), 400

    lang = session.get("chat_language", "english")

    try:
        # Collect user's financial data
        financial_data = get_financial_context()

        # Build system prompt with financial context + language
        system_prompt = build_system_prompt(financial_data, lang)

        # Build conversation history for OpenAI
        if gemini_client is None:
            raise Exception("Gemini client not initialized.")
            
        history = session.get("chat_history", [])
        
        # We simulate chat completion using gemini
        conversation_messages = []
        for msg in history[-10:]:  # Last 10 messages for context
            role = "user" if msg["role"] == "user" else "model"
            conversation_messages.append(types.Content(role=role, parts=[types.Part.from_text(text=msg["text"])]))

        conversation_messages.append(types.Content(role="user", parts=[types.Part.from_text(text=message)]))
        
        # Generate response
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=conversation_messages,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=0.7
            )
        )
        
        response_text = response.text

    except Exception as e:
        response_text = f"⚠️ Sorry, I encountered an error computing your financial context. Error: {str(e)}"

    # Store in chat history
    history = session.get("chat_history", [])
    history.append({"role": "user", "text": message})
    history.append({"role": "ai", "text": response_text})
    session["chat_history"] = history[-30:]  # Keep last 30 messages

    return jsonify({"response": response_text})


@app.route("/set-language", methods=["POST"])
@login_required
def set_language():
    """Set the chat language preference."""
    data = request.get_json()
    lang = data.get("language", "english").lower()
    if lang not in SUPPORTED_LANGUAGES:
        lang = "english"
    session["chat_language"] = lang
    return jsonify({"success": True, "language": lang})


@app.route("/clear-chat", methods=["POST"])
@login_required
def clear_chat():
    """Clear chat history."""
    session["chat_history"] = []
    return jsonify({"success": True})

# ──────────────── RUN APP ──────────────── #

if __name__ == "__main__":
    init_db()
    app.run(debug=True)