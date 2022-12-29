export default function FormatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  const formatter = Intl.NumberFormat('en-US');

  // check if it's a clean dolloar ammount
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const wholeAmount = amount / 100;
  return formatter.format(wholeAmount);
}
