export const ErrorSwapOKXCode = {
  81001: 'Wrong address format',
  82000: 'Insufficient liquidity',
  80001: 'Value variation greater',
  80002: 'Requested token object limit reached',
  80003: 'Requested mainnet token object limit reached',
  80004: 'Query SUI Object Timeout',
  80005: 'Insufficient sui object',
  82001: 'Service temporarily unavailable',
  82102: 'Risky transactions',
  82103: 'Risky transactions',
  82104: 'The currency is not supported',
  82105: 'The chain is not supported',
  82112: 'Value variation greater',
  82116: 'Call data exceeds limit. Please retry in 5 minutes.',
  82120: 'Risky transactions',
};
export const DisabledSwap = Object.keys(ErrorSwapOKXCode).map(d => Number(d));
