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
    const today = new Date(); // Get today's date
    const pastLimit = new Date();
    pastLimit.setFullYear(pastLimit.getFullYear() - 2); // Generate past 2 years
    const futureLimit = new Date();
    futureLimit.setFullYear(futureLimit.getFullYear() + 2); // Generate for next 2 years

    // 🔹 Generate past cycles (going backwards)
    while (currentStartDate > pastLimit) {
        currentStartDate.setDate(currentStartDate.getDate() - cycleLength);
    }

    // 🔹 Generate cycles from the past up to the future
    while (currentStartDate <= futureLimit) {
        const cycleDays = [];

        for (let i = 0; i < cycleLength; i++) {
            const currentDate = new Date(currentStartDate);
            currentDate.setDate(currentStartDate.getDate() + i);

            cycleDays.push(new Date(currentDate)); // Store all days in the cycle

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

        console.log(`Cycle generated from ${cycleDays[0].toDateString()} to ${cycleDays[cycleLength - 1].toDateString()}`);

        // 🔹 Move `currentStartDate` forward by exactly one cycle
        currentStartDate.setDate(currentStartDate.getDate() + cycleLength);
    }

    console.log("Generated Phases:", phases); // ✅ Debugging output
    return phases;
};