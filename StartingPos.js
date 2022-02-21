import {resetBoard} from "./Move.js";

export const pieces={

    BK: '<img id="BK" class="icons" src="icons/BlackKing.png">',
    BQ: '<img id="BQ" class="icons" src="icons/BlackQueen.png">',
    BR: '<img id="BR" class="icons" src="icons/BlackRook.png">',
    BB: '<img id="BB" class="icons" src="icons/BlackBishop.png">',
    BN: '<img id="BN" class="icons" src="icons/BlackKnight.png">',
    BP: '<img id="BP" class="icons" src="icons/BlackPawn.png">',
    WK: '<img id="WK" class="icons" src="icons/WightKing.png">',
    WQ: '<img id="WQ" class="icons" src="icons/WightQueen.png">',
    WR: '<img id="WR" class="icons" src="icons/WightRook.png">',
    WB: '<img id="WB" class="icons" src="icons/WightBishop.png">',
    WN: '<img id="WN" class="icons" src="icons/WightKnight.png">',
    WP: '<img id="WP" class="icons" src="icons/WightPawn.png">',

}

const piecePosRow=['R','N','B','Q','K','B','N','R'];

const ClearBoard = () => {
    const chlids = document.querySelectorAll(".Square");
    chlids.forEach((element) => {
        element.innerHTML = "";
    });

};
export const StartingPosition = () => {
    ClearBoard();
    resetBoard();
    // console.log(StartPosition,currPosition);
    for (var i = 0; i < 8; i++) {
        const box = document.getElementById(`1${i}`);
        box.innerHTML = pieces.BP;
        // box.innerHTML = '<img id="BP" class="icons" src="icons/BlackPawn.png">';
    }
    for (var i = 0; i < 8; i++) {
        const box = document.getElementById(`6${i}`);
        box.innerHTML = '<img id="WP" class="icons" src="icons/WightPawn.png">';
    }

    for (var i = 0; i < 8; i++) {
        const id=`B${piecePosRow[i]}`;
        if(pieces[i]=='Kinght') id='BN';
        const box = document.getElementById(`0${i}`);
        box.innerHTML = pieces[`${id}`];
    }
    for (var i = 7; i >= 0; i--) {
        const id=`W${piecePosRow[i]}`;
        if(pieces[i]=='Kinght') id='WN';
        const box = document.getElementById(`7${i}`);
        box.innerHTML = pieces[`${id}`];
    }
};


// export let {playersTure,markedPossiblesquare,currPiece,type};