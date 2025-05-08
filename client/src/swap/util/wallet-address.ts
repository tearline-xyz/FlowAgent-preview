export const truncateWalletAddr = (
  address: string | null | any,
): string | null => {
  if (!address) {
    return address;
  }
  if (address.length <= 12) {
    return address;
  }
  if (typeof address !== 'string') {
    address = '';
  }
  const addrSymbols = address.split('');
  const firstPart = addrSymbols.slice(0, 5).join('');
  const lastPart = addrSymbols
    .slice(addrSymbols.length - 4, addrSymbols.length)
    .join('');
  return `${firstPart}...${lastPart}`;
};
