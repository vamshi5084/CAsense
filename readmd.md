# 💠 CAsense - Complete Software & API Documentation

## 📌 Project Overview
**CAsense** is an AI-powered financial management web application that helps users track income, expenses, calculate taxes across multiple countries, and receive personalized financial advice through an intelligent chatbot.

---

## 🖥️ **Backend Technologies**

### **Framework & Server**
| Software | Version | Purpose |
|----------|---------|---------|
| **Flask** | 3.1.3 | Python web framework for building REST APIs and routes |
| **Gunicorn** | Latest | Production WSGI HTTP Server |
| **Werkzeug** | 3.1.6 | Security utilities (password hashing, file uploads) |

### **Database**
| Software | Purpose |
|----------|---------|
| **SQLite** | Lightweight relational database (database.db) |
| **SQLite3** (Python) | Python library for database operations |

### **Python Libraries**
| Package | Version | Purpose |
|---------|---------|---------|
| **google-genai** | 1.67.0 | Google Gemini AI API integration for chatbot |
| **request** | 2.32.5 | HTTP library (dependency of google-genai) |
| **pydantic** | 2.12.5 | Data validation and settings |
| **tenacity** | 9.1.4 | Retry and timeout handling |
| **httpx** | 0.28.1 | Async HTTP client |
| **cryptography** | 46.0.5 | Encryption & security utilities |
| **google-auth** | 2.49.0 | Google authentication |

### **Standard Python Libraries**
- `sqlite3` - Database connectivity
- `os` - File & directory operations
- `json` - JSON manipulation
- `random` - Random number generation
- `datetime` - Date and time handling
- `functools` - Function decorators

---

## 🌐 **Frontend Technologies**

### **Core Web Technologies**
| Technology | Purpose |
|------------|---------|
| **HTML5** | Markup structure for all pages |
| **CSS3** | Styling with advanced animations & gradients |
| **JavaScript (Vanilla)** | DOM manipulation, AJAX requests, interactivity |

### **Frontend Libraries & Frameworks**
| Library | Version | Purpose |
|---------|---------|---------|
| **Chart.js** | Latest (CDN) | Interactive charts (doughnut, bar, line charts) |
| **Jinja2** | 3.1.6 | Server-side template rendering |

### **Frontend Pages**
- `index.html` - Landing page with features overview
- `login.html` - User login interface
- `register.html` - User registration interface
- `dashboard.html` - Financial dashboard with transactions, charts, bills
- `chat.html` - AI chatbot interface

---

## 🤖 **AI & APIs**

### **Google Gemini API**
| Service | Endpoint | Purpose |
|---------|----------|---------|
| **Google Generative AI (Gemini)** | `https://generativeapi.google.com/` | AI-powered financial chatbot |
| **API Key** | `AIzaSyAlpuI3Ki7E8GWNvDI8QhC9DP5Z2eiJL0o` | Authentication for Gemini requests |
| **Model** | `gemini-2.5-flash` | Fast and efficient language model |

### **Chatbot Features**
- **Multi-language support**: English, Telugu, Hindi, Tamil, Urdu, Kannada
- **Financial context awareness**: Uses user's transaction data, income, expenses
- **Tax calculation database**: Country-specific tax slabs (India, USA, UK, Canada, Australia, Germany)
- **Smart tips generation**: Proactive financial suggestions based on user data

---

## 💾 **Database Structure**

### **Tables**
1. **users**
   - id, username, email, password, country

2. **transactions**
   - id, user_id, type (Income/Expense), category, amount, date, description

3. **bills**
   - id, user_id, filename, original_name, description, upload_date

### **Features**
- Automatic schema migrations for backward compatibility
- Multi-country support (6 countries with distinct currencies)

---

## 📊 **Supported Countries & Currencies**

| Country | Currency | Symbol |
|---------|----------|--------|
| India | INR | ₹ |
| USA | USD | $ |
| UK | GBP | £ |
| Canada | CAD | C$ |
| Australia | AUD | A$ |
| Germany | EUR | € |

---

## 🌍 **Supported Languages**

| Language | Native Name | Script |
|----------|------------|--------|
| English | English | Latin |
| Telugu | తెలుగు | Telugu |
| Hindi | हिन्दी | Devanagari |
| Tamil | தமிழ் | Tamil |
| Urdu | اردو | Nastaliq/Urdu |
| Kannada | ಕನ್ನಡ | Kannada |

---

## 🗣️ **Multi-Language Support Implementation**

### **Current Implementation (CAsense)**
CAsense uses a **hybrid approach** combining:

1. **Frontend Translation (JavaScript)**
   - File: `static/translations.js`
   - Method: Client-side translation using `data-i18n` attributes
   - Scope: All UI text on HTML pages

2. **Backend Language Support (Python)**
   - File: `app.py` (SUPPORTED_LANGUAGES dictionary)
   - Method: Language-specific prompts for AI chatbot
   - Scope: Gemini AI responses in different languages

### **How It Works**

#### **Frontend (translations.js)**
```javascript
// Structure: Key → Language Dictionary
const TRANSLATIONS = {
    "nav_login": {
        english: "Login",
        telugu: "లాగిన్",
        hindi: "लॉगिन",
        tamil: "உள்நுழை",
        urdu: "لاگ ان",
        kannada: "ಲಾಗಿನ್"
    },
    "nav_get_started": { /* ... */ }
};

// Auto-translate on page load
function translatePage(language) {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (TRANSLATIONS[key]) {
            elem.textContent = TRANSLATIONS[key][language];
        }
    });
}
```

#### **HTML Usage**
```html
<!-- Original HTML -->
<a href="/login" class="btn" data-i18n="nav_login">Login</a>

<!-- Translated at runtime based on selected language -->
```

#### **Backend (app.py)**
```python
SUPPORTED_LANGUAGES = {
    'english':  {'name': 'English', 'instruction': 'Respond in English.'},
    'telugu':   {'name': 'Telugu', 'instruction': 'Respond entirely in Telugu...'},
    'hindi':    {'name': 'Hindi', 'instruction': 'Respond entirely in Hindi...'},
    # ... etc
}

# Language instruction sent to Gemini API
system_prompt = build_system_prompt(financial_data, language_key)
```

---

## 💡 **Multi-Language Support Alternatives & Recommendations**

### **1. Current Approach (RECOMMENDED for CAsense)**
**Hybrid Client + AI Instruction Method**

| Aspect | Details |
|--------|---------|
| **Frontend** | JSON-based translations (JavaScript) |
| **Backend** | Language instructions for AI |
| **Cost** | Free |
| **Scalability** | Good for 6-10 languages |
| **Pros** | Simple, lightweight, no external APIs |
| **Cons** | Manual translation maintenance, not SEO-friendly |

---

### **2. i18next (Recommended Alternative)**
**Popular JavaScript library for internationalization**

#### Installation
```bash
npm install i18next i18next-browser-languagedetector i18next-http-backend
```

#### Configuration
```javascript
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

i18next
    .use(HttpBackend)
    .init({
        fallbackLng: 'english',
        backend: {
            loadPath: '/locales/{{lng}}.json'
        }
    });
```

#### Usage
```html
<h1 data-i18n="nav_login"></h1>
```

#### Pros
✅ Industry standard  
✅ Rich features (pluralization, interpolation)  
✅ Context awareness  
✅ Active community support  

#### Cons
❌ Requires Node.js build setup  
❌ Additional dependencies  

---

### **3. Google Translate API (Cloud Translation)**
**For automatic translation**

#### Setup
```bash
pip install google-cloud-translate
```

#### Usage
```python
from google.cloud import translate_v2

def translate_text(text, target_language):
    client = translate_v2.Client()
    result = client.translate_text(
        source_language_code='en',
        target_language_code=target_language,
        contents=[text]
    )
    return result['translations'][0]['translatedText']
```

#### Pros
✅ Real-time translation  
✅ Support for 100+ languages  
✅ High accuracy  

#### Cons
❌ Requires API key & payment  
❌ Slower than static translations  
❌ Privacy concerns (sends data to Google)  

---

### **4. Gettext (GNU Internationalization)**
**Standard for Python/Flask projects**

#### Installation
```bash
pip install Flask-Babel
```

#### Flask Integration
```python
from flask_babel import Babel, gettext

app = Flask(__name__)
babel = Babel(app)

@babel.localeselector
def get_locale():
    return request.args.get('lang', 'en')

# Mark strings for translation
_('Hello, World!')
```

#### Create Translation Files
```bash
# Extract strings
pybabel extract -F babel.cfg -o messages.pot .

# Create language translation
pybabel init -i messages.pot -d translations -l te_IN

# Compile
pybabel compile -d translations
```

#### Pros
✅ Professional translation workflow  
✅ Wide ecosystem  
✅ Multiple format support (.po, .pot)  

