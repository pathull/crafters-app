export const checkValidEmail = (email: string): boolean => {
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) return true;
  return false;
};

export const checkTwoDecimalNumber = (number: string): boolean => {
  if (/^\d*\.?\d{0,2}$/.test(number)) return true;
  return false;
};
