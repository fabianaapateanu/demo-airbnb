/**
 * Return an obj with day, month, year
 * Used for the Search calendar day selection
 * @param date
 * @returns
 */
export const getDateObj = (date): { day: string; month: string; year: string } => {
  const year = date.getFullYear();
  //month is 0 indexed
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return { day, month, year };
};
