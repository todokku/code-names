const Chance = require('chance');
const {WORDS} = require('../words');
const {setGame, getGameForNormalPlayer} = require('../db');
const {RED, BLACK, BLUE, NEUTRAL} = require('../../../client/src/constants/colors');
const {DECIDING_ROLES} = require('../../../client/src/constants/screens');

const chance = new Chance();

const createGame = (gameId) => {
    const unshuffledCaptainCards = chance.pickset(WORDS, 25).map((word, i) => {
        if (i < 9) { // 9 red
            return {
                word,
                color: RED
            }
        } else if (i < 16) { // 8 blue
            return {
                word,
                color: BLUE
            }
        } else if (i < 17) { // 1 black
            return {
                word,
                color: BLACK
            }
        }

        return {
            word,
            color: NEUTRAL
        };
    });
    const captainCards = chance.shuffle(unshuffledCaptainCards);
    const cards = captainCards.map(({word}, i) => ({
        id: i,
        word
    }));

    console.log({cards});
    
    setGame(gameId, {
        captainCards,
        cards: cards,
        currentTeam: RED,
        roles: {
            blueTeamCaptainClaimed: false,
            redTeamCaptainClaimed: false,
            blueTeamCount: 0,
            redTeamCount: 0,
            chosenTeam: null
        },
        gameId,
        screen: DECIDING_ROLES
    });

    return getGameForNormalPlayer(gameId);
};

module.exports = {createGame};