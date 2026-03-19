// ╔═══════════════════════════════════════════════════════════════╗
// ║ CASENSE VOICE INPUT MODULE - GLOBAL INITIALIZATION            ║
// ║ Loaded immediately in HEAD to ensure availability              ║
// ╚═══════════════════════════════════════════════════════════════╝

console.log('🎤 Voice Input Module Loading...');

// ╔─ Language Codes ─╗
window.SPEECH_LANG_CODES = {
    english: ['en-US', 'en-IN', 'en-GB'],
    telugu: ['te-IN', 'te'],
    hindi: ['hi-IN', 'hi'],
    tamil: ['ta-IN', 'ta'],
    urdu: ['ur-IN', 'ur-PK', 'ur'],
    kannada: ['kn-IN', 'kn']
};

// ╔─ Get Current Language ─╗
window.getCurrentLanguage = function() {
    try {
        let lang = localStorage.getItem('casense_language');
        if (lang && window.SPEECH_LANG_CODES[lang]) {
            return lang;
        }
        return 'english';
    } catch (e) {
        console.error('Error getting language:', e);
        return 'english';
    }
};

// ╔═══════════════════════════════════════════════════════════════╗
// ║ FORM VOICE INPUT - MAIN FUNCTION                              ║
// ╚═══════════════════════════════════════════════════════════════╝

window.startFormVoice = function(inputId, btnElement) {
    console.log('▶️ [VOICE] Function called - Input:', inputId);
    
    // Safety checks
    if (!inputId) {
        console.error('❌ No inputId provided');
        alert('⚠️ Error: Input ID missing');
        return;
    }
    
    if (!btnElement) {
        console.error('❌ No button element provided');
        return;
    }

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error('❌ Speech Recognition not supported in this browser');
        alert('⚠️ Voice input requires Chrome, Edge, or Safari browser.');
        return;
    }

    // Get input element
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        console.error('❌ Input element not found:', inputId);
        alert('⚠️ Error: Could not find input field');
        return;
    }

    console.log('✅ All checks passed. Starting recognition...');

    try {
        // Create recognition
        const recognition = new SpeechRecognition();
        
        // Get language
        const currentLang = window.getCurrentLanguage();
        const langCodes = window.SPEECH_LANG_CODES[currentLang] || window.SPEECH_LANG_CODES['english'];
        recognition.lang = langCodes[0];
        
        console.log('🌐 Language:', recognition.lang);

        // Configuration
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        // State variables
        const originalText = btnElement.textContent;
        const originalBg = btnElement.style.backgroundColor;
        let timeoutId = null;
        let finalReceived = false;

        // ╔─ onstart ─╗
        recognition.onstart = function() {
            console.log('🎤 Recognition started');
            btnElement.textContent = '🔴 Listening...';
            btnElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            btnElement.disabled = true;
            finalReceived = false;
            
            // Timeout after 8 seconds
            timeoutId = setTimeout(function() {
                console.log('⏱️ Timeout reached, stopping...');
                recognition.stop();
            }, 8000);
        };

        // ╔─ onresult ─╗
        recognition.onresult = function(event) {
            console.log('📝 Result received - isFinal:', event.results[event.results.length - 1].isFinal);
            
            let transcript = '';
            let isFinal = false;
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const t = event.results[i][0].transcript;
                transcript += (i > event.resultIndex ? ' ' : '') + t;
                if (event.results[i].isFinal) {
                    isFinal = true;
                }
            }
            
            console.log('💬 Transcript:', transcript, 'Final:', isFinal);
            
            // Put text in input
            inputElement.value = transcript;
            
            // Update UI
            if (isFinal) {
                finalReceived = true;
                console.log('✅ Final text received');
                btnElement.textContent = '✅';
                btnElement.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                clearTimeout(timeoutId);
            } else {
                // Show interim result
                const preview = transcript.substring(0, 25);
                btnElement.textContent = '🎤 ' + preview + (transcript.length > 25 ? '...' : '');
            }
        };

        // ╔─ onerror ─╗
        recognition.onerror = function(event) {
            console.error('🔴 Recognition error:', event.error);
            clearTimeout(timeoutId);
            
            let msg = '';
            switch(event.error) {
                case 'not-allowed':
                    msg = '🔒 Microphone access denied.\nPlease allow microphone in browser settings.';
                    break;
                case 'network':
                    msg = '⚠️ Network error.\nCheck your internet connection.';
                    break;
                case 'no-speech':
                    msg = '😶 No speech detected.\nPlease speak into the microphone.';
                    break;
                default:
                    msg = '⚠️ Voice error: ' + event.error;
            }
            
            alert(msg);
            btnElement.textContent = originalText;
            btnElement.style.backgroundColor = originalBg;
            btnElement.disabled = false;
        };

        // ╔─ onend ─╗
        recognition.onend = function() {
            console.log('🏁 Recognition ended');
            clearTimeout(timeoutId);
            
            // Reset button after a moment
            setTimeout(function() {
                if (!finalReceived) {
                    btnElement.textContent = originalText;
                    btnElement.style.backgroundColor = originalBg;
                }
                btnElement.disabled = false;
            }, 500);
        };

        // Start!
        console.log('🚀 Starting speech recognition');
        recognition.start();

    } catch (e) {
        console.error('💥 Exception:', e);
        alert('⚠️ Error starting voice input:\n' + e.message);
        btnElement.textContent = originalText;
        btnElement.disabled = false;
    }
};

console.log('✅ Voice Input Module Ready');
console.log('📋 Available languages:', Object.keys(window.SPEECH_LANG_CODES));
console.log('📞 Function:', typeof window.startFormVoice);
