export const formatToMonthYear = (date: Date) => {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};