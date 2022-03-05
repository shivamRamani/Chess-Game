import { Castling} from "./Move.js";
import { getLegalMove } from "./legalMove.js";

let currPosition =[];
const positionSetter=(position)=>{
    for(let i=0;i<8;i++){
        currPosition[i]=position[i].slice();
    }
}

const isEmpty=(squares)=>{
    let flg=true;
    squares.forEach(square=>{
        if(currPosition[square[0]][square[1]]!="") flg=false;
    })
    return flg;
}
const notAttacked=(squares,type)=>{
    let flg=true;
    let attackedSqures=getAttackedSqures(type);
    squares.forEach(square=>{
        if(attackedSqures.includes(square)) flg = false;
    })
    return flg;
}


const hasOponentsPiece = (x, y, type) => {
    if (currPosition[x][y] != "" && currPosition[x][y][0] != type[0]) {
        return true;
    }
    return false;
};

export const getMoves=(id,type,position)=>{
    ClearPreviousMoves();
    // console.log(position)
    positionSetter(position);
    let PossibleMoves=getPossibleMoves(id);
    PossibleMoves=PossibleMoves.filter((move)=>{
        return getLegalMove(id,type[0],position,move);
    });
     
    
    return PossibleMoves;
}


export const getPossibleMoves = (id) => {
    let moves = [];
    if (currPosition[id[0]][id[1]] != "") {
        let type = currPosition[id[0]][id[1]];
        if (type[1] == "N") {
            moves = KnightMoves(parseInt(id[0]), parseInt(id[1]), type);
        } else if (type[1] == "R") {
            moves = RookMoves(parseInt(id[0]), parseInt(id[1]), type);
        } else if (type[1] == "B") {
            moves = BishopMoves(parseInt(id[0]), parseInt(id[1]), type);
        } else if (type[1] == "Q") {
            moves = RookMoves(parseInt(id[0]), parseInt(id[1]), type);
            moves = moves.concat(
                BishopMoves(parseInt(id[0]), parseInt(id[1]), type)
            );
        } else if (type == "BP") {
            moves = BlackPawn(parseInt(id[0]), parseInt(id[1]));
        } else if (type == "WP") {
            moves = WhitePawn(parseInt(id[0]), parseInt(id[1]));
        } else if (type[1] == "K") {
            moves = KingMove(parseInt(id[0]), parseInt(id[1]), type);
        }
    }
    return moves;
};

export const ClearPreviousMoves = () => {

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            document.getElementById(`${i}${j}`).style.opacity = "1";
        }
    }
};

const legal = (x, y, type) => {
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    if (
        currPosition[x][y][0] != "undefined" &&
        currPosition[x][y][0] == type[0]
    )
        return false;
    return true;
};

const KnightMoves = (x, y, type) => {
    const moves = [];

    const X = [2, 1, -1, -2, -2, -1, 1, 2];
    const Y = [1, 2, 2, 1, -1, -2, -2, -1];

    for (var i = 0; i < 8; i++) {
        if (legal(x + X[i], y + Y[i], type)) {
            moves.push(`${x + X[i]}${y + Y[i]}`);
        }
    }

    return moves;
};

const RookMoves = (x, y, type) => {
    let moves = [];

    for (var i = x + 1; i < 8; i++) {
        if (legal(i, y, type)) {

            if (hasOponentsPiece(i, y, type)) {
                moves.push(`${i}${y}`);
                break;
            } else {
                moves.push(`${i}${y}`);
            }
        } else {
            break;
        }
    }
    for (var i = x - 1; i >= 0; i--) {
        if (legal(i, y, type)) {
            if (hasOponentsPiece(i, y, type)) {
                moves.push(`${i}${y}`);

                break;
            } else {
                moves.push(`${i}${y}`);
            }
        } else {
            break;
        }
    }

    for (var i = y + 1; i < 8; i++) {
        if (legal(x, i, type)) {
            if (hasOponentsPiece(x, i, type)) {
                moves.push(`${x}${i}`);
                break;
            } else {
                moves.push(`${x}${i}`);
            }
        } else {
            break;
        }
    }
    for (var i = y - 1; i >= 0; i--) {
        if (legal(x, i, type)) {
            if (hasOponentsPiece(x, i, type)) {
                moves.push(`${x}${i}`);
                break;
            } else {
                moves.push(`${x}${i}`);
            }
        } else {
            break;
        }
    }
    return moves;
};

