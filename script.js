//tic tac toe

//players 
const Player = (num) => {
    const getSymbol = () => {
        if (num === 1){
            return "X";
        }
        else{
            return "O";
        }
    };
    return {getSymbol};
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
    
    const turn = (square, player) => {
        //make a move 
        gameboard.move(square, player.getSymbol());
        //rerender the board
        render();
    }
    
    let cells = document.querySelectorAll(".cell");
    cells.forEach((e) => {
        e.addEventListener("click", function() {game.playRound(this)});
    });
    return {turn};
})();


//game - checks win state, current player. Does not touch DOM
const game = (() => {
    let playerOne = Player(1);
    let playerTwo = Player(2);
    console.log(playerOne.getSymbol());
    let isPlayerOne = true;
    //all together now, this wil be the function on the event listener
    const playRound = (element) => {
        
        if (isPlayerOne) {
            displayController.turn(element.id, playerOne);
        }
        else{
            displayController.turn(element.id, playerTwo);
        }
        isPlayerOne = !isPlayerOne;
        
    };

    return {playRound};
})();
