export const generateBedRegex = (noOfGuests: number): RegExp => {
  // Define the base patterns
  const commonPatterns = ['1 small double bed', '1 double bed'];
  const commonPatterns2 = ['2 beds', '2 bedrooms'];

  switch (noOfGuests) {
    case 1:
      return new RegExp(`^1 bed$|^1 double bed$|^2 beds$|${commonPatterns.join('|')}`, 'i');
      break;
    case 2:
      return new RegExp(`^${noOfGuests} beds$|${commonPatterns.join('|')}`, 'i');
      break;
    case 3:
      return new RegExp(`^${noOfGuests} beds$|${commonPatterns2.join('|')}`, 'i');
      break;
    default:
      return new RegExp(`^${noOfGuests} beds$`, 'i');
      break;
  }
};
