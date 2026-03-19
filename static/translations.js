/*
 * CAsense — Multi-Language Translation System
 * Supports: English, Telugu, Hindi, Tamil, Urdu, Kannada
 */

const TRANSLATIONS = {
    // ═══════════════════════════════════════
    // LANDING PAGE (index.html)
    // ═══════════════════════════════════════
    "nav_login": {
        english: "Login", telugu: "లాగిన్", hindi: "लॉगिन", tamil: "உள்நுழை", urdu: "لاگ ان", kannada: "ಲಾಗಿನ್"
    },
    "nav_get_started": {
        english: "Get Started", telugu: "ప్రారంభించండి", hindi: "शुरू करें", tamil: "தொடங்குங்கள்", urdu: "شروع کریں", kannada: "ಪ್ರಾರಂಭಿಸಿ"
    },
    "hero_badge": {
        english: "✨ AI-Powered Financial Intelligence",
        telugu: "✨ AI-ఆధారిత ఆర్థిక మేధస్సు",
        hindi: "✨ AI-संचालित वित्तीय बुद्धिमत्ता",
        tamil: "✨ AI-இயக்கப்படும் நிதி நுண்ணறிவு",
        urdu: "✨ AI سے چلنے والی مالی ذہانت",
        kannada: "✨ AI-ಚಾಲಿತ ಹಣಕಾಸು ಬುದ್ಧಿಮತ್ತೆ"
    },
    "hero_title_1": {
        english: "Master Your Finances", telugu: "మీ ఆర్థికాలను నేర్చుకోండి", hindi: "अपने वित्त पर काबू पाएं", tamil: "உங்கள் நிதியை கட்டுப்படுத்துங்கள்", urdu: "اپنے مالیات پر عبور حاصل کریں", kannada: "ನಿಮ್ಮ ಹಣಕಾಸನ್ನು ನಿಯಂತ್ರಿಸಿ"
    },
    "hero_title_2": {
        english: "with", telugu: "తో", hindi: "के साथ", tamil: "உடன்", urdu: "کے ساتھ", kannada: "ಜೊತೆ"
    },
    "hero_desc": {
        english: "Record income & expenses effortlessly, get automatic profit calculations, estimated tax insights, beautiful dashboard visualizations, and an AI chatbot to answer your financial questions instantly.",
        telugu: "ఆదాయం & ఖర్చులను సులభంగా రికార్డ్ చేయండి, ఆటోమేటిక్ లాభం లెక్కలు, అంచనా పన్ను అంతర్దృష్టులు, అందమైన డాష్‌బోర్డ్ విజువలైజేషన్లు మరియు మీ ఆర్థిక ప్రశ్నలకు తక్షణ సమాధానాలు ఇచ్చే AI చాట్‌బాట్ పొందండి.",
        hindi: "आय और खर्चों को आसानी से रिकॉर्ड करें, स्वचालित लाभ गणना, अनुमानित कर जानकारी, सुंदर डैशबोर्ड विज़ुअलाइज़ेशन और आपके वित्तीय सवालों का तुरंत जवाब देने वाला AI चैटबॉट प्राप्त करें।",
        tamil: "வருமானம் & செலவுகளை எளிதாக பதிவு செய்யுங்கள், தானியங்கி லாப கணக்கீடுகள், மதிப்பிடப்பட்ட வரி நுண்ணறிவுகள், அழகான டாஷ்போர்ட் காட்சிகள் மற்றும் உங்கள் நிதி கேள்விகளுக்கு உடனடியாக பதிலளிக்கும் AI சாட்போட் பெறுங்கள்.",
        urdu: "آمدنی اور اخراجات آسانی سے ریکارڈ کریں، خودکار منافع کا حساب، تخمینی ٹیکس بصیرت، خوبصورت ڈیش بورڈ ویژولائزیشن، اور آپ کے مالی سوالات کا فوری جواب دینے والا AI چیٹ بوٹ حاصل کریں۔",
        kannada: "ಆದಾಯ & ವೆಚ್ಚಗಳನ್ನು ಸುಲಭವಾಗಿ ದಾಖಲಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಲಾಭ ಲೆಕ್ಕಾಚಾರ, ಅಂದಾಜು ತೆರಿಗೆ ಒಳನೋಟ, ಸುಂದರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ದೃಶ್ಯೀಕರಣ ಮತ್ತು ನಿಮ್ಮ ಹಣಕಾಸು ಪ್ರಶ್ನೆಗಳಿಗೆ ತಕ್ಷಣ ಉತ್ತರಿಸುವ AI ಚಾಟ್‌ಬಾಟ್ ಪಡೆಯಿರಿ."
    },
    "hero_start_free": {
        english: "🚀 Start Free", telugu: "🚀 ఉచితంగా ప్రారంభించండి", hindi: "🚀 मुफ्त शुरू करें", tamil: "🚀 இலவசமாக தொடங்குங்கள்", urdu: "🚀 مفت شروع کریں", kannada: "🚀 ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ"
    },
    "hero_sign_in": {
        english: "Sign In →", telugu: "సైన్ ఇన్ →", hindi: "साइन इन →", tamil: "உள்நுழையவும் →", urdu: "سائن ان →", kannada: "ಸೈನ್ ಇನ್ →"
    },
    "feat_track_title": {
        english: "Track Everything", telugu: "అన్నీ ట్రాక్ చేయండి", hindi: "सब कुछ ट्रैक करें", tamil: "எல்லாவற்றையும் கண்காணிக்கவும்", urdu: "سب کچھ ٹریک کریں", kannada: "ಎಲ್ಲವನ್ನೂ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ"
    },
    "feat_track_desc": {
        english: "Record all your income and expenses with categories, dates, and descriptions. See your complete financial picture at a glance.",
        telugu: "మీ ఆదాయం మరియు ఖర్చులన్నింటినీ వర్గాలు, తేదీలు మరియు వివరణలతో రికార్డ్ చేయండి.",
        hindi: "श्रेणियों, तिथियों और विवरणों के साथ अपनी सभी आय और खर्चों को रिकॉर्ड करें।",
        tamil: "வகைகள், தேதிகள் மற்றும் விளக்கங்களுடன் உங்கள் அனைத்து வருமானம் மற்றும் செலவுகளை பதிவு செய்யுங்கள்.",
        urdu: "اقسام، تاریخوں اور تفصیلات کے ساتھ اپنی تمام آمدنی اور اخراجات ریکارڈ کریں۔",
        kannada: "ವರ್ಗ, ದಿನಾಂಕ ಮತ್ತು ವಿವರಣೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಎಲ್ಲಾ ಆದಾಯ ಮತ್ತು ವೆಚ್ಚಗಳನ್ನು ದಾಖಲಿಸಿ."
    },
    "feat_tax_title": {
        english: "Smart Tax Estimation", telugu: "స్మార్ట్ పన్ను అంచనా", hindi: "स्मार्ट कर अनुमान", tamil: "ஸ்மார்ட் வரி மதிப்பீடு", urdu: "سمارٹ ٹیکس تخمینہ", kannada: "ಸ್ಮಾರ್ಟ್ ತೆರಿಗೆ ಅಂದಾಜು"
    },
    "feat_tax_desc": {
        english: "Automatically estimates your tax liability based on your country's tax slabs. Stay prepared for tax season with zero effort.",
        telugu: "మీ దేశ పన్ను స్లాబ్‌ల ఆధారంగా మీ పన్ను బాధ్యతను ఆటోమేటిక్‌గా అంచనా వేస్తుంది.",
        hindi: "आपके देश की कर स्लैब के आधार पर स्वचालित रूप से कर देनदारी का अनुमान लगाता है।",
        tamil: "உங்கள் நாட்டின் வரி ஸ்லாப்களின் அடிப்படையில் உங்கள் வரி பொறுப்பை தானாக மதிப்பிடுகிறது.",
        urdu: "آپ کے ملک کی ٹیکس سلیبز کی بنیاد پر خود بخود ٹیکس ذمہ داری کا تخمینہ لگاتا ہے۔",
        kannada: "ನಿಮ್ಮ ದೇಶದ ತೆರಿಗೆ ಸ್ಲ್ಯಾಬ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ತೆರಿಗೆ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಂದಾಜಿಸುತ್ತದೆ."
    },
    "feat_ai_title": {
        english: "AI Financial Chatbot", telugu: "AI ఆర్థిక చాట్‌బాట్", hindi: "AI वित्तीय चैटबॉट", tamil: "AI நிதி சாட்போட்", urdu: "AI مالی چیٹ بوٹ", kannada: "AI ಹಣಕಾಸು ಚಾಟ್‌ಬಾಟ್"
    },
    "feat_ai_desc": {
        english: "Ask about your profit, expenses, savings rate, or get personalized financial tips — all through a natural conversation.",
        telugu: "మీ లాభం, ఖర్చులు, పొదుపు రేటు గురించి అడగండి లేదా వ్యక్తిగత ఆర్థిక చిట్కాలు పొందండి.",
        hindi: "अपने लाभ, खर्चों, बचत दर के बारे में पूछें या व्यक्तिगत वित्तीय सुझाव प्राप्त करें।",
        tamil: "உங்கள் லாபம், செலவுகள், சேமிப்பு விகிதம் பற்றி கேளுங்கள் அல்லது தனிப்பயனாக்கப்பட்ட நிதி குறிப்புகளை பெறுங்கள்.",
        urdu: "اپنے منافع، اخراجات، بچت کی شرح کے بارے میں پوچھیں یا ذاتی مالی تجاویز حاصل کریں۔",
        kannada: "ನಿಮ್ಮ ಲಾಭ, ವೆಚ್ಚಗಳು, ಉಳಿತಾಯ ದರದ ಬಗ್ಗೆ ಕೇಳಿ ಅಥವಾ ವೈಯಕ್ತಿಕ ಹಣಕಾಸು ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ."
    },
    "footer_text": {
        english: "© 2026 CAsense Project · Built with Flask & Chart.js · Academic Purpose",
        telugu: "© 2026 CAsense ప్రాజెక్ట్ · Flask & Chart.js తో నిర్మించబడింది · విద్యా ఉద్దేశ్యం",
        hindi: "© 2026 CAsense प्रोजेक्ट · Flask और Chart.js से निर्मित · शैक्षिक उद्देश्य",
        tamil: "© 2026 CAsense திட்டம் · Flask & Chart.js உடன் உருவாக்கப்பட்டது · கல்வி நோக்கம்",
        urdu: "© 2026 CAsense پروجیکٹ · Flask اور Chart.js سے بنایا گیا · تعلیمی مقصد",
        kannada: "© 2026 CAsense ಯೋಜನೆ · Flask & Chart.js ನಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ · ಶೈಕ್ಷಣಿಕ ಉದ್ದೇಶ"
    },

    // ═══════════════════════════════════════
    // LOGIN PAGE
    // ═══════════════════════════════════════
    "login_welcome": {
        english: "Welcome Back", telugu: "తిరిగి స్వాగతం", hindi: "वापस स्वागत है", tamil: "மீண்டும் வரவேற்கிறோம்", urdu: "واپس خوش آمدید", kannada: "ಮತ್ತೆ ಸ್ವಾಗತ"
    },
    "login_subtitle": {
        english: "Sign in with your username or Google email",
        telugu: "మీ యూజర్‌నేమ్ లేదా Google ఇమెయిల్‌తో సైన్ ఇన్ చేయండి",
        hindi: "अपने उपयोगकर्ता नाम या Google ईमेल से साइन इन करें",
        tamil: "உங்கள் பயனர்பெயர் அல்லது Google மின்னஞ்சலுடன் உள்நுழையவும்",
        urdu: "اپنے صارف نام یا Google ای میل سے سائن ان کریں",
        kannada: "ನಿಮ್ಮ ಬಳಕೆದಾರಹೆಸರು ಅಥವಾ Google ಇಮೇಲ್‌ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ"
    },
    "label_username_email": {
        english: "Username or Email", telugu: "యూజర్‌నేమ్ లేదా ఇమెయిల్", hindi: "उपयोगकर्ता नाम या ईमेल", tamil: "பயனர்பெயர் அல்லது மின்னஞ்சல்", urdu: "صارف نام یا ای میل", kannada: "ಬಳಕೆದಾರಹೆಸರು ಅಥವಾ ಇಮೇಲ್"
    },
    "label_password": {
        english: "Password", telugu: "పాస్‌వర్డ్", hindi: "पासवर्ड", tamil: "கடவுச்சொல்", urdu: "پاس ورڈ", kannada: "ಪಾಸ್‌ವರ್ಡ್"
    },
    "btn_sign_in": {
        english: "Sign In", telugu: "సైన్ ఇన్", hindi: "साइन इन", tamil: "உள்நுழையவும்", urdu: "سائن ان", kannada: "ಸೈನ್ ಇನ್"
    },
    "login_no_account": {
        english: "Don't have an account?", telugu: "ఖాతా లేదా?", hindi: "खाता नहीं है?", tamil: "கணக்கு இல்லையா?", urdu: "اکاؤنٹ نہیں ہے؟", kannada: "ಖಾತೆ ಇಲ್ಲವೇ?"
    },
    "login_create_one": {
        english: "Create one", telugu: "ఒకటి సృష్టించండి", hindi: "एक बनाएं", tamil: "ஒன்றை உருவாக்கவும்", urdu: "ایک بنائیں", kannada: "ಒಂದನ್ನು ರಚಿಸಿ"
    },

    // ═══════════════════════════════════════
    // REGISTER PAGE
    // ═══════════════════════════════════════
    "reg_title": {
        english: "Create Account", telugu: "ఖాతా సృష్టించండి", hindi: "खाता बनाएं", tamil: "கணக்கை உருவாக்கவும்", urdu: "اکاؤنٹ بنائیں", kannada: "ಖಾತೆ ರಚಿಸಿ"
    },
    "reg_subtitle": {
        english: "Start managing your finances smartly", telugu: "మీ ఆర్థికాలను తెలివిగా నిర్వహించడం ప్రారంభించండి", hindi: "अपने वित्त को स्मार्ट तरीके से प्रबंधित करना शुरू करें", tamil: "உங்கள் நிதிகளை புத்திசாலித்தனமாக நிர்வகிக்கத் தொடங்கவும்", urdu: "اپنے مالیات کو ہوشیاری سے منظم کرنا شروع کریں", kannada: "ನಿಮ್ಮ ಹಣಕಾಸನ್ನು ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ನಿರ್ವಹಿಸಲು ಪ್ರಾರಂಭಿಸಿ"
    },
    "label_username": {
        english: "Username", telugu: "యూజర్‌నేమ్", hindi: "उपयोगकर्ता नाम", tamil: "பயனர்பெயர்", urdu: "صارف نام", kannada: "ಬಳಕೆದಾರಹೆಸರು"
    },
    "label_email": {
        english: "📧 Email Address", telugu: "📧 ఇమెయిల్ చిరునామా", hindi: "📧 ईमेल पता", tamil: "📧 மின்னஞ்சல் முகவரி", urdu: "📧 ای میل ایڈریس", kannada: "📧 ಇಮೇಲ್ ವಿಳಾಸ"
    },

    "label_confirm_password": {
        english: "Confirm Password", telugu: "పాస్‌వర్డ్ నిర్ధారించండి", hindi: "पासवर्ड की पुष्टि करें", tamil: "கடவுச்சொல்லை உறுதிப்படுத்தவும்", urdu: "پاس ورڈ کی تصدیق کریں", kannada: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ"
    },
    "btn_register": {
        english: "Create Account →", telugu: "ఖాతా సృష్టించండి →", hindi: "खाता बनाएं →", tamil: "கணக்கை உருவாக்கவும் →", urdu: "اکاؤنٹ بنائیں →", kannada: "ಖಾತೆ ರಚಿಸಿ →"
    },
    "reg_have_account": {
        english: "Already have an account?", telugu: "ఇప్పటికే ఖాతా ఉందా?", hindi: "पहले से खाता है?", tamil: "ஏற்கனவே கணக்கு உள்ளதா?", urdu: "پہلے سے اکاؤنٹ ہے؟", kannada: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?"
    },
    "reg_sign_in": {
        english: "Sign in", telugu: "సైన్ ఇన్", hindi: "साइन इन", tamil: "உள்நுழையவும்", urdu: "سائن ان", kannada: "ಸೈನ್ ಇನ್"
    },


    // ═══════════════════════════════════════
    // DASHBOARD PAGE
    // ═══════════════════════════════════════
    "dash_title": {
        english: "Financial Dashboard", telugu: "ఆర్థిక డాష్‌బోర్డ్", hindi: "वित्तीय डैशबोर्ड", tamil: "நிதி டாஷ்போர்ட்", urdu: "مالی ڈیش بورڈ", kannada: "ಹಣಕಾಸು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
    },
    "dash_subtitle": {
        english: "Your complete financial overview at a glance", telugu: "మీ పూర్తి ఆర్థిక అవలోకనం ఒక చూపులో", hindi: "एक नज़र में आपका पूरा वित्तीय अवलोकन", tamil: "ஒரு பார்வையில் உங்கள் முழுமையான நிதி கண்ணோட்டம்", urdu: "ایک نظر میں آپ کا مکمل مالی جائزہ", kannada: "ಒಂದು ನೋಟದಲ್ಲಿ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಹಣಕಾಸು ಅವಲೋಕನ"
    },
    "dash_total_income": {
        english: "Total Income", telugu: "మొత్తం ఆదాయం", hindi: "कुल आय", tamil: "மொத்த வருமானம்", urdu: "کل آمدنی", kannada: "ಒಟ್ಟು ಆದಾಯ"
    },
    "dash_total_expense": {
        english: "Total Expense", telugu: "మొత్తం ఖర్చు", hindi: "कुल खर्च", tamil: "மொத்த செலவு", urdu: "کل اخراجات", kannada: "ಒಟ್ಟು ವೆಚ್ಚ"
    },
    "dash_net_profit": {
        english: "Net Profit", telugu: "నికర లాభం", hindi: "शुद्ध लाभ", tamil: "நிகர லாபம்", urdu: "خالص منافع", kannada: "ನಿವ್ವಳ ಲಾಭ"
    },
    "dash_est_tax": {
        english: "Estimated Tax", telugu: "అంచనా పన్ను", hindi: "अनुमानित कर", tamil: "மதிப்பிடப்பட்ட வரி", urdu: "تخمینی ٹیکس", kannada: "ಅಂದಾಜು ತೆರಿಗೆ"
    },
    "dash_filter_date": {
        english: "📅 Filter by Date Range", telugu: "📅 తేదీ శ్రేణి ద్వారా ఫిల్టర్", hindi: "📅 तारीख सीमा से फ़िल्टर करें", tamil: "📅 தேதி வரம்பு மூலம் வடிகட்டு", urdu: "📅 تاریخ کی حد سے فلٹر کریں", kannada: "📅 ದಿನಾಂಕ ಶ್ರೇಣಿಯಿಂದ ಫಿಲ್ಟರ್"
    },
    "dash_from_date": {
        english: "From Date", telugu: "తేదీ నుండి", hindi: "तारीख से", tamil: "தேதி முதல்", urdu: "تاریخ سے", kannada: "ದಿನಾಂಕದಿಂದ"
    },
    "dash_to_date": {
        english: "To Date", telugu: "తేదీ వరకు", hindi: "तारीख तक", tamil: "தேதி வரை", urdu: "تاریخ تک", kannada: "ದಿನಾಂಕದವರೆಗೆ"
    },
    "btn_filter": {
        english: "🔍 Filter", telugu: "🔍 ఫిల్టర్", hindi: "🔍 फ़िल्टर", tamil: "🔍 வடிகட்டு", urdu: "🔍 فلٹر", kannada: "🔍 ಫಿಲ್ಟರ್"
    },
    "dash_clear_filter": {
        english: "✕ Clear Filter", telugu: "✕ ఫిల్టర్ క్లియర్", hindi: "✕ फ़िल्टर साफ़ करें", tamil: "✕ வடிகட்டியை அழிக்கவும்", urdu: "✕ فلٹر صاف کریں", kannada: "✕ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ"
    },
    "dash_add_txn": {
        english: "➕ Add Transaction", telugu: "➕ లావాదేవీ జోడించండి", hindi: "➕ लेनदेन जोड़ें", tamil: "➕ பரிவர்த்தனையை சேர்க்கவும்", urdu: "➕ لین دین شامل کریں", kannada: "➕ ವಹಿವಾಟು ಸೇರಿಸಿ"
    },
    "dash_type": {
        english: "Type", telugu: "రకం", hindi: "प्रकार", tamil: "வகை", urdu: "قسم", kannada: "ಪ್ರಕಾರ"
    },
    "dash_select": {
        english: "Select", telugu: "ఎంచుకోండి", hindi: "चुनें", tamil: "தேர்ந்தெடுக்கவும்", urdu: "منتخب کریں", kannada: "ಆಯ್ಕೆಮಾಡಿ"
    },
    "dash_income": {
        english: "Income", telugu: "ఆదాయం", hindi: "आय", tamil: "வருமானம்", urdu: "آمدنی", kannada: "ಆದಾಯ"
    },
    "dash_expense": {
        english: "Expense", telugu: "ఖర్చు", hindi: "खर्च", tamil: "செலவு", urdu: "اخراجات", kannada: "ವೆಚ್ಚ"
    },
    "dash_category": {
        english: "Category", telugu: "వర్గం", hindi: "श्रेणी", tamil: "வகை", urdu: "قسم", kannada: "ವರ್ಗ"
    },
    "dash_amount": {
        english: "Amount", telugu: "మొత్తం", hindi: "राशि", tamil: "தொகை", urdu: "رقم", kannada: "ಮೊತ್ತ"
    },
    "dash_date": {
        english: "Date", telugu: "తేదీ", hindi: "तारीख", tamil: "தேதி", urdu: "تاریخ", kannada: "ದಿನಾಂಕ"
    },
    "dash_description": {
        english: "Description", telugu: "వివరణ", hindi: "विवरण", tamil: "விளக்கம்", urdu: "تفصیل", kannada: "ವಿವರಣೆ"
    },
    "btn_add": {
        english: "Add", telugu: "జోడించు", hindi: "जोड़ें", tamil: "சேர்", urdu: "شامل کریں", kannada: "ಸೇರಿಸಿ"
    },
    "dash_bill_storage": {
        english: "📸 Bill Storage", telugu: "📸 బిల్ నిల్వ", hindi: "📸 बिल भंडारण", tamil: "📸 பில் சேமிப்பு", urdu: "📸 بل ذخیرہ", kannada: "📸 ಬಿಲ್ ಸಂಗ್ರಹ"
    },
    "dash_txn_history": {
        english: "📋 Transaction History", telugu: "📋 లావాదేవీ చరిత్ర", hindi: "📋 लेनदेन इतिहास", tamil: "📋 பரிவர்த்தனை வரலாறு", urdu: "📋 لین دین کی تاریخ", kannada: "📋 ವಹಿವಾಟು ಇತಿಹಾಸ"
    },
    "dash_action": {
        english: "Action", telugu: "చర్య", hindi: "कार्रवाई", tamil: "செயல்", urdu: "عمل", kannada: "ಕ್ರಿಯೆ"
    },
    "btn_ai_chat": {
        english: "🤖 AI Chat", telugu: "🤖 AI చాట్", hindi: "🤖 AI चैट", tamil: "🤖 AI அரட்டை", urdu: "🤖 AI چیٹ", kannada: "🤖 AI ಚಾಟ್"
    },
    "btn_logout": {
        english: "Logout", telugu: "లాగ్అవుట్", hindi: "लॉगआउट", tamil: "வெளியேறு", urdu: "لاگ آؤٹ", kannada: "ಲಾಗ್ಔಟ್"
    },
    "dash_back": {
        english: "← Back to Dashboard", telugu: "← డాష్‌బోర్డ్‌కు తిరిగి", hindi: "← डैशबोर्ड पर वापस", tamil: "← டாஷ்போர்டுக்கு திரும்பு", urdu: "← ڈیش بورڈ پر واپس", kannada: "← ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ"
    },
    "btn_upload": {
        english: "📤 Upload", telugu: "📤 అప్‌లోడ్", hindi: "📤 अपलोड", tamil: "📤 பதிவேற்றம்", urdu: "📤 اپ لوڈ", kannada: "📤 ಅಪ್‌ಲೋಡ್"
    },
    "dash_no_txn": {
        english: "No transactions yet. Add your first one above!", telugu: "ఇంకా లావాదేవీలు లేవు. పైన మీ మొదటిదాన్ని జోడించండి!", hindi: "अभी कोई लेनदेन नहीं। ऊपर अपना पहला जोड़ें!", tamil: "இதுவரை பரிவர்த்தனைகள் இல்லை. மேலே உங்கள் முதல் பரிவர்த்தனையை சேர்க்கவும்!", urdu: "ابھی تک کوئی لین دین نہیں۔ اوپر اپنا پہلا شامل کریں!", kannada: "ಇನ್ನೂ ವಹಿವಾಟುಗಳಿಲ್ಲ. ಮೇಲೆ ನಿಮ್ಮ ಮೊದಲನೆಯದನ್ನು ಸೇರಿಸಿ!"
    },

    // ═══════════════════════════════════════
    // CHAT PAGE
    // ═══════════════════════════════════════
    "chat_title": {
        english: "🤖 AI Financial & Business Assistant", telugu: "🤖 AI ఆర్థిక & వ్యాపార సహాయకుడు", hindi: "🤖 AI वित्तीय और व्यापार सहायक", tamil: "🤖 AI நிதி & வணிக உதவியாளர்", urdu: "🤖 AI مالی اور کاروباری معاون", kannada: "🤖 AI ಹಣಕಾಸು & ವ್ಯಾಪಾರ ಸಹಾಯಕ"
    },
    "chat_subtitle": {
        english: "Powered by Google Gemini AI — Ask anything about your finances or business",
        telugu: "Google Gemini AI ద్వారా — మీ ఆర్థిక లేదా వ్యాపారం గురించి ఏదైనా అడగండి",
        hindi: "Google Gemini AI द्वारा — अपने वित्त या व्यापार के बारे में कुछ भी पूछें",
        tamil: "Google Gemini AI மூலம் — உங்கள் நிதி அல்லது வணிகம் பற்றி எதையும் கேளுங்கள்",
        urdu: "Google Gemini AI کے ذریعے — اپنے مالیات یا کاروبار کے بارے میں کچھ بھی پوچھیں",
        kannada: "Google Gemini AI ಮೂಲಕ — ನಿಮ್ಮ ಹಣಕಾಸು ಅಥವಾ ವ್ಯಾಪಾರದ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ"
    },
    "chat_lang_label": {
        english: "🌐 Language:", telugu: "🌐 భాష:", hindi: "🌐 भाषा:", tamil: "🌐 மொழி:", urdu: "🌐 زبان:", kannada: "🌐 ಭಾಷೆ:"
    },
    "chat_clear": {
        english: "🗑️ Clear Chat", telugu: "🗑️ చాట్ క్లియర్", hindi: "🗑️ चैट साफ़ करें", tamil: "🗑️ அரட்டையை அழிக்கவும்", urdu: "🗑️ چیٹ صاف کریں", kannada: "🗑️ ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ"
    },
    "chat_placeholder": {
        english: "Ask me anything about your finances, business, or more...",
        telugu: "మీ ఆర్థికాలు, వ్యాపారం గురించి ఏదైనా అడగండి...",
        hindi: "अपने वित्त, व्यापार के बारे में कुछ भी पूछें...",
        tamil: "உங்கள் நிதி, வணிகம் பற்றி எதையும் கேளுங்கள்...",
        urdu: "اپنے مالیات، کاروبار کے بارے میں کچھ بھی پوچھیں...",
        kannada: "ನಿಮ್ಮ ಹಣಕಾಸು, ವ್ಯಾಪಾರದ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ..."
    },
    "btn_send": {
        english: "Send ➤", telugu: "పంపు ➤", hindi: "भेजें ➤", tamil: "அனுப்பு ➤", urdu: "بھیجیں ➤", kannada: "ಕಳುಹಿಸಿ ➤"
    }
};

