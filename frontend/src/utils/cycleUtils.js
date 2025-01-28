// cycleUtils.js

export const calculatePhases = (startDate, cycleLength, periodDuration) => {
  if (!startDate || !cycleLength || !periodDuration) {
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

  for (let i = 0; i < cycleLength; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      if (i < periodDuration) {
          phases.menstrual.push(currentDate);
      } else if (i < periodDuration + 5) {
          phases.follicular.push(currentDate);
      } else if (i < periodDuration + 11) {
          phases.ovulatory.push(currentDate);
      } else {
          phases.luteal.push(currentDate);
      }
  }

  return phases;
};