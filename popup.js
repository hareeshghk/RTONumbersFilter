document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchNumbersBtn');
    const resultsContainer = document.getElementById('results-container');
    const resultsBody = document.getElementById('results-body');
    const statusDiv = document.getElementById('status');
    const allSameCheckbox = document.getElementById('allSame');
    const ascendingCheckbox = document.getElementById('ascending');

    fetchButton.addEventListener('click', () => {
        statusDiv.textContent = 'Fetching and filtering numbers...';
        resultsContainer.classList.add('hidden'); // Hide old results
        resultsBody.innerHTML = ''; // Clear old results

        // Get filter values
        const filters = {
            allSame: allSameCheckbox.checked,
            ascending: ascendingCheckbox.checked
        };
        
        // Send a message to the background script to start the process
        chrome.runtime.sendMessage({
            action: "fetchAndFilter",
            filters: filters
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                statusDiv.textContent = 'Error: Could not connect to the page. Make sure you are on the RTO portal.';
                return;
            }

            if (response && response.data) {
                renderResults(response.data);
            } else {
                 statusDiv.textContent = 'No numbers found matching your criteria.';
            }
        });
    });

    function renderResults(numbers) {
        if (numbers.length === 0) {
            statusDiv.textContent = 'No numbers found matching your criteria.';
            return;
        }

        statusDiv.textContent = `Found ${numbers.length} matching numbers. Sorted by price.`;
        
        const fragment = document.createDocumentFragment();
        numbers.forEach(num => {
            const row = document.createElement('tr');
            row.className = 'bg-white border-b hover:bg-slate-50';

            const numberCell = document.createElement('td');
            numberCell.className = 'px-4 py-2 font-mono font-medium text-slate-900';
            numberCell.textContent = num.number;

            const priceCell = document.createElement('td');
            priceCell.className = 'px-4 py-2 text-right text-green-700';
            // Format price with Indian numbering system commas
            priceCell.textContent = new Intl.NumberFormat('en-IN').format(num.price);

            const applicantsCell = document.createElement('td');
            applicantsCell.className = 'px-4 py-2 text-center font-bold text-blue-600';
            applicantsCell.textContent = num.applicants;

            row.appendChild(numberCell);
            row.appendChild(priceCell);
            row.appendChild(applicantsCell);
            
            fragment.appendChild(row);
        });
        
        resultsBody.appendChild(fragment);
        resultsContainer.classList.remove('hidden'); // Show the results table
    }
});

