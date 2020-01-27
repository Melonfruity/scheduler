export const updateSpots = (change, dayOf, state) => {

  const updatedDays = state.days.map((day) => {
    if (day.name === dayOf.name) {
      if (change === 'book' && day.spots - 1 >= 0) {
        return { ...day, spots: day.spots - 1 }
      } else if (change === 'cancel' && day.spots + 1 <= 5) {
        return { ...day, spots: day.spots + 1 }
      }
    }
    return day;
  });

  return updatedDays;
};