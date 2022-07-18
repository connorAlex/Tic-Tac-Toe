//tic tac toe

//players 
const Players = () => {

};

//gameboard - do not touch DOM
const gameboard = (() => {
    let board =  Array(9).fill(null);

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

    return {render};
})();


//game - checks win state, current player. Does not touch DOM
const game = (() => {

})();
