import {
    getMoves,
    ClearPreviousMoves,
    getAttackedSqures,
} from "./PossibleMoves.js";
import { kingCheak } from "./legalMove.js";
import { pieces } from "./StartingPos.js";
import {socket } from "./main.js";

export let Castling = {
    blackKingSide: true,
    blackQueenSide: true,
    WhiteQueenSide: true,
    WhiteKingSide: true,
};

const StartPosition = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
];
export let currPosition = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
];

const gameOver = (type) => {
    let allPossiblemoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // console.log(type, currPosition[i][j]);
            if (currPosition[i][j][0] == type[0]) {
                // console.log(getMoves(`${i}${j}`, type, currPosition));
                allPossiblemoves.push(
                    ...getMoves(`${i}${j}`, type, currPosition)
                );
            }
        }
    }

    if (allPossiblemoves.length == 0) {
        let winner;
        if (!kingCheak(type[0], currPosition)) {
            if (type[0] == "W") {
                winner = document.querySelector("#BlackWinner");
            } else {
                winner = document.querySelector("#WhiteWinner");
            }
        } else {
            winner = document.querySelector("#Draw");
        }
        // winner.style.display = "flex";
        winner.style.opacity = 1;
        winner.style.transform = "scale(1)";
    }
};

let playersTurn = "W";
let markedPossiblesquare = [];
let currSquare = 0;
let type = "";
// export let socket=io();

export let resetBoard = () => {
    ClearPreviousMoves();
    clearWinner();
    Object.keys(Castling).forEach((key) => {
        Castling[key] = true;
    });

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            currPosition[i][j] = StartPosition[i][j];
        }
    }

    playersTurn = "W";
    markedPossiblesquare = [];
    currSquare = 0;
    type = "";
};

const markPossibleMoves = (moves) => {
    moves.forEach((element) => {
        document.getElementById(element).style.opacity = "0.7";
    });
};

const movePiece = {
    
    simple(currid, nextid) {
        document.getElementById(nextid).innerHTML =
            document.getElementById(currid).innerHTML;
        document.getElementById(currid).innerHTML = "";
        currPosition[nextid[0]][nextid[1]] = currPosition[currid[0]][currid[1]];
        currPosition[currid[0]][currid[1]] = "";
    },

    castleBlack(nextid) {
        if (nextid == "02") {
            this.simple("00", "03");
        } else {
            this.simple("07", "05");
        }
    },

    castleWhite(nextid) {
        if (nextid == "72") {
            this.simple("70", "73");
        } else {
            this.simple("77", "75");
        }
    },
};

const square = document.querySelectorAll(".Square");

export const makeMove = (currPiece,target)=>{

    let move={

    }
    // console.log(currPiece);

    movePiece.simple(currSquare, target);
    if (playersTurn == "W") {
        playersTurn = "B";
        gameOver("BK");
        if (currPiece == "WK") {
            Castling.WhiteKingSide = false;
            Castling.WhiteQueenSide = false;
            if (target == "72" || target == "76") {
                movePiece.castleWhite(target);
            }
        } else if (currPiece == "WR") {
            if (currSquare == "77") {
                Castling.WhiteKingSide = false;
            } else if (currSquare == "70") {
                Castling.WhiteQueenSide = false;
            }
        } else if (currPiece == "WP" && target[0] == 0) {
            pawnPromotion("WP", target);
        }
    } else {
        playersTurn = "W";

        gameOver("WK");
        if (currPiece == "BK") {
            Castling.blackKingSide = false;
            Castling.blackQueenSide = false;

            if (target == "02" || target == "06") {
                movePiece.castleBlack(target);
            }
        } else if (currPiece == "BR") {
            if (currSquare == "00") {
                Castling.blackQueenSide = false;
            } else if (currSquare == "07") {
                Castling.blackKingSide = false;
            }
        } else if (currPiece == "BP" && target[0] == 7) {
            console.log("PP", target);
            pawnPromotion("BP", target);
        }
    }

    move.currPiece=currPiece;
    move.currSquare=currSquare;
    move.target=target;
    return move;
    
}


function mark() {
    ClearPreviousMoves();

    if (markedPossiblesquare.includes(this.id)) {
        let currPiece = currPosition[currSquare[0]][currSquare[1]];
        let target=this.id;
        let move=makeMove(currPiece,target);
        socket.emit("move",move);
        

        markedPossiblesquare = [];
        currSquare = 0;
    } else {
        type = currPosition[this.id[0]][this.id[1]];
        if (type[0] == playersTurn) {
            markedPossiblesquare = getMoves(this.id, type, currPosition);
            markPossibleMoves(markedPossiblesquare);
            currSquare = this.id;
        }
    }
}

square.forEach((element) => {
    element.addEventListener("click", mark);
});

const promotion = (type, promotionSquare) => {
    console.log(this);
    document.getElementById(`${promotionSquare}`).innerHTML = pieces[`${type}`];
    currPosition[promotionSquare[0]][promotionSquare[1]] = type;
};

const pawnPromotion = (type, id) => {
    let promotionoptions;
    console.log(id);
    if (type == "BP") {
        promotionoptions = document.querySelector("#BlackPromotionOpton");
        promotionoptions.style.display = "flex";

        let promotionPieces = document.querySelectorAll(".PromotionPiece");
        console.log(promotionPieces);
        function pro() {
            promotion(this.id, id);
            promotionoptions.style.display = "none";
            promotionPieces.forEach((element) => {
                element.removeEventListener("click", pro);
            });
        }
        promotionPieces.forEach((element) => {
            element.addEventListener("click", pro);
        });
    } else {
        promotionoptions = document.querySelector("#WhitePromotionOpton");
        promotionoptions.style.display = "flex";

        let promotionPieces = document.querySelectorAll(".PromotionPiece");
        // console.log(promotionPieces);
        function pro() {
            promotion(this.id, id);
            promotionoptions.style.display = "none";
            promotionPieces.forEach((element) => {
                element.removeEventListener("click", pro);
            });
        }
        promotionPieces.forEach((element) => {
            console.log(element);
            element.addEventListener("click", pro);
        });
    }
};

const clearWinner = () => {
    const result = document.querySelectorAll(".Result");

    result.forEach((element) => {
        element.style.opacity = 0;
        element.style.transform = "scale(0)";
    });
};

// socket.on('move', function(move) {
//     currSquare=move.currSquare;
//     makeMove(move.currPiece,move.target);
// });

export const handleMove=(move)=>{
    currSquare=move.currSquare;
    makeMove(move.currPiece,move.target);
};