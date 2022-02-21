// import { currPosition } from "./Move.js";

import { getAttackedSqures } from "./PossibleMoves.js";

const getKingPos = (type, currPosition) => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (currPosition[i][j] == type + "K") {
                return `${i}${j}`;
            }
        }
    }
};

export const kingCheak = (type, currPosition) => {
    let attackedSquares = [];
    // console.log(type);
    // console.log("1",currPosition);
    if (type == "B") {
        attackedSquares = getAttackedSqures("W", currPosition);
    } else {
        attackedSquares = getAttackedSqures("B", currPosition);
    }
    let kingPosition=getKingPos(type,currPosition);
    // console.log(kingPosition);
    // console.log(attackedSquares);
    if (attackedSquares.includes(kingPosition)) return false;
    else return true;
};

const makeSudoMove = (currId, possibleMove, sudoPosition) => {
    sudoPosition[possibleMove[0]][possibleMove[1]] =
        sudoPosition[currId[0]][currId[1]];
    sudoPosition[currId[0]][currId[1]] = "";
};

const getSudoPosition = (currPosition, possibleMove, id) => {
    let sudoPosition = [];
    for (let i = 0; i < 8; i++) {
        sudoPosition[i] = currPosition[i].slice();
    }
    makeSudoMove(id, possibleMove, sudoPosition);
    return sudoPosition;
};

export const getLegalMove = (id, type, currPosition, possibleMove) => {
    // console.log(type);
    // console.log("possible",possibleMove);
    let temp = currPosition;
    let sudoPosition = getSudoPosition(currPosition, possibleMove, id);
    

    if (kingCheak(type, sudoPosition)) {
        currPosition = temp;
        return true;
    } else {
        currPosition = temp;
        return false;
    }
};