// ═══════════════════════════════════════
// LANGUAGE ENGINE
// ═══════════════════════════════════════

const LANG_OPTIONS = {
    english:  { name: 'English',  native: 'English',  flag: '🇬🇧' },
    telugu:   { name: 'Telugu',   native: 'తెలుగు',   flag: '🇮🇳' },
    hindi:    { name: 'Hindi',    native: 'हिन्दी',    flag: '🇮🇳' },
    tamil:    { name: 'Tamil',    native: 'தமிழ்',    flag: '🇮🇳' },
    urdu:     { name: 'Urdu',     native: 'اردو',     flag: '🇵🇰' },
    kannada:  { name: 'Kannada',  native: 'ಕನ್ನಡ',    flag: '🇮🇳' }
};

// Speech recognition language codes (with fallbacks for better browser support)
const SPEECH_LANG_CODES = {
    english: ['en-US', 'en-IN', 'en-GB'],
    telugu:  ['te-IN', 'te'],
    hindi:   ['hi-IN', 'hi'],
    tamil:   ['ta-IN', 'ta'],
    urdu:    ['ur-IN', 'ur-PK', 'ur'],
    kannada: ['kn-IN', 'kn']
};

function getCurrentLanguage() {
    return localStorage.getItem('casense_language') || 'english';
}

