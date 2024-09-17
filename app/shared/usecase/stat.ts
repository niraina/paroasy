export function formatNumber(
  value: any,
  currencySymbol = "%",
  separator = " ",
  chiffreAfterComa = 0
) {
  const formattedValue = parseFloat(value).toFixed(chiffreAfterComa);

  // pour supprimer ".00" si présent
  const formattedMoney = formattedValue.replace(/\.00$/, "");

  const parts = formattedMoney.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return `${parts.join(".")} ${currencySymbol}`;
}
