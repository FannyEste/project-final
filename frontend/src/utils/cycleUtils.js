export const calculatePhases = (startDate, cycleLength, periodDuration) => {
    if (!startDate || !cycleLength || !periodDuration) {
        return {
            menstrual: [],
            follicular: [],
            ovulatory: [],
            luteal: [],
        };
    }

    const phases = {
        menstrual: [],
        follicular: [],
        ovulatory: [],
        luteal: [],
    };

    let currentStartDate = new Date(startDate);
    const futureLimit = new Date();
    futureLimit.setFullYear(futureLimit.getFullYear() + 2); // Generate cycles for the next 2 years

    while (currentStartDate < futureLimit) {
        for (let i = 0; i < cycleLength; i++) {
            const currentDate = new Date(currentStartDate);
            currentDate.setDate(currentStartDate.getDate() + i);

            if (i < periodDuration) {
                phases.menstrual.push(new Date(currentDate));
            } else if (i < periodDuration + 5) {
                phases.follicular.push(new Date(currentDate));
            } else if (i < periodDuration + 11) {
                phases.ovulatory.push(new Date(currentDate));
            } else {
                phases.luteal.push(new Date(currentDate));
            }
        }

        // Move to the next cycle start
        currentStartDate.setDate(currentStartDate.getDate() + cycleLength);
    }

    return phases;
};