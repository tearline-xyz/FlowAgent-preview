export enum ErrorCodeEnum {
  SUCCESS = 0,
  UnknownError = 1000,
  NotFound = 1004,
  ErrorParams = 1005,
  TooManyRequests = 1007,
  LoginRequired = 1001,
  AuthCodeError = 1002,
  InvitationCodeNotExist = 2001,
  SendEmailError = 2002,
  VerificationCodeError = 2003,
  UserNotExist = 2005,
  EmailFormatError = 2009,
  EmailWaiting = 2012,
  NoNeedLoginAgain = 2013,
  InvitationCodeFormatError = 2014,
  UserHasBindInvitationCode = 2015,
  UserTwitterAlreadyBind = 2016,
  TwitterHasBind = 2017,
  TwitterCodeError = 2018,
  UserNotActivated = 2019,
  TelegramUserInvalid = 2020,
  TelegramUserAuthDateInvalid = 2021,
  TwitterRequired = 2022,
  TelegramSendMsgInvalid = 2023,
  UserTgNotExist = 2024,
  TelegramGetMemberInvalid = 2025,
  WalletAddressHasBind = 2026,
  UserWalletAddressAlreadyBind = 2027,
  EmailHasBind = 2028,
  UserEmailAlreadyBind = 2029,
  UserWaitingVerifyToken = 2030,
  UserTokenNotExist = 2031,
  UserHasBind = 2031,
  UserPlatformError = 2032,
  ComputingStageError = 2033,
  UserAlreadyBindOtherTg = 2034,
  UserAlreadyBindThisTg = 2035,
  ThisTgHasBeenBoundByOtherUser = 2036,
  UserAlreadyBindOtherTwitter = 2037,
  UserAlreadyBindThisTwitter = 2038,
  ThisTwitterHasBeenBoundByOtherUser = 2039,
  H5KeyNotExist = 2040,
  SearchingTooFrequent = 3000,
  QAServerError = 3001,
  QAServerFailed = 3002,
  ComputingQaNotEnough = 3003,
  HistoryHasBeenChanged = 3005,
  SessionIdFormatError = 3006,
  InvalidSessionName = 3007,
  HistoryIdFormatError = 3009,
  TooManySessions = 3010,
  NoHistoryData = 3011,
  NormalQaNotEnough = 3012,
  UserNodeLevelNotSupportAiModel = 3013,
  UpgradeNodeNotExceedError = 4002,
  ComputingNotEnough = 3004,
  PowerNotEnough = 4001,
  TaskNotFound = 5000,
  TaskConfigError = 5001,
  AchievementNotFound = 6000,
  InvalidProductInfo = 7000,
  ProductInfoNotFound = 7001,
  OrderNotFound = 7002,
  UpdateOrderStateFailed = 7003,
  OrderIdFormatError = 7004,
  InvalidUpgradeLevel = 7005,
  NotZeroLevelUser = 7006,
  HasUncompletedOrder = 7007,
  InvalidUpgradeDays = 7008,
  FavouriteLimit = 8001,
  CoinPriceExpired = 8002,
  InputTokenAmountFormatError = 8003,
  CoinPriceNotFound = 8004,
  AddressNotFound = 8005,
  TxHashRequired = 8006,
  TxNotFound = 8007,
  TxNotBelongToUser = 8008,
  UnsupportedChainError = 8009,
  HomeTaskNotFound = 9000,
  HomeTaskNotMainTask = 9001,
  HomeTaskMainTaskTypeNotFound = 9002,
  HomeTaskNotFinished = 9003,
  HomeTaskAlreadyFinished = 9004,
  RewardPoolNotFound = 9005,
  RewardPoolEmpty = 9006,
  MainTaskTypeError = 9007,
  BubbleNotFound = 9008,
  BubbleNotFinished = 9009,
  BubbleAlreadyFinished = 9010,
  FromTokenAddress = 51000,
  NotApi = 50050,

}


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
