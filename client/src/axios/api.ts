export const Api = {
  login: {
    login: '/affiliate/api/v1/auth/tg/login',
  },
  home: {
    info: '/affiliate/api/v1/home/info',
    inviteList: '/affiliate/api/v1/home/invite_list',
    inviteDetail: '/affiliate/api/v1/home/invited_user/detail',
  },
  userInfo: {
    affiliateiInfo: '/affiliate/api/v1/user/info',
    info: '/api/v1/user/info',
  },

  // Chat Start
  earn: {
    xRedirect: '/api/v1/auth/x/redirect',
    xCallback: '/api/v1/auth/x/callback',
    xDisconnect: '/api/v1/auth/x/disconnect',
    walletBind: '/api/v1/auth/wallet/bind',
    walletDisconnect: '/api/v1/auth/wallet/disconnect',
    taskState: '/api/v1/task/state',
    followOfficial: '/api/v1/task/x/follow_official',
    checkCheckin: '/api/v1/task/check_checkin',
    taskCheckin: '/api/v1/task/checkin',
    taskWebCheckin: '/api/v1/task/web/checkin',
    projectUpdates: '/api/v1/task/x/retweet/project_updates',
    milstones: '/api/v1/task/x/retweet/milstones',
    collabEvents: '/api/v1/task/x/retweet/collab_events',
    replyMention: '/api/v1/task/x/reply_mention',
    taskLogin: '/api/v1/task/login',
    visitOfficialWebsite: '/api/v1/task/visit_official_website',
    joinTgOfficialGroup: '/api/v1/task/join_tg_official_group',
    joinTgNewsChannel: '/api/v1/task/join_tg_news_channel',
    visitPartnership: '/api/v1/task/visit_partnership',
    modifyTgName: '/api/v1/task/modify_tg_name',
    boostChannel: '/api/v1/task/boost_channel',
    checkSendStory: '/api/v1/task/check_send_story',
    bindX: '/api/v1/task/bind_x',
    sendStory: '/api/v1/task/send_story',
    achievementState: '/api/v1/achievement/state',
    achievementCheckin: '/api/v1/achievement/checkin',
    achievementInvite: '/api/v1/achievement/invite',
    achievementPurchase: '/api/v1/achievement/purchase',
    achievementUpdate: '/api/v1/achievement/update',
    achievementWebState: '/api/v1/achievement/web/state',
    achievementWebCheckin: '/api/v1/achievement/web/checkin',
    achievementWebPurchase: '/api/v1/achievement/web/purchase',
    achievementWebUpdate: '/api/v1/achievement/web/update',
    leadboardRank: '/api/v1/user/computing/rank',
  },
  chatLogin: {
    login: '/api/v1/auth/login_by_tg_web',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
    googleLogin: '/api/v1/auth/login_by_google',
  },
  order: {
    create: '/api/v1/order/create',
    product: '/api/v1/order/product',
    trigger: '/api/v1/order/payment/trigger',
    convert: '/api/v1/order/convert',
    check: '/api/v1/order/check',
    list: '/api/v1/order/list',
    upgradeProduct: '/api/v1/order/upgrade/product',
    upgradeCreate: '/api/v1/order/upgrade/create',
    upgradeConvert: '/api/v1/order/upgrade_convert',
    upgrade_convert: '/api/v1/order/upgrade_convert',
  },
  user: {
    computing: '/api/v1/user/computing',
    userMsqQa: '/api/v1/user/msg_qa',
    userPower: '/api/v1/user/power',
    stageReward: '/api/v1/user/computing/stage',
    aiModelWithNode: '/api/v1/user/ai_model_with_node',
  },
  auth: {
    loginByTgH5: '/api/v1/auth/login_by_tg_h5',
    h5Submit:'/api/v1/auth/tg/h5/submit',
    bindSubmit: '/api/v1/auth/email/bind/submit',
    bindVerify: '/api/v1/auth/email/bind/verify',
    userActive: '/api/v1/auth/user/active',
    telegramBind: '/api/v1/auth/telegram/bind',
    telegramH5Bind: '/api/v1/auth/telegram/h5/bind',
    bindInvitationCode: '/api/v1/auth/bind_invitation_code'
  },
  chat: {
    sessionList: '/api/v1/msg/session/list',
    history: '/api/v1/msg/history',
    deleteSession: '/api/v1/msg/session',
    editSessionName: '/api/v1/msg/session/name',
    shareHistory: '/api/v1/msg/share/history',
    shareSave: '/api/v1/msg/share/save',
    saveHash:'/api/v1/msg/save_hash'
  },
  swap: {
    supportedChain: '/okx/api/v1/dex/supported/chain', // 获取支持的链
    allTokens: '/okx/api/v1/dex/chain/tokens', // 对应链token列表
    liquidity: '/okx/api/v1/dex/chain/liquidity', // 获取流动性
    approveTransaction: '/okx/api/v1/dex/approve/transaction', // 授权
    quote: '/okx/api/v1/dex/aggregator/quote', // 获取价格
    swap: '/okx/api/v1/dex/aggregator/swap', // swap
    walletAllTokenBalances: '/okx/api/v1/dex/asset/token_balance_by_address', // 获取所在链所有token余额
    realTimePrice: '/okx/api/v1/dex/token/real_time_price',
    tokenDetail: '/okx/api/v1/dex/token/token_detail',
    tokenList: '/okx/api/v1/dex/token/list',
    tokenSearch: '/okx/api/v1/dex/token/search',


    priceChart: '/api/v1/dex/price/chart',
    priceHistory: '/api/v1/dex/price/history',
    tokenFavourite: '/api/v1/dex/token/favourite',
    favouriteList: '/api/v1/dex/token/favourite/list',
    carouselList: '/api/v1/dex/token/carousel/list',
    orderCreate: '/api/v1/dex/order/create',
    orderTrigger: '/api/v1/dex/order/trigger',
    orderInfo: '/api/v1/dex/order/info',
    orderList: '/api/v1/dex/order/list',
    dexOrderCheck: '/api/v1/dex/order/check',
  },
};
