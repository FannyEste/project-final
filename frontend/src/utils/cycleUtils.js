export const calculatePhases = (startDate, cycleLength, periodDuration) => {
    if (!startDate || !cycleLength || !periodDuration) {
      console.error("Invalid input to calculatePhases:", {
        startDate,
        cycleLength,
        periodDuration,
      });
      return {
        menstrual: [],
        follicular: [],
        ovulatory: [],
        luteal: [],
      };
    }
  
    const start = new Date(startDate);
    const phases = {
      menstrual: [],
      follicular: [],
      ovulatory: [],
      luteal: [],
    };
    console.log ('StartDate: ', startDate);
    const currentDate = new Date(start);
    const test = new Date(startDate);
    const daysBetween = (currentDate - test) / (1000 * 60 * 60 *24);

    console.log (currentDate);
    console.log (daysBetween);
    for (let i = 0; i < cycleLength; i++) {
      /*const currentDate = new Date(start);
      const startDate = new Date(start);
      const daysBetween = currentDate - startDate;

      console.log (daysBetween);*/

      currentDate.setDate(start.getDate() + i);

      if (i < periodDuration) {
        phases.menstrual.push(currentDate);
      } else if (i < cycleLength - 14 - periodDuration) {
        phases.follicular.push(currentDate);
      } else if (i < cycleLength - 14) {
        phases.ovulatory.push(currentDate);
      } else {
        phases.luteal.push(currentDate);
      }
    }
  
    return phases;
  };
  