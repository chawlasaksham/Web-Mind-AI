// This script runs in the background of the extension and handles API calls.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Check if the message is intended for the Gemini API call.
    if (request.type === 'callGemini') {
        
        // --- IMPORTANT: ADD YOUR API KEY HERE ---
        // You can get a free key from Google AI Studio.
        const API_KEY = "AIzaSyDZxIqH4ER3OI_wCmwZWSVp3XsV0dMqyAo"; 
        
        // The specific Gemini model and API endpoint URL.
        const MODEL_NAME = 'gemini-1.5-flash-latest';
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
        
        // We use an async function to handle the API call.
        (async () => {
            // First, check if the user has added their API key.
            if (!API_KEY || API_KEY === "PASTE YOUR API KEY HERE") {
                sendResponse({ 
                    success: false, 
                    text: "API Key not found. Please add your Gemini API key to the background.js file." 
                });
                return; // Stop execution if no key is found.
            }

            try {
                // Prepare the data payload in the format required by the Gemini API.
                const payload = { 
                    contents: [{ 
                        parts: [{ 
                            text: request.prompt 
                        }] 
                    }] 
                };

                // Make the API call using the fetch() function.
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(payload),
                });

                // Check if the network response was successful.
                const result = await response.json();

                if (!response.ok) {
                    const errorMessage = result?.error?.message || response.statusText || 'Unknown error';
                    throw new Error(`API Error: ${response.status} ${errorMessage}`);
                }

                // Safely extract the generated text from the API's response structure.
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";
                
                // Send a successful response back to the content script.
                sendResponse({ success: true, text: text });

            } catch (error) {
                // If anything goes wrong, log the error and send an error message back.
                console.error("API call failed in background script:", error);
                sendResponse({ success: false, text: `An error occurred: ${error.message}` });
            }
        })();

        // Return true to indicate that the response will be sent asynchronously.
        // This is required for chrome.runtime.onMessage listeners.
        return true; 
    }
});