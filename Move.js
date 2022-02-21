import {
    getMoves,
    ClearPreviousMoves,
    getAttackedSqures,
} from "./PossibleMoves.js";
import { kingCheak } from "./legalMove.js";
import {pieces} from "./StartingPos.js"

export let Castling = {
    blackKingSide: true,
    blackQueenSide: true,
    wightQueenSide: true,
    wightKingSide: true,
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
        if (!kingCheak(type[0], currPosition)) {
            let won = "";
            if (type[0] == "W") {
                won = "Black";
            } else {
                won = "Wight";
            }
            alert(`${won} WON`);
        } else {
            alert("draw");
        }
    }
};

let playersTurn = "W";
let markedPossiblesquare = [];
let currSquare = 0;
let type = "";

export let resetBoard = () => {
    ClearPreviousMoves();

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

const makeMove = {
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

    castleWight(nextid) {
        if (nextid == "72") {
            this.simple("70", "73");
        } else {
            this.simple("77", "75");
        }
    },
};

const square = document.querySelectorAll(".Square");

function mark() {
    ClearPreviousMoves();
    // console.log("OPPPPPPPPPPPPPPPS",this.id);
    if (markedPossiblesquare.includes(this.id)) {
        let currPiece = currPosition[currSquare[0]][currSquare[1]];

        makeMove.simple(currSquare, this.id);

        if (playersTurn == "W") {
            playersTurn = "B";
            gameOver("BK");
            if (currPiece == "WK") {
                Castling.wightKingSide = false;
                Castling.wightQueenSide = false;
                if (this.id == "72" || this.id == "76") {
                    makeMove.castleWight(this.id);
                }
            } else if (currPiece == "WR") {
                if (currSquare == "77") {
                    Castling.wightKingSide = false;
                } else if (currSquare == "70") {
                    Castling.wightQueenSide = false;
                }
            }
            else if(currPiece=="WP" &&this.id[0]==0){
                pawnPromotion("WP",this.id);
            }
            
        } else {
            playersTurn = "W";

            gameOver("WK");
            if (currPiece == "BK") {
                Castling.blackKingSide = false;
                Castling.blackQueenSide = false;

                if (this.id == "02" || this.id == "06") {
                    makeMove.castleBlack(this.id);
                }
            } else if (currPiece == "BR") {
                if (currSquare == "00") {
                    Castling.blackQueenSide = false;
                } else if (currSquare == "07") {
                    Castling.blackKingSide = false;
                }
            }
            else if(currPiece=="BP" &&this.id[0]==7){
                console.log("PP",this.id);
                pawnPromotion("BP",this.id);
            }
        }
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

const promotion=(type,promotionSquare)=>{
    console.log(this);
    document.getElementById(`${promotionSquare}`).innerHTML=pieces[`${type}`];
    currPosition[promotionSquare[0]][promotionSquare[1]]=type;
}



const pawnPromotion = (type, id) => {

    let promotionoptions;
    console.log(id);
    if(type=="BP"){
        promotionoptions=document.querySelector("#BlackPromotionOpton");
        promotionoptions.style.display="flex";

        let promotionPieces=document.querySelectorAll(".PromotionPiece");
        console.log(promotionPieces);
        function pro(){
            promotion(this.id,id);
            promotionoptions.style.display="none";
            promotionPieces.forEach(element=>{
                element.removeEventListener("click",pro);   
            })
        }
        promotionPieces.forEach((element)=>{ 
            element.addEventListener("click",pro);   
        });
        
    }
    else{
        promotionoptions=document.querySelector("#WightPromotionOpton");
        promotionoptions.style.display="flex";

        let promotionPieces=document.querySelectorAll(".PromotionPiece");
        // console.log(promotionPieces);
        function pro(){
            promotion(this.id,id);
            promotionoptions.style.display="none";
            promotionPieces.forEach(element=>{
                element.removeEventListener("click",pro);   
            })
        }
        promotionPieces.forEach((element)=>{ 
            console.log(element);
            element.addEventListener("click",pro);   
        });
    }
};
