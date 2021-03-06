import passport from 'passport';
import {
  signin,
  signup,
  verifyEmail,
  resendVerification,
  destroySession,
  isDashboardUserBanned,
} from './controllers/auth';

import { isAdmin } from './controllers/admin';
import { fetchUserInfo } from './controllers/userInfo';
import { fetchLiability } from './controllers/liability';
import { fetchBalance } from './controllers/balance';
import { healthCheck } from './controllers/health';
import {
  fetchBotSettings,
  updateBotSettings,
} from './controllers/bots';

import { insertIp } from './controllers/ip';

import {
  fetchServers,
  banServer,
  updateServer,
  activateDeactivateRealm,
} from './controllers/servers';
import {
  fetchSkillTrees,
  updateSkillTree,
} from './controllers/skillTree';

import {
  fetchErrors,
} from './controllers/errors';

import { fetchNodeStatus } from './controllers/status';

import {
  fetchWithdrawals,
  acceptWithdrawal,
  declineWithdrawal,
} from './controllers/withdrawals';

import {
  fetchWithdrawalAddress,
  fetchWithdrawalAddresses,
} from './controllers/withdrawalAddresses';
import { fetchActivity } from './controllers/activity';
import {
  fetchFeatures,
  addFeature,
  removeFeature,
  updateFeature,
} from './controllers/features';

import {
  resetPassword,
  verifyResetPassword,
  resetPasswordNew,
} from './controllers/resetPassword';

import { verifyMyCaptcha } from './controllers/recaptcha';

import {
  fetchDashboardUsers,
} from './controllers/dashboardUsers';

import {
  fetchDeposits,
  patchDeposits,
} from './controllers/deposits';

import {
  fetchChannels,
  banChannel,
} from './controllers/channels';

import {
  fetchBlockNumber,
} from './controllers/blockNumber';

import {
  startSyncBlocks,
} from './controllers/sync';

import {
  fetchUsers,
  banUser,
} from './controllers/users';
import passportService from './services/passport';
import {
  disabletfa,
  enabletfa,
  ensuretfa,
  unlocktfa,
  istfa,
} from './controllers/tfa';

import {
  fetchUser,
} from './controllers/user';

import {
  fetchItemTypes,
} from './controllers/itemType';

import {
  fetchItemQuality,
} from './controllers/itemQuality';

import {
  fetchItemDifficulty,
} from './controllers/itemDifficulty';

import {
  fetchItemFamilies,
  addItemFamily,
  removeItemFamily,
  updateItemFamily,
} from './controllers/itemFamily';

import {
  fetchItemModifiers,
  addItemModifier,
  removeItemModifier,
  updateItemModifier,
} from './controllers/itemModifier';

import {
  fetchItemModifierLinks,
  addItemModifierLink,
  removeItemModifierLink,
  updateItemModifierLink,
} from './controllers/linkItemModifier';

import {
  fetchItemBases,
  addItemBase,
  removeItemBase,
  updateItemBase,
} from './controllers/itemBase';

import {
  fetchRanks,
  addRank,
  removeRank,
  updateRank,
} from './controllers/rank';

import {
  fetchClassDescriptions,
  addClassDescription,
  removeClassDescription,
  updateClassDescription,
} from './controllers/classDescription';

import {
  fetchClasses,
  addClass,
  removeClass,
  updateClass,
} from './controllers/class';

import {
  fetchPriceCurrencies,
  addPriceCurrency,
  removePriceCurrency,
  updatePriceCurrency,
  updatePriceCurrencyPrices,
} from './controllers/priceCurrencies';

// import storeIp from './helpers/storeIp';

const requireSignin = passport.authenticate('local', {
  session: true,
  failWithError: true,
  keepSessionInfo: true,
});

const IsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('isauthenticated passed');
    next();
  } else {
    console.log('isAuthenticated not passed');
    res.status(401).send({
      error: 'Unauthorized',
    });
  }
};

const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const respondCountAndResult = (req, res) => {
  if (
    res.locals.count
    && res.locals.result
    && res.locals.result.length > 0
  ) {
    res.json({
      count: res.locals.count,
      result: res.locals.result,
    });
  } else if (
    res.locals.result.length < 1
  ) {
    res.status(404).send({
      error: `No ${res.locals.name} records found`,
    });
  } else {
    res.status(401).send({
      error: "ERROR",
    });
  }
};

const respondResult = (req, res) => {
  if (
    res.locals.result
    && res.locals.result.length > 0
  ) {
    res.json({
      result: res.locals.result,
    });
  } else if (
    typeof res.locals.result === 'object'
    && Object.keys(res.locals.result).length > 0
    && res.locals.result !== null
  ) {
    res.json({
      result: res.locals.result,
    });
  } else if (
    res.locals.result.length < 1
  ) {
    res.status(404).send({
      error: `No ${res.locals.name} records found`,
    });
  } else {
    res.status(401).send({
      error: "ERROR",
    });
  }
};

