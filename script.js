//tic tac toe

//players 
const Players = (num) => {
    const getSymbol = () => {
        if (num === 1){
            return "X";
        }
        else{
            return "O";
        }
    }
    return {getSymbol};
};

//gameboard - do not touch DOM
const gameboard = (() => {
    let board =  Array(9).fill("1");

    const move = (space, symbol) => {
        let tmp  = board;
        tmp[space] = symbol;
        board = tmp;
    };

    const getBoard = () => {
        return board;
    }
    return {move, getBoard};
})();



//displayController - ties DOM to board
const displayController = (() => {
    //render function
    const render = () => {
        let boardArr = gameboard.getBoard();
        for (let i = 0; i < boardArr.length; i++) {
            document.getElementById(i).innerHTML = boardArr[i];
        }
    };

    const turn = (square, player) => {
        //symbol is based on player

        //make a move
        gameboard.move(square, player.getSymbol);
        //rerender the board
        render();
    }
    
    return {turn};
})();


//game - checks win state, current player. Does not touch DOM
const game = (() => {
    
    
})();
