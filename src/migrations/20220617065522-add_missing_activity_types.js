// LEGENDE
// _i = insufficient balance
// _s = Success
// _f = fail
//
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('activity', 'type', {
        type: DataTypes.ENUM(
          'depositAccepted',
          'depositComplete',
          'withdrawRequested',
          'withdrawAccepted',
          'withdrawComplete',
          'withdrawRejected',
          'login_s',
          'login_f',
          'logout_s',
          'ignoreme_s',
          'ignoreme_f',
          'help_s',
          'help_f',
          'account_s',
          'account_f',
          'myrank_s',
          'myrank_f',
          'ranks_s',
          'ranks_f',
          'deposit_s',
          'deposit_f',
          'balance_s',
          'balance_f',
          'price_s',
          'price_f',
          'withdraw_s',
          'withdraw_f',
          'withdraw_i',
          'topggvote_s',
          'topggvote_f',
          'userJoined_s',
          'userJoined_f',
          'activeTalker_s',
          'activeTalker_f',
          'rollDice_s',
          'rollDice_f',
          'rollDice_t',
          'leaderboard_s',
          'leaderboard_f',
          'mostActive_s',
          'mostActive_f',
          'pickClass_s',
          'pickClass_f',
          'addStrength_s',
          'addStrength_f',
          'addDexterity_s',
          'addDexterity_f',
          'addVitality_s',
          'addVitality_f',
          'addEnergy_s',
          'addEnergy_f',
          'destroyItem_s',
          'destroyItem_f',
          'equipItem_s',
          'equipItem_f',
        ),
      });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('activity', 'type', {
        type: DataTypes.ENUM(
          'depositAccepted',
          'depositComplete',
          'withdrawRequested',
          'withdrawAccepted',
          'withdrawComplete',
          'withdrawRejected',
          'login_s',
          'login_f',
          'logout_s',
          'ignoreme_s',
          'ignoreme_f',
          'help_s',
          'help_f',
          'account_s',
          'account_f',
          'myrank_s',
          'myrank_f',
          'ranks_s',
          'ranks_f',
          'deposit_s',
          'deposit_f',
          'balance_s',
          'balance_f',
          'price_s',
          'price_f',
          'withdraw_s',
          'withdraw_f',
          'withdraw_i',
          'topggvote_s',
          'topggvote_f',
          'userJoined_s',
          'userJoined_f',
          'activeTalker_s',
          'activeTalker_f',
          'rollDice_s',
          'rollDice_f',
          'rollDice_t',
          'leaderboard_s',
          'leaderboard_f',
          'mostActive_s',
          'mostActive_f',
          'pickClass_s',
          'pickClass_f',
          'addStrength_s',
          'addStrength_f',
          'addDexterity_s',
          'addDexterity_f',
          'addVitality_s',
          'addVitality_f',
          'addEnergy_s',
          'addEnergy_f',
        ),
      });
  },
};