export const convertNumber = (number) => {
  let convertedNumber = Number(number).toLocaleString();

  while (convertedNumber.includes(",")) {
    convertedNumber = convertedNumber.replace(",", ".");
  }

  return convertedNumber;
};
