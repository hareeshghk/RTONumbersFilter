// This script is injected into the RTO webpage to extract the data.

function scrapeDataFromPage() {
    console.log("RTO Finder: Scraping page for numbers...");
    const scrapedData = [];

    // --- Start of Real Scraping Logic ---
    const numberTableRows = document.querySelectorAll("tr");
    console.log(`RTO Finder: Found ${numberTableRows.length} rows in the table.`);

    numberTableRows.forEach(row => {
        // console.log(`RTO Finder: Processing row... ${row}`);
        const columns = row.querySelectorAll('td');

        // We expect at least 5 columns in each row (S.No, Number, RTO, Price, Bidders)
        if (columns.length >= 5) {
            // Extract the text content and trim whitespace
            const vehicleNumber = columns[2]?.innerText.trim();
            const priceText = columns[3]?.innerText.trim();
            const applicantsText = columns[4]?.innerText.trim();

            // Check if all required data was found in the row
            if (vehicleNumber && priceText && applicantsText) {
                // Clean the data: remove commas from the price
                const vehicleNumber = columns[2]?.innerText.trim();
                const price = priceText.replace(/,/g, '');
                const applicants = parseInt(applicantsText, 10);

                // Add the cleaned data to our results array
                if (!isNaN(applicants)) { // Ensure applicants is a valid number
                     scrapedData.push({
                        number: vehicleNumber,
                        price: price,
                        applicants: applicants
                    });
                }
            }
        }
    });
    
    console.log(`RTO Finder: Scraped ${scrapedData.length} numbers.`);
    return scrapedData;
}


// Listen for a message from the background script to start scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        const data = scrapeDataFromPage();
        sendResponse({ scrapedData: data });
    }
});

