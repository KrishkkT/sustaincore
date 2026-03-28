function getNextQuarterDeadline() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const year = now.getFullYear();

    let targetMonth; // The month after the quarter ends (reporting month)
    let targetYear = year;

    if (month < 3) { // Q1 ends Mar 31, deadline is Apr 30
        targetMonth = 3; // April
    } else if (month < 6) { // Q2 ends Jun 30, deadline is Jul 31
        targetMonth = 6; // July
    } else if (month < 9) { // Q3 ends Sep 30, deadline is Oct 31
        targetMonth = 9; // October
    } else { // Q4 ends Dec 31, deadline is Jan 31
        targetMonth = 0; // January
        targetYear = year + 1;
    }

    // Reporting deadlines are usually end of the month following the quarter
    // Q1: Jan-Mar -> deadline Apr 30
    // Q2: Apr-Jun -> deadline Jul 31
    // Q3: Jul-Sep -> deadline Oct 31
    // Q4: Oct-Dec -> deadline Jan 31 next year

    const deadlines = [
        { m: 0, d: 31 }, // Jan 31
        { m: 3, d: 30 }, // Apr 30
        { m: 6, d: 31 }, // Jul 31
        { m: 9, d: 31 }  // Oct 31
    ];

    const target = deadlines.find(dl => dl.m === targetMonth);
    return new Date(targetYear, target.m, target.d, 23, 59, 59);
}

function updateTimer() {
    const deadline = getNextQuarterDeadline();
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) {
        // Reset timer logic or show "Deadline Passed"
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('cd-d');
    const hoursEl = document.getElementById('cd-h');
    const minutesEl = document.getElementById('cd-m');
    const secondsEl = document.getElementById('cd-s');

    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cd-d')) {
        updateTimer();
        setInterval(updateTimer, 1000);
    }
});
