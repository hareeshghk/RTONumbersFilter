// Listens for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchAndFilter") {
        // 1. Get the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("No active tab found.");
                sendResponse({ data: [] });
                return;
            }
            const activeTab = tabs[0];

            // 2. Inject the content script into the active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: ['content_script.js']
            }, () => {
                 // 3. After script is injected, send a message to it to start scraping
                chrome.tabs.sendMessage(activeTab.id, { action: "scrape" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        // This can happen if the content script can't be injected, e.g., on chrome:// pages
                        sendResponse({ data: [] });
                        return;
                    }

                    if (response && response.scrapedData) {
                        // 4. Filter the data based on conditions from the popup
                        const filteredData = filterData(response.scrapedData, request.filters);
                        
                        // NEW: Sort the filtered data by price in ascending order
                        filteredData.sort((a, b) => parseInt(a.price) - parseInt(b.price));

                        // 5. Send the sorted and filtered data back to the popup
                        sendResponse({ data: filteredData });
                    } else {
                        sendResponse({ data: [] });
                    }
                });
            });
        });

        // Return true to indicate that we will send a response asynchronously
        return true; 
    }
});

// --- Filtering Logic ---
function filterData(data, filters) {
    if (!filters.allSame && !filters.ascending) {
        // If no filters are selected, return all data
        return data;
    }

    return data.filter(item => {
        // The vehicle number might have letters, so we extract the numeric part
        const numericPart = item.number.slice(-4);

        let matchesAllSame = !filters.allSame || isAllSame(numericPart);
        let matchesAscending = !filters.ascending || isAscending(numericPart);

        return matchesAllSame && matchesAscending;
    });
}

function isAllSame(s) {
    if (s.length <= 1) return false; // Not very "special" if it's one digit
    const first = s[0];
    for (let i = 1; i < s.length; i++) {
        if (s[i] !== first) return false;
    }
    return true;
}

function isAscending(s) {
    if (s.length <= 1) return false;
    for (let i = 0; i < s.length - 1; i++) {
        // Check if the next digit is greater than the current
        const current = parseInt(s[i]);
        const next = parseInt(s[i+1]);
        if (next < current) {
            return false;
        }
    }
    return true;
}