#### Cons
❌ Learning curve  
❌ Requires build step  
❌ Complex setup  

---

### **5. AWS Translate**
**Cloud-based automatic translation**

#### Implementation
```python
import boto3

translate_client = boto3.client('translate')

def translate_with_aws(text, target_language):
    response = translate_client.translate_text(
        Text=text,
        SourceLanguageCode='en',
        TargetLanguageCode=target_language
    )
    return response['TranslatedText']
```

#### Pros
✅ Scalable cloud service  
✅ Real-time translation  
✅ Integration with AWS ecosystem  

#### Cons
❌ Costs per API call  
❌ Requires AWS account  
❌ Internet dependency  

---

### **6. Lokalise / Phrase (Modern SaaS)**
**Professional translation management**

- **Platform**: Web-based translation management
- **Features**: Collaboration, version control, AI assistance
- **Integration**: REST API for both frontend & backend
- **Cost**: Freemium ($0-50+/month)
- **Best For**: Large teams, professional projects

#### API Example
```bash
curl -X GET https://api.lokalise.com/api2/projects/EN.json
     -H "X-Api-Token: YOUR_TOKEN"
```

---

## 📊 **Comparison Table: Multi-Language Approaches**

| Tool | Setup Time | Cost | Scalability | Best For |
|------|-----------|------|-------------|----------|
| **Current (JSON)** | ⭐ 5min | 💰 FREE | 6-10 langs | Small projects |
| **i18next** | ⭐⭐ 15min | 💰 FREE | 100+ langs | Medium projects |
| **Flask-Babel** | ⭐⭐⭐ 30min | 💰 FREE | Unlimited | Enterprise |
| **Google Translate API** | ⭐⭐ 10min | 💸 $15-30/M | Unlimited | Auto-translation |
| **AWS Translate** | ⭐⭐ 15min | 💸 Pay-per-use | Unlimited | Enterprise AWS |
| **Lokalise** | ⭐ 5min | 💸 $0-50+/M | Unlimited | Professional teams |

---

## 🚀 **Recommendations for CAsense**

### **Short-term (Current Setup)**
✅ Keep `translations.js` approach  
✅ Manually add new languages as needed  
✅ Use for UI text only  

### **Medium-term (Growth Phase)**
✅ Migrate to **i18next** for better organization  
✅ Add pluralization & date formatting  
✅ Support more languages easily  

### **Long-term (Enterprise Scale)**
✅ Implement **Flask-Babel** for backend  
✅ Use **Lokalise** for professional translation workflow  
✅ Add **Google Translate API** for auto-translation of user content  

---

## 📋 **Quick Start: Adding a New Language**

### **Step 1: Add translations.js entry**
```javascript
"nav_login": {
    english: "Login",
    telugu: "లాగిన్",
    bengali: "লগইন"  // ← New language
}
```

### **Step 2: Add SUPPORTED_LANGUAGES in app.py**
```python
'bengali': {
    'name': 'Bengali',
    'native': 'বাংলা',
    'instruction': 'Respond entirely in Bengali...'
}
```

### **Step 3: Add language selector in HTML**
```html
<button onclick="changeLang('bengali')">বাংলা</button>
```

---

## 🔐 **Security Features**

### **Password Security**
- **Hash Algorithm**: Werkzeug's `generate_password_hash()` (PBKDF2)
- **Verification**: `check_password_hash()`

### **Session Management**
- **Secret Key**: `"cAsense_secret_key_2026"`
- **Cache Control**: Prevents back-button access after logout

### **File Upload Validation**
- **Allowed Extensions**: png, jpg, jpeg, gif, bmp, webp, pdf
- **Secure Filename**: Werkzeug's `secure_filename()`

---

## 📡 **API Endpoints**

### **Authentication**
- `GET/POST /register` - User registration
- `GET/POST /login` - User login
- `GET /logout` - User logout

### **Finance Management**
- `POST /add` - Add transaction
- `POST /delete/<int:txn_id>` - Delete transaction
- `POST /update-country` - Update user country
- `GET /dashboard` - View financial dashboard

### **Bill Management**
- `POST /upload-bill` - Upload bill image/PDF
- `GET /bill-image/<filename>` - Retrieve bill image
- `POST /delete-bill/<int:bill_id>` - Delete bill

### **AI Chatbot**
- `GET /chat` - Render chat interface
- `POST /api/chat` - Send message to Gemini AI
- `POST /set-language` - Set chat language
- `POST /clear-chat` - Clear chat history