function setLanguage(lang) {
    if (!LANG_OPTIONS[lang]) lang = 'english';
    localStorage.setItem('casense_language', lang);
    applyTranslations(lang);
    // Also update server session for chatbot language
    fetch('/set-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang })
    }).catch(() => {});
    // Update all language selectors on the page
    document.querySelectorAll('.lang-switcher-select').forEach(sel => {
        sel.value = lang;
    });
}

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = TRANSLATIONS[key][lang];
            } else {
                el.textContent = TRANSLATIONS[key][lang];
            }
        }
    });
    // Update HTML lang attribute
    const langCodes = { english: 'en', telugu: 'te', hindi: 'hi', tamil: 'ta', urdu: 'ur', kannada: 'kn' };
    document.documentElement.lang = langCodes[lang] || 'en';
    // Set direction for Urdu
    document.body.style.direction = (lang === 'urdu') ? 'ltr' : 'ltr'; // Keep LTR for layout
}

function createLanguageSwitcher() {
    const lang = getCurrentLanguage();
    const switcher = document.createElement('div');
    switcher.className = 'global-lang-switcher';
    switcher.innerHTML = `
        <button class="lang-toggle-btn" onclick="this.parentElement.classList.toggle('open')" title="Change Language">
            🌐
        </button>
        <div class="lang-dropdown">
            ${Object.entries(LANG_OPTIONS).map(([key, val]) => `
                <button class="lang-option ${key === lang ? 'active' : ''}" onclick="setLanguage('${key}')">
                    <span class="lang-native">${val.native}</span>
                    <span class="lang-name">${val.name}</span>
                </button>
            `).join('')}
        </div>
    `;
    document.body.appendChild(switcher);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createLanguageSwitcher();
    applyTranslations(getCurrentLanguage());
});
