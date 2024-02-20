function calculateAges() {
    const birthdate = new Date(document.getElementById('birthdate').value);
    const resultsDiv = document.getElementById('results');
    if (!birthdate.getTime()) {
        resultsDiv.innerHTML = '<p class="text-warning">Please enter a valid birthdate.</p>';
        return;
    }

    const milestones = [5000, 10000, 15000, 20000, 25000, 30000];
    let resultsHtml = '<div class="list-group">';

    milestones.forEach(days => {
        // We add one day to the birthdate before calculating the milestone to ensure we start counting from day 0
        const milestoneDate = new Date(birthdate);
        milestoneDate.setDate(birthdate.getDate() + days);
        const age = calculateExactAge(birthdate, milestoneDate);
        milestoneDate.setDate(milestoneDate.getDate() + 1);
        resultsHtml += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${days} days old milestone</h5>
                                <small>${milestoneDate.toDateString()}</small>
                            </div>
                            <p class="mb-1">Exact age: ${age.years} years, ${age.months} months, ${age.days} days</p>
                        </a>`;
    });

    resultsHtml += '</div>';
    resultsDiv.innerHTML = resultsHtml;
}

function calculateExactAge(fromDate, toDate) {
    const years = toDate.getFullYear() - fromDate.getFullYear();
    let months = toDate.getMonth() - fromDate.getMonth();
    let days = toDate.getDate() - fromDate.getDate();

    if (days < 0) {
        months--;
        // Get the total number of days in the month prior to the toDate
        const endOfMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0).getDate();
        days += endOfMonth;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

