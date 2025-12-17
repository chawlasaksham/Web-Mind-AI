(function() {
    const icons = {
        chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m6 9 6 6 6-6"/></svg>`,
        fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
        send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
        microphone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M12 1v10"/><path d="M8 5v6a4 4 0 0 0 8 0V5a4 4 0 0 0-8 0Z"/><path d="M19 10a7 7 0 0 1-14 0"/><path d="M12 19v4"/><path d="M8 23h8"/></svg>`,
        brainCircuit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.5 3.75 4 4 0 0 0 .5 7.5 4 4 0 0 0 5.165 2.125 3 3 0 1 0 5.83-2.123 4.5 4.5 0 0 0 6.165-1.125 4.5 4.5 0 0 0-1.165-6.125 3 3 0 1 0-5.996-1.127Z"/><path d="M16 8a4.5 4.5 0 0 0-3.333 1.125"/><path d="M12.835 15.875A3 3 0 1 0 12.833 10"/><path d="M4.003 12.875A4 4 0 0 0 8.5 12.5"/><path d="M4.5 16.5A4 4 0 0 0 8.5 17"/><path d="M12.835 10A3 3 0 1 0 12.833 16"/><path d="M18 16a3 3 0 1 0-5.996-1.127"/><path d="M18 8a3 3 0 1 0-6 0"/><path d="M6 12a3 3 0 1 0-6 0"/><path d="M22 12a3 3 0 1 0-6 0"/><path d="M12 22a3 3 0 1 0 0-6"/><path d="M12 2a3 3 0 1 0 0 6"/></svg>`
    };

    const extensionHTML = `
        <div id="ai-extension-container">
            <!-- Main extension popup -->
            <div id="extension-popup" class="w-full max-w-md h-[600px] bg-gray-900 text-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
                <!-- Header -->
                <header class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-indigo-600 rounded-lg">
                            ${icons.brainCircuit}
                        </div>
                        <h1 class="text-xl font-bold text-white">JIIT Web Smart</h1>
                    </div>
                    <div class="flex items-center gap-2">
                        <div id="status-indicator" class="w-3 h-3 bg-green-500 rounded-full" title="Ready"></div>
                        <button id="minimize-btn" class="text-gray-500 hover:text-white transition-colors">
                            ${icons.chevronDown}
                        </button>
                    </div>
                </header>
                
                 <nav class="flex justify-around p-2 bg-gray-800 border-b border-gray-700 flex-shrink-0">
                    <button data-tab="summary" class="tab-button flex-1 text-center py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 bg-indigo-600 text-white">Summary</button>
                    <button data-tab="rewrite" class="tab-button flex-1 text-center py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 text-gray-400 hover:bg-gray-700">Rewrite</button>
                    <button data-tab="chat" class="tab-button flex-1 text-center py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 text-gray-400 hover:bg-gray-700">Chat</button>
                </nav>

                <!-- Content Area -->
                <main class="flex-grow flex flex-col overflow-y-auto">
                    <!-- Summary Tab -->
                    <div id="summary-content" class="tab-content p-5 space-y-4">
                        <button id="summarize-btn" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200">
                            ${icons.fileText}
                            Summarize Page
                        </button>
                        <div id="summary-output" class="p-4 bg-gray-800 rounded-lg min-h-[200px] text-gray-300 whitespace-pre-wrap">Click to generate a summary of this page.</div>
                    </div>

                    <!-- Rewrite Tab -->
                    <div id="rewrite-content" class="tab-content hidden p-5 space-y-4 text-center">
                         <div class="flex items-center justify-center gap-4">
                            <span class="text-gray-300 font-medium">Selection Mode</span>
                            <label class="ai-extension-toggle-switch">
                                <input type="checkbox" id="rewrite-toggle">
                                <span class="ai-extension-slider"></span>
                            </label>
                        </div>
                        <p class="text-sm text-gray-400">Toggle on selection mode, then click on any paragraph on the page to rewrite it.</p>
                        <div class="flex items-center gap-2 pt-4">
                            <select id="rewrite-mode" class="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500">
                                <option value="Simpler">Simplify</option>
                                <option value="More Professional">Make Professional</option>
                                <option value="More Concise">Make Concise</option>
                                <option value="More Elaborate">Elaborate</option>
                            </select>
                        </div>
                        <div id="rewrite-output" class="p-4 bg-gray-800 rounded-lg min-h-[150px] text-gray-300 whitespace-pre-wrap text-left">The rewritten text will appear here.</div>
                    </div>

                    <!-- Chat Tab -->
                    <div id="chat-content" class="tab-content hidden h-full flex flex-col p-5">
                        <div id="chat-window" class="flex-grow space-y-4 flex flex-col mb-4 custom-scrollbar overflow-y-auto pr-2">
                            <div class="chat-bubble-ai p-3 rounded-lg max-w-xs text-sm">Ask me anything about this page.</div>
                        </div>
                        <div id="chat-input-container" class="flex items-center gap-2">
                            <input type="text" id="chat-input" placeholder="Ask a question..." class="flex-grow p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <button id="chat-voice-btn" class="bg-gray-800 hover:bg-gray-700 text-indigo-300 p-3 rounded-lg flex items-center justify-center border border-gray-600 transition-colors" title="Speak your question">
                                ${icons.microphone}
                            </button>
                            <button id="chat-send-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg flex items-center justify-center">
                                ${icons.send}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            
            <!-- Trigger button -->
            <button id="ai-trigger-btn" class="bg-transparent rounded-full w-16 h-16 flex items-center justify-center shadow-lg p-0">
                 <img id="ai-trigger-logo" src="" class="w-full h-full rounded-full" alt="AI Web Smart Logo">
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', extensionHTML);
    
    // --- 3. SET DYNAMIC IMAGE SOURCE ---
    const triggerLogo = document.getElementById('ai-trigger-logo');
    if (triggerLogo) {
        const logoUrl = chrome.runtime.getURL('images/logo.png');
        triggerLogo.src = logoUrl;
        
        // Add an error handler for debugging
        triggerLogo.onerror = () => {
            console.error("AI Web Smart Error: Could not load the trigger logo. Please check the following:");
            console.error("1. Is the file located at 'images/logo.png' in your extension folder?");
            console.error("2. Is the file name spelled correctly and all lowercase ('logo.png')?");
            console.error("3. Did you click the 'Reload' button on the chrome://extensions page after adding the image?");
            console.error("4. Is 'images/logo.png' listed in the 'web_accessible_resources' section of your manifest.json file?");
        };
    }

    // --- 4. GET REFERENCES TO DOM ELEMENTS ---
    const container = document.getElementById('ai-extension-container');
    if (!container) return;

    const triggerBtn = document.getElementById('ai-trigger-btn');
    const minimizeBtn = document.getElementById('minimize-btn');
    const statusIndicator = document.getElementById('status-indicator');
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const summarizeBtn = document.getElementById('summarize-btn');
    const summaryOutput = document.getElementById('summary-output');

    const rewriteToggle = document.getElementById('rewrite-toggle');
    const rewriteMode = document.getElementById('rewrite-mode');
    const rewriteOutput = document.getElementById('rewrite-output');

    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatVoiceBtn = document.getElementById('chat-voice-btn');
    
    // --- 5. CORE LOGIC & STATE ---
    let isRewriteModeActive = false;
    let highlightedElement = null;

    const getPageContent = () => document.body.innerText;
    const toggleExtension = (show) => container.classList.toggle('active', show);

    triggerBtn.addEventListener('click', () => toggleExtension(true));
    minimizeBtn.addEventListener('click', () => toggleExtension(false));

    const showLoading = (element, message = 'Thinking...') => {
        const isChatWindow = element.id === 'chat-window';
        const loadingHTML = `<div class="loading-indicator flex items-center justify-center gap-3 text-gray-400 ${isChatWindow ? 'p-3' : ''}"><div class="w-5 h-5 border-2 border-gray-500 border-t-indigo-500 rounded-full animate-spin"></div><span>${message}</span></div>`;
        if (isChatWindow) {
            const bubble = document.createElement('div');
            bubble.innerHTML = loadingHTML;
            element.appendChild(bubble);
            element.scrollTop = element.scrollHeight;
        } else {
            element.innerHTML = loadingHTML;
        }
        statusIndicator.className = 'w-3 h-3 bg-yellow-500 rounded-full';
        statusIndicator.title = 'Processing...';
    };

    const setReadyState = (isError = false) => {
        statusIndicator.className = `w-3 h-3 rounded-full ${isError ? 'bg-red-500' : 'bg-green-500'}`;
        statusIndicator.title = isError ? 'Error' : 'Ready';
    };
    
    const addChatMessage = (message, sender) => {
        const bubble = document.createElement('div');
        bubble.textContent = message;
        bubble.className = `p-3 rounded-lg max-w-xs text-sm ${sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`;
        chatWindow.appendChild(bubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const callGeminiAPI = async (prompt) => {
        try {
            const response = await chrome.runtime.sendMessage({ type: 'callGemini', prompt: prompt });
            if (chrome.runtime.lastError) {
                setReadyState(true);
                return `Error: ${chrome.runtime.lastError.message}`;
            }
            if (response && response.success) {
                setReadyState(false);
                return response.text;
            } else {
                setReadyState(true);
                return response.text || "An unknown error occurred.";
            }
        } catch (error) {
            setReadyState(true);
            return `An error occurred: ${error.message}`;
        }
    };
    
    // --- 6. EVENT HANDLERS ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('bg-indigo-600', 'text-white');
                t.classList.add('text-gray-400', 'hover:bg-gray-700');
            });
            tab.classList.add('bg-indigo-600', 'text-white');
            tab.classList.remove('text-gray-400', 'hover:bg-gray-700');
            tabContents.forEach(c => c.classList.add('hidden'));
            document.getElementById(tab.dataset.tab + '-content').classList.remove('hidden');
            
            if (tab.dataset.tab !== 'rewrite' && isRewriteModeActive) {
                rewriteToggle.checked = false;
                deactivateRewriteMode();
            }
        });
    });

    summarizeBtn.addEventListener('click', async () => {
        showLoading(summaryOutput, 'Summarizing...');
        const pageContent = getPageContent();
        const prompt = `Provide a concise, easy-to-read summary of the following content. Use bullet points for key features.\n\nCONTENT:\n${pageContent}`;
        summaryOutput.innerText = await callGeminiAPI(prompt);
    });

    const handleParagraphHighlight = (e) => {
        const target = e.target.closest('p, h1, h2, h3, h4, h5, h6, li, th, td');
        if (highlightedElement === target) return;

        if (highlightedElement) {
            highlightedElement.classList.remove('ai-extension-paragraph-highlight');
        }

        if (target && target.innerText.trim().length > 20) {
            highlightedElement = target;
            highlightedElement.classList.add('ai-extension-paragraph-highlight');
        } else {
            highlightedElement = null;
        }
    };

    const handleParagraphClick = async (e) => {
        if (highlightedElement) {
            e.preventDefault();
            e.stopPropagation();

            const textToRewrite = highlightedElement.innerText;
            deactivateRewriteMode();
            rewriteToggle.checked = false;
            
            toggleExtension(true);
            showLoading(rewriteOutput, 'Rewriting...');

            const prompt = `Rewrite the following text to make it "${rewriteMode.value}".\n\nORIGINAL:\n${textToRewrite}`;
            rewriteOutput.innerText = await callGeminiAPI(prompt);
        }
    };

    function activateRewriteMode() {
        if (isRewriteModeActive) return;
        isRewriteModeActive = true;
        toggleExtension(false); 
        document.addEventListener('mousemove', handleParagraphHighlight);
        document.addEventListener('click', handleParagraphClick, true);
    }

    function deactivateRewriteMode() {
        if (!isRewriteModeActive) return;
        isRewriteModeActive = false;
        if (highlightedElement) {
            highlightedElement.classList.remove('ai-extension-paragraph-highlight');
            highlightedElement = null;
        }
        document.removeEventListener('mousemove', handleParagraphHighlight);
        document.removeEventListener('click', handleParagraphClick, true);
    }
    
    rewriteToggle.addEventListener('change', () => {
        if (rewriteToggle.checked) {
            activateRewriteMode();
        } else {
            deactivateRewriteMode();
        }
    });

    const handleChat = async () => {
        const question = chatInput.value.trim();
        if (!question) return;
        addChatMessage(question, 'user');
        chatInput.value = '';
        showLoading(chatWindow);
        const pageContent = getPageContent();
        const prompt = `You are a helpful AI assistant answering questions about a webpage. Use ONLY the provided context to answer. If the answer isn't in the context, say you cannot find the information on the page.\n\nCONTEXT:\n${pageContent}\n\nQUESTION:\n${question}`;
        const answer = await callGeminiAPI(prompt);
        chatWindow.querySelector('.loading-indicator')?.parentElement.remove();
        addChatMessage(answer, 'ai');
    };

    chatSendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });

    // --- 7. SPEECH TO TEXT SUPPORT ---
    if (chatVoiceBtn) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = null;
        let isListening = false;
        let speechInputBase = '';

        const resetPlaceholder = () => {
            chatInput.placeholder = 'Ask a question...';
        };

        const setVoiceBtnState = (listening) => {
            isListening = listening;
            chatVoiceBtn.classList.toggle('bg-indigo-600', listening);
            chatVoiceBtn.classList.toggle('text-white', listening);
            chatVoiceBtn.classList.toggle('border-indigo-400', listening);
            chatVoiceBtn.classList.toggle('bg-gray-800', !listening);
            chatVoiceBtn.classList.toggle('text-indigo-300', !listening);
            chatVoiceBtn.classList.toggle('border-gray-600', !listening);
            chatVoiceBtn.title = listening ? 'Listening... click to stop' : 'Speak your question';
        };

        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = navigator.language || 'en-US';

            recognition.addEventListener('start', () => {
                speechInputBase = chatInput.value.trim();
                chatInput.placeholder = 'Listening...';
                setVoiceBtnState(true);
            });

            recognition.addEventListener('result', (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript.trim();
                    if (event.results[i].isFinal) {
                        finalTranscript += ` ${transcript}`;
                    } else {
                        interimTranscript += ` ${transcript}`;
                    }
                }

                const composed = `${speechInputBase} ${finalTranscript} ${interimTranscript}`.replace(/\s+/g, ' ').trim();
                chatInput.value = composed;
            });

            recognition.addEventListener('end', () => {
                resetPlaceholder();
                setVoiceBtnState(false);
            });

            recognition.addEventListener('error', (event) => {
                console.error('Speech recognition error:', event.error);
                resetPlaceholder();
                setVoiceBtnState(false);
            });
        } else {
            chatVoiceBtn.disabled = true;
            chatVoiceBtn.title = 'Speech recognition not supported in this browser';
            chatVoiceBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }

        chatVoiceBtn.addEventListener('click', () => {
            if (!recognition) return;
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    }
})();