### **Data Visualization**
- `GET /api/chart-data` - Fetch monthly income/expense data for charts

---

## 📦 **Development & Production Stack**

### **Development Server**
- **Type**: Flask Development Server (debug mode enabled)
- **Port**: 5000
- **URL**: http://127.0.0.1:5000
- **Auto-reload**: Enabled

### **Production Deployment**
- **Server**: Gunicorn (WSGI HTTP Server)
- **Recommended**: Nginx + Gunicorn setup

---

## 📊 **Tax Calculation Algorithms**

### Countries Supported
1. **India** - New Tax Regime 2025-26 slabs
2. **USA** - Federal Tax Brackets 2024 (Single filer)
3. **UK** - Income Tax 2024-25
4. **Canada** - Federal Tax 2024
5. **Australia** - Tax 2024-25
6. **Germany** - Progressive tax system

---

## 📁 **Project File Structure**

```
CAsense1/
├── app.py                  # Main Flask application
├── database.db             # SQLite database
├── requirements.txt        # Python dependencies
├── templates/
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # Dashboard
│   └── chat.html          # Chatbot interface
├── static/
│   ├── style.css          # Global styles
│   └── translations.js    # i18n translations
└── uploads/               # Bill storage
```

---

## 🚀 **Installation & Setup**

### **Requirements**
- Python 3.8+
- pip (Python package manager)

### **Step 1: Install Dependencies**
```bash
pip install -r requirements.txt
```

### **Step 2: Configure API Keys**
```python
# In app.py, line 25
GEMINI_API_KEY = "YOUR_GOOGLE_GEMINI_API_KEY"
```

### **Step 3: Run Application**
```bash
python app.py
```

**Access**: http://127.0.0.1:5000

---

## ⚙️ **Configuration**

### **Flask Configuration**
```python
app.secret_key = "cAsense_secret_key_2026"
UPLOAD_FOLDER = "./uploads"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'pdf'}
```

### **Gemini AI Configuration**
```python
gemini_client = genai.Client(api_key=GEMINI_API_KEY)
model = "gemini-2.5-flash"
temperature = 0.7
```

---

## 🔄 **Data Flow Architecture**

1. **User Authentication** → SQLite database
2. **Transaction Entry** → Database + Session
3. **Chart Data Request** → API aggregates data
4. **Chatbot Query** → Collects financial context → Sends to Gemini API → Returns response
5. **Bill Upload** → Server validates → Stores in `/uploads` → Records in database

---

## 📝 **Key Features Summary**

✅ Multi-user financial tracking  
✅ AI-powered chatbot (Gemini API)  
✅ Real-time charts (Chart.js)  
✅ Multi-language support (6 languages)  
✅ Multi-country tax calculations  
✅ Bill/Receipt upload & storage  
✅ Secure authentication  
✅ Responsive design  
✅ Automatic data migrations  

---

## 📞 **Support & Documentation**

- **Framework Docs**: https://flask.palletsprojects.com/
- **Gemini API**: https://ai.google.dev/
- **Chart.js**: https://www.chartjs.org/
- **SQLite**: https://www.sqlite.org/docs.html

---

**Last Updated**: March 16, 2026  
**Project Owner**: vamshi5084  
**License**: Academic Purpose

---

## 🎤 **Voice Recognition Troubleshooting & Setup Guide**

### **Issues Fixed (March 2026)**

#### **Problem 1: Voice Input Not Working on Dashboard**
**Root Cause**: Missing constants and helper functions
- `SPEECH_LANG_CODES` not defined
- `getCurrentLanguage()` function not implemented

**Solution**: Added both to dashboard.html with proper initialization

#### **Problem 2: Inconsistent Language Support**
**Root Cause**: Language codes were hardcoded without fallbacks
- Only one language code per language
- No fallback for browser variations

**Solution**: Changed to array-based approach with multiple fallback codes
```javascript
// Before (Wrong)
const speechLangCodes = { english: 'en-IN' }

// After (Correct)
const SPEECH_LANG_CODES = {
    english: ['en-US', 'en-IN', 'en-GB'],  // Fallbacks included
    telugu: ['te-IN', 'te']
}
```

#### **Problem 3: Missing Timeout Handling**
**Root Cause**: Continuous listening without auto-stop

**Solution**: Added 10-second timeout for chat and 8-second for forms

#### **Problem 4: Poor Error Handling**
**Root Cause**: Generic error messages without specific guidance

**Solution**: Improved error detection with user-friendly messages

---

### **Browser Support & Requirements**

| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome** | ✅ Full | Best support, recommended |
| **Edge** | ✅ Full | Uses Chromium engine |
| **Safari** | ✅ Partial | iOS 14.5+ required |
| **Firefox** | ⚠️ Limited | Experimental support |
| **Opera** | ✅ Full | Based on Chromium |
| **IE 11** | ❌ None | Not supported |

---

### **Setup & Permissions**

#### **Step 1: Browser Microphone Permission**
```
1. Click URL bar → Lock icon
2. Select "Permissions"
3. Allow "Microphone" access
4. Reload page
```

#### **Step 2: HTTPS Requirement**
Voice API requires secure context:
- ✅ `https://` - Works
- ✅ `http://localhost/` - Works for testing
- ❌ `http://` (non-localhost) - Blocked

#### **Step 3: Test Microphone**
```javascript
// Check if microphone permission is granted
navigator.permissions.query({name: 'microphone'}).then(result => {
    console.log('Microphone permission:', result.state);
    // 'granted', 'denied', or 'prompt'
});
```

---

### **Troubleshooting Guide**

#### **Issue: "No speech detected"**
✅ **Solutions:**
- Check if microphone is muted
- Test microphone in system settings
- Ensure no background noise interference
- Speak clearly and directly into microphone
- Increase volume if speaking quietly

#### **Issue: "Not-allowed error"**
✅ **Solutions:**
```
1. Clear browser cache & cookies
2. Check privacy settings
3. Reset permissions:
   - Chrome: Settings → Privacy → Site Settings → Microphone
   - Edge: Settings → Privacy → Microphone
4. Restart browser
5. Try different browser
```

#### **Issue: "Network error"**
✅ **Solutions:**
- Check internet connection
- Disable VPN/Proxy temporarily
- Check firewall settings
- Ensure HTTPS is properly configured

#### **Issue: "Invalid state error"**
✅ **Solutions:**
- Don't click voice button twice rapidly
- Wait for recognition to complete
- Refresh page if stuck

---

### **DASHBOARD VOICE INPUT FIX (Latest - March 16, 2026)**

#### **Problem Identified:**
Dashboard voice input was not working because:
1. ❌ `getCurrentLanguage()` was undefined in dashboard context
2. ❌ `SPEECH_LANG_CODES` referenced in dashboard but defined in global scope
3. ❌ Missing error handling and debugging logs
4. ❌ Language codes were not passed correctly to recognition object

#### **Solution Implemented:**

**File 1: dashboard.html**
- ✅ Moved `SPEECH_LANG_CODES` definition to top of scripts
- ✅ Added robust `getCurrentLanguage()` function with try-catch
- ✅ Rewrote `startFormVoice()` with comprehensive error handling
- ✅ Added console logs for debugging each step
- ✅ Added button state management (disabled/enabled)
- ✅ Added timeout handling (8 seconds)

**File 2: translations.js**
- ✅ Updated `SPEECH_LANG_CODES` to use array format with fallbacks
- ✅ Ensures language switching syncs to localStorage

#### **Testing Dashboard Voice Input:**

1. **Open Dashboard** → `/dashboard`
2. **Scroll to "Add Transaction" section**
3. **Click Category field** 
4. **Click 🎤 button** next to "Category" input
5. **Speak category**: *"Salary"* or *"Food"*
6. **Check**: Text should appear in input field

#### **Debug Steps if Still Not Working:**

```
1. Open Browser Console (F12 → Console tab)
2. Look for message: "✅ Dashboard script loaded. Voice input ready."
3. Click voice button and check console for:
   - "🎤 startFormVoice called with inputId: catInput"
   - "🌐 Language set to: en-US" (or similar)
   - "🎤 Listening started..."
   - "📝 Transcript: [your spoken text]"
   - "✅ Final result received"
4. If you see errors, note the error code and reference error table below
```

#### **Console Messages Guide:**

| Message | Meaning | Action |
|---------|---------|--------|
| `🎤 startFormVoice called` | Function was triggered | ✅ Working |
| `❌ Input element not found` | Wrong input ID | Check HTML |
| `❌ Speech Recognition not supported` | Browser issue | Use Chrome/Edge/Safari |
| `🌐 Language set to: ` | Language configured | ✅ Working |
| `🎤 Listening started...` | Microphone active | Speak now |
| `📝 Result event - isFinal: true` | Got final result | ✅ Success |
| `🔴 Speech error: no-speech` | No sound detected | Check microphone |
| `⏱️ Timeout: Stopping recognition` | 8-second limit reached | ✅ Auto-stops |

