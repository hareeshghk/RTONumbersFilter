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
    if (!filters.allSame && !filters.ascending && !filters.xxyy && !filters.xxxy && !filters.xyyy && 
        !filters.recursiveSum && !filters.excludeDigits) {
        // If no filters are selected, return all data
        return data;
    }

    return data.filter(item => {
        // The vehicle number might have letters, so we extract the numeric part
        const numericPart = item.number.slice(-4);

        let matchesAllSame = !filters.allSame || isAllSame(numericPart);
        let matchesAscending = !filters.ascending || isAscending(numericPart);
        let matchesXXYY = !filters.xxyy || isXXYY(numericPart);
        let matchesXXXY = !filters.xxxy || isXXXY(numericPart);
        let matchesXYYY = !filters.xyyy || isXYYY(numericPart);
        let matchesRecursiveSum = !filters.recursiveSum || hasRecursiveSum(numericPart, filters.recursiveSumValue);
        let doesNotHaveExcludedDigits = !filters.excludeDigits || !containsExcludedDigits(numericPart, filters.excludeDigitsValue);

        return matchesAllSame && matchesAscending && matchesXXYY && matchesXXXY && matchesXYYY && 
               matchesRecursiveSum && doesNotHaveExcludedDigits;
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

function isXXYY(s) {
    if (s.length !== 4) return false;
    return s[0] === s[1] && s[2] === s[3];
}

function isXXXY(s) {
    if (s.length !== 4) return false;
    return s[0] === s[1] && s[1] === s[2];
}

function isXYYY(s) {
    if (s.length !== 4) return false;
    return s[1] === s[2] && s[2] === s[3]
}

function getRecursiveSum(s) {
    let sum = s.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    while (sum >= 10) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
}

function hasRecursiveSum(s, targetSum) {
    if (!targetSum || targetSum < 1 || targetSum > 9) return true; // If no valid target sum, don't filter
    return getRecursiveSum(s) === parseInt(targetSum);
}

function containsExcludedDigits(s, excludedDigits) {
    if (!excludedDigits || excludedDigits.trim() === '') return false; // If no excluded digits, don't filter
    const excludedSet = new Set(excludedDigits.replace(/\s+/g, '').split(''));
    return s.split('').some(digit => excludedSet.has(digit));
}