const BishopMoves = (x, y, type) => {
    let moves = [];

    const X = [1, 1, -1, -1];
    const Y = [1, -1, 1, -1];
    const currentCell = [x, y];
    for (let k = 0; k < 4; k++) {
        [x, y] = currentCell;
        while (legal(x + X[k], y + Y[k], type)) {
            if (hasOponentsPiece(x + X[k], y + Y[k], type)) {
                moves.push(`${x + X[k]}${y + Y[k]}`);
                break;
            }
            moves.push(`${x + X[k]}${y + Y[k]}`);
            x = x + X[k];
            y = y + Y[k];
        }
    }

    return moves;
};

const BlackPawn = (x, y) => {
    let moves = [];

    if (legal(x + 1, y + 1, "BN") && hasOponentsPiece(x + 1, y + 1, "BP")) {
        moves.push(`${x + 1}${y + 1}`);
    }
    if (legal(x + 1, y - 1, "BN") && hasOponentsPiece(x + 1, y - 1, "BP")) {
        moves.push(`${x + 1}${y - 1}`);
    }

    if (legal(x + 1, y, "BP") && currPosition[x + 1][y] == "") {
        moves.push(`${x + 1}${y}`);
        if (x == 1) {
            if (legal(x + 2, y, "BP") && currPosition[x + 2][y] == "") {
                moves.push(`${x + 2}${y}`);
            }
        }
    }
    return moves;
};

const WhitePawn = (x, y) => {
    let moves = [];

    if (legal(x - 1, y - 1, "WN") && hasOponentsPiece(x - 1, y - 1, "WP")) {
        moves.push(`${x - 1}${y - 1}`);
    }
    if (legal(x - 1, y + 1, "WN") && hasOponentsPiece(x - 1, y + 1, "WP")) {
        moves.push(`${x - 1}${y + 1}`);
    }

    if (legal(x - 1, y, "WP") && currPosition[x - 1][y] == "") {
        moves.push(`${x - 1}${y}`);
        if (x == 6) {
            if (legal(x - 2, y, "WP") && currPosition[x - 2][y] == "") {
                moves.push(`${x - 2}${y}`);
            }
        }
    }
    return moves;
};

const KingAttack=(x,y,type)=>{
    const X = [-1, 0, 1, 1, 1, 0, -1, -1];
    const Y = [1, 1, 1, 0, -1, -1, -1, 0];
    let moves = [];

    for (let k = 0; k < 8; k++) {
        if (legal(x + X[k], y + Y[k],type)) {
            moves.push(`${x + X[k]}${y + Y[k]}`);
        }
    }
    return moves;
}


const KingMove = (x, y, type) => {
    
    let moves=[];
    moves=KingAttack(x,y,type);
    if (type[0] == "B") {
        if (Castling.blackQueenSide&&isEmpty(["01","02","03"])&&notAttacked(["01","02","03"],"W")) {
            moves.push(`02`);
        }
        if (Castling.blackKingSide&&isEmpty(["05","06"])&&notAttacked(["05","06"],"W")) {
            moves.push(`06`);
        }
    } else {
        if (Castling.WhiteQueenSide&&isEmpty(["71","72","73"])&&notAttacked(["71","72","73"],"B")) {
            moves.push(`72`);
        }
        if (Castling.WhiteKingSide&&isEmpty(["75","76"])&&notAttacked(["75","76"],"B")) {
            moves.push(`76`);
        }
    }
    return moves;
};


export const getAttackedSqures=(type,position)=>{
    if(position!=undefined)
    positionSetter(position);
    let attacked=[];
    // console.log("2"currPosition);
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
    
            let PossibleAttacked=[];

            if(currPosition[i][j][0]==type){
                if(currPosition[i][j]=="BP"){
                    if(legal(i+1,j-1,"BP")){
                        PossibleAttacked.push(`${i+1}${j-1}`)
                    }
                    if(legal(i+1,j+1,"BP")){
                        PossibleAttacked.push(`${i+1}${j+1}`)
                    }

                }
                else if(currPosition[i][j]=="WP"){
                   
                    if(legal(i-1,j-1,"WP")){
                        PossibleAttacked.push(`${i-1}${j-1}`)
                    }
                    if(legal(i-1,j+1,"WP")){
                        PossibleAttacked.push(`${i-1}${j+1}`)
                    }

                }
                else if(currPosition[i][j][1]=="K"){
                    PossibleAttacked=KingAttack(i,j,currPosition[i][j]);
                }
                else {
                    PossibleAttacked=getPossibleMoves(`${i}${j}`)
                }
                attacked.push(...PossibleAttacked);
            }
        }
    }

    attacked=[...new Set(attacked)];
    
    return attacked;
}