export const dashboardRouter = (
  app,
  io,
  discordClient,
  telegramClient,
  matrixClient,
) => {
  const attachResLocalsClients = (req, res, next) => {
    res.locals.discordClient = discordClient;
    res.locals.telegramClient = telegramClient;
    res.locals.matrixClient = matrixClient;
    next();
  };

  app.get(
    '/api/health',
    use(healthCheck),
    respondResult,
  );

  app.get(
    '/api/authenticated',
    (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.json({
          result: {
            tfaLocked: false,
            success: false,
          },
        });
      }
    },
    istfa,
  );

  app.post(
    '/api/signup',
    verifyMyCaptcha,
    insertIp,
    signup,
  );

  app.post(
    '/api/functions/withdrawal/accept',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    ensuretfa,
    insertIp,
    attachResLocalsClients,
    acceptWithdrawal,
    respondResult,
  );

  app.post(
    '/api/functions/withdrawal/decline',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    ensuretfa,
    insertIp,
    attachResLocalsClients,
    declineWithdrawal,
    respondResult,
  );

  app.post(
    '/api/management/user/ban',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(banUser),
    respondResult,
  );

  app.post(
    '/api/management/channel/ban',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(banChannel),
    respondResult,
  );

  app.post(
    '/api/management/server/ban',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(banServer),
    respondResult,
  );

  app.post(
    '/api/management/server/update',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(updateServer),
    respondResult,
  );

  app.post(
    '/api/management/server/realm/active-deactivate',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(activateDeactivateRealm),
    respondResult,
  );

  app.post(
    '/api/management/feature/remove',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(removeFeature),
    respondResult,
  );

  app.post(
    '/api/management/feature/update',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(updateFeature),
    respondResult,
  );

  app.post(
    '/api/management/feature/add',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(addFeature),
    respondResult,
  );

  app.post(
    '/api/management/features',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchFeatures),
    respondCountAndResult,
  );

  app.post(
    '/api/management/bot/settings/update',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(updateBotSettings),
    respondResult,
  );

  app.post(
    '/api/management/bot/settings',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchBotSettings),
    respondCountAndResult,
  );

  // Ranks

  app.post(
    '/api/management/ranks',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchRanks),
    respondCountAndResult,
  );
  app.post(
    '/api/management/rank/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addRank),
    respondResult,
  );

  app.post(
    '/api/management/rank/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeRank),
    respondResult,
  );

  app.post(
    '/api/management/rank/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateRank),
    respondResult,
  );

  // Class Descriptions

  app.post(
    '/api/management/class/descriptions',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchClassDescriptions),
    respondCountAndResult,
  );
  app.post(
    '/api/management/class/description/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addClassDescription),
    respondResult,
  );

  app.post(
    '/api/management/class/description/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeClassDescription),
    respondResult,
  );

  app.post(
    '/api/management/class/description/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateClassDescription),
    respondResult,
  );

  // CLASS

  app.post(
    '/api/management/classes',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchClasses),
    respondCountAndResult,
  );
  app.post(
    '/api/management/class/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addClass),
    respondResult,
  );

  app.post(
    '/api/management/class/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeClass),
    respondResult,
  );

  app.post(
    '/api/management/class/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateClass),
    respondResult,
  );

  // Skill Tree

  app.post(
    '/api/management/skilltrees',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchSkillTrees),
    respondCountAndResult,
  );

  app.post(
    '/api/management/skilltree/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateSkillTree),
    respondResult,
  );

  // Item Quality

  app.post(
    '/api/management/item/quality',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemQuality),
    respondCountAndResult,
  );

  // Item Quality

  app.post(
    '/api/management/item/difficulty',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemDifficulty),
    respondCountAndResult,
  );

  // Item Types

  app.post(
    '/api/management/item/types',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemTypes),
    respondCountAndResult,
  );

  // Item Family

  app.post(
    '/api/management/item/families',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemFamilies),
    respondCountAndResult,
  );

  app.post(
    '/api/management/item/family/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addItemFamily),
    respondResult,
  );

  app.post(
    '/api/management/item/family/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeItemFamily),
    respondResult,
  );

  app.post(
    '/api/management/item/family/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateItemFamily),
    respondResult,
  );

  // Item Modifier

  app.post(
    '/api/management/item/modifiers',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemModifiers),
    respondCountAndResult,
  );

  app.post(
    '/api/management/item/modifier/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addItemModifier),
    respondResult,
  );

  app.post(
    '/api/management/item/modifier/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeItemModifier),
    respondResult,
  );

  app.post(
    '/api/management/item/modifier/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateItemModifier),
    respondResult,
  );

  // Item Modifier Links

  app.post(
    '/api/management/item/modifier/links',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemModifierLinks),
    respondCountAndResult,
  );

  app.post(
    '/api/management/item/modifier/link/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addItemModifierLink),
    respondResult,
  );

  app.post(
    '/api/management/item/modifier/link/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeItemModifierLink),
    respondResult,
  );

  app.post(
    '/api/management/item/modifier/link/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateItemModifierLink),
    respondResult,
  );

  // Item Bases

  app.post(
    '/api/management/item/bases',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchItemBases),
    respondCountAndResult,
  );

  app.post(
    '/api/management/item/base/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addItemBase),
    respondResult,
  );

  app.post(
    '/api/management/item/base/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removeItemBase),
    respondResult,
  );

  app.post(
    '/api/management/item/base/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updateItemBase),
    respondResult,
  );

  // Price Currencies

  app.post(
    '/api/management/pricecurrencies',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(fetchPriceCurrencies),
    respondCountAndResult,
  );

  app.post(
    '/api/management/pricecurrencies/remove',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(removePriceCurrency),
    respondResult,
  );

  app.post(
    '/api/management/pricecurrencies/update',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updatePriceCurrency),
    respondResult,
  );

  app.post(
    '/api/management/pricecurrencies/add',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(addPriceCurrency),
    respondResult,
  );

  app.post(
    '/api/management/pricecurrencies/updateprice',
    use(IsAuthenticated),
    use(isAdmin),
    use(isDashboardUserBanned),
    use(insertIp),
    use(ensuretfa),
    use(updatePriceCurrencyPrices),
    respondResult,
  );

  app.post(
    '/api/management/channels',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchChannels),
    respondCountAndResult,
  );

  app.get(
    '/api/sync/blocks',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(startSyncBlocks),
    respondResult,
  );

  app.get(
    '/api/blocknumber',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchBlockNumber),
    respondResult,
  );

  app.post(
    '/api/activity',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchActivity),
    respondCountAndResult,
  );

  app.post(
    '/api/deposits/patch',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(patchDeposits),
    respondResult,
  );

  app.post(
    '/api/user',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchUser),
    respondResult,
  );

  app.post(
    '/api/management/users',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchUsers),
    respondCountAndResult,
  );

  app.post(
    '/api/functions/withdrawals',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchWithdrawals),
    respondCountAndResult,
  );

  app.post(
    '/api/functions/deposits',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchDeposits),
    respondCountAndResult,
  );

  app.post(
    '/api/functions/errors',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchErrors),
    respondCountAndResult,
  );

  app.post(
    '/api/management/withdrawaladdresses',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchWithdrawalAddresses),
    respondCountAndResult,
  );

  app.post(
    '/api/management/withdrawaladdress',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchWithdrawalAddress),
    respondResult,
  );

  app.post(
    '/api/management/dashboardusers',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchDashboardUsers),
    respondCountAndResult,
  );

  app.post(
    '/api/management/servers',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchServers),
    respondCountAndResult,
  );

  app.post(
    '/api/management/userinfo',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchUserInfo),
    respondResult,
  );

  app.get(
    '/api/status',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    insertIp,
    ensuretfa,
    use(fetchNodeStatus),
    respondResult,
  );

  app.get(
    '/api/balance',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    ensuretfa,
    use(fetchBalance),
    respondResult,
  );

  // app.get(
  //   '/api/faucet/balance',
  //   IsAuthenticated,
  //   isAdmin,
  //   isDashboardUserBanned,
  //   ensuretfa,
  //   use(fetchFaucetBalance),
  //   respondResult,
  // );

  app.get(
    '/api/liability',
    IsAuthenticated,
    isAdmin,
    isDashboardUserBanned,
    ensuretfa,
    use(fetchLiability),
    respondResult,
  );

  app.post(
    '/api/signup/verify-email',
    insertIp,
    use(verifyEmail),
    (req, res) => {
      console.log(res.locals.error);
      if (res.locals.error === 'AUTH_TOKEN_EXPIRED') {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: true,
          },
        });
      }
      if (res.locals.error) {
        res.status(401).send({
          error: {
            message: res.locals.error,
            resend: false,
          },
        });
      }
      if (res.locals.user) {
        res.json({
          firstname: res.locals.user.firstname,
          username: res.locals.user.username,
        });
      }
    },
  );

  app.post(
    '/api/resend-verify-code',
    // IsAuthenticated,
    insertIp,
    // rateLimiterMiddlewarePhone,
    // ensuretfa,
    // updateLastSeen,
    use(resendVerification),
  );

  app.post(
    '/api/signin',
    verifyMyCaptcha,
    // insertIp,
    requireSignin,
    isDashboardUserBanned,
    use(signin),
    respondResult,
  );

  app.post(
    '/api/reset-password',
    verifyMyCaptcha,
    use(resetPassword),
    respondResult,
  );

  app.post(
    '/api/reset-password/verify',
    use(verifyResetPassword),
    respondResult,
  );

  app.post(
    '/api/reset-password/new',
    use(resetPasswordNew),
    respondResult,
  );

  app.post(
    '/api/2fa/enable',
    IsAuthenticated,
    isDashboardUserBanned,
    // storeIp,
    ensuretfa,
    // updateLastSeen,
    use(enabletfa),
    respondResult,
  );

  app.post(
    '/api/2fa/disable',
    IsAuthenticated,
    // storeIp,
    ensuretfa,
    // updateLastSeen,
    use(disabletfa),
    respondResult,
  );

  app.post(
    '/api/2fa/unlock',
    IsAuthenticated,
    isDashboardUserBanned,
    // storeIp,
    use(unlocktfa),
    respondResult,
  );

  app.get(
    '/api/logout',
    insertIp,
    // storeIp,
    use(destroySession),
  );
};
