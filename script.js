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
})();



//displayController - ties DOM to board
const displayController = (() => {

})();


//game - checks win state, current player. Does not touch DOM
const game = (() => {

})();
