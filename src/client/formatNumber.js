import numeral from 'numeral';

export default function formatNumber(num) {
  if (num < 1000) return num;
  if (num < 10000) return numeral(num).format('0.0a').toUpperCase();
  if (num < 1000000) return numeral(num).format('0a').toUpperCase();
  return numeral(num).format('0.0a').toUpperCase();
}
