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

    const reset = () => {
        board.fill(null);
        game.resetPlayer();
        displayController.render();
    }

    const checkWinner = () => {
        let wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (let i = 0; i < wins.length; i++){
            let [a,b,c] = wins[i];
            if (board[a] === board[b] && board[a] === board[c] && board[a]) {
                return true;
            }
        }
        return false;
    }
    return {move, getBoard, checkWinner, reset};
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

    let resetButton = document.querySelector("button");
    resetButton.addEventListener("click", function() {gameboard.reset()});
    return {turn, render};
})();


//game - checks win state, current player. Does not touch DOM
const game = (() => {
    let playerOne = Player(1);
    let playerTwo = Player(2);
    let gameOver = false;

    let isPlayerOne = true;

    const resetPlayer = () =>{
        isPlayerOne = true;
        document.querySelector('.header').innerHTML = 'Welcome to Tic-Tac-Toe!';
    }

    const changeHeader = () => {
        document.querySelector(".header").innerHTML = !isPlayerOne ? 'Next: Player 1' : 'Next: Player 2';
    }
    //all together now, this wil be the function on the event listener
    const playRound = (element) => {
        if (element.innerHTML != ""){
            return;
        }
        if (isPlayerOne) {
            displayController.turn(element.id, playerOne);
        }
        else{
            displayController.turn(element.id, playerTwo);
        }
        

        changeHeader();
        if(gameboard.checkWinner()) {
            alert(`${isPlayerOne ? "Player 1": "Player 2"} WINS`);
        }
        isPlayerOne = !isPlayerOne;
    };
    

    return {playRound, resetPlayer};
})();