#### **Manual Test Script:**

Open browser console and run:

```javascript
// Test 1: Check if function exists
console.log(typeof startFormVoice);  // Should print "function"

// Test 2: Check language codes
console.log(SPEECH_LANG_CODES);  // Should show array format

// Test 3: Get current language
console.log(getCurrentLanguage());  // Should show language code

// Test 4: Simulate voice click (don't actually speak)
const btn = document.querySelector('button[onclick*="startFormVoice"]');
console.log('Button found:', btn ? '✅' : '❌');

// Test 5: Check if browser supports Web Speech API
console.log('Speech API supported:', !!(window.SpeechRecognition || window.webkitSpeechRecognition));
```

#### **Expected Output:**
```
function
{english: Array(3), telugu: Array(2), hindi: Array(2), ...}
english
Button found: ✅
Speech API supported: true
```

#### **Issue: "Voice not transcribing correctly"**
✅ **Solutions:**
- Change language setting if needed
- Speak in clear accent matching language
- Reduce background noise
- Use better microphone quality

---

### **JavaScript Implementation Details**

#### **Chat.html - Voice Input**
```javascript
// Language support with fallbacks
const speechLangCodes = {
    english: ['en-US', 'en-IN', 'en-GB'],
    telugu: ['te-IN', 'te'],
    hindi: ['hi-IN', 'hi'],
    tamil: ['ta-IN', 'ta'],
    urdu: ['ur-IN', 'ur-PK', 'ur'],
    kannada: ['kn-IN', 'kn']
};

// Auto-stop after 10 seconds
recognitionTimeout = setTimeout(() => {
    if (isListening && recognition) {
        recognition.stop();
    }
}, 10000);
```

#### **Dashboard.html - Form Voice Input**
```javascript
// Same language support
// Auto-stop after 8 seconds
const timeoutId = setTimeout(() => {
    recognition.stop();
}, 8000);
```

---

### **Advanced Configuration**

#### **Change Timeout Duration**
```javascript
// In chat.html (line ~315)
// Change 10000 (10 seconds) to desired milliseconds
recognitionTimeout = setTimeout(() => { ... }, 10000);
```

#### **Add Language Support**
```javascript
// Add new language to speechLangCodes
const speechLangCodes = {
    // ... existing languages ...
    marathi: ['mr-IN', 'mr']  // New language
};

// Also add to app.py SUPPORTED_LANGUAGES
```

#### **Adjust Interim Results**
```javascript
// Show/hide live transcription as user speaks
recognition.interimResults = true;  // Show live text
recognition.interimResults = false; // Only final result
```

---

### **Testing Voice Input**

#### **Test Steps:**
1. **Go to Chat Page** → /chat
2. **Click Microphone Button** 🎤
3. **Speak test phrase**: "My total income is five hundred thousand"
4. **Verify transcription** appears in input field
5. **Test Send** → Check if chatbot responds

#### **Test on Dashboard:**
1. **Go to Dashboard** → /dashboard
2. **Find Add Transaction form**
3. **Click Category Mic Button** 🎤
4. **Speak category**: "Salary"
5. **Verify text** appears in field

---

### **Performance Optimization**

#### **Best Practices:**
- Initialize recognition once on page load
- Clear timeouts properly
- Remove listeners after completion
- Use minimal DOM manipulation during recognition
- Cache DOM elements

```javascript
// Good: Cache elements
const voiceBtn = document.getElementById('voiceBtn');
const voiceStatus = document.getElementById('voiceStatus');
const chatInput = document.getElementById('chatInput');

// Avoid: Querying DOM repeatedly
document.getElementById('voiceBtn').classList.add('listening');
document.getElementById('voiceBtn').classList.remove('listening');
```

---

### **API Wrapper Function (Optional)**

```javascript
class VoiceRecognizer {
    constructor(language = 'english') {
        this.language = language;
        this.recognition = null;
        this.isListening = false;
    }

    initialize() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return false;
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = SPEECH_LANG_CODES[this.language][0];
        return true;
    }

    start() {
        if (this.recognition) {
            this.isListening = true;
            this.recognition.start();
        }
    }

    stop() {
        if (this.recognition) {
            this.recognition.stop();
            this.isListening = false;
        }
    }
}

// Usage
const recorder = new VoiceRecognizer('english');
recorder.initialize();
recorder.start();
```

---

