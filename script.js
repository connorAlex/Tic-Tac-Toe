//tic tac toe

//players 
const Player = (num, name) => {
    
    //getter for player's symbol
    const getSymbol = () => {
        if (num === 1){
            return "X";
        }
        else{
            return "O";
        }
    };

    //getter for player's name
    const getName = () => {
        return name;
    }

    return {getSymbol, getName};
};

//gameboard - do not touch DOM
const gameboard = (() => {
    let _board =  Array(9).fill(null);

    //change a position on the board arr
    const move = (space, symbol) => {
        let tmp  = _board;
        tmp[space] = symbol;
        _board = tmp;
    };

    //return private board arr
    const getBoard = () => {
        return _board;
    }
    
    //reset the board array with null.
    const reset = () => {
        //using a more immutable method for replacement
        _board.fill(null);
        game.resetPlayer();
        displayController.render();
    }

    const checkDraw = () => {
        if (!_board.includes(null)){
            return true;
        }
        return false;
    }
    


    //determine game win state
    const checkWinner = () => {

        //hardcode all of the potential win states
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
            //using 'deconstructing assignment'(ES6) to split each of the arr items to specific vars
            let [a,b,c] = wins[i];

            //if all of the board values in any of the win states match, that's a win
            if (_board[a] === _board[b] && _board[a] === _board[c] && _board[a]) {
                return true;
            }
        }

        return false;
    }

    return {move, getBoard, checkWinner, reset, checkDraw};
})();



//displayController - ties DOM to board
const displayController = (() => {

    let header = document.querySelector('.header');

    //add event listeners to squares
    let cells = document.querySelectorAll(".cell");
    cells.forEach((e) => {
        e.addEventListener("click", function() {game.playRound(this)});
    });

    //..reset button as well
    let resetButton = document.querySelector("button");
    resetButton.addEventListener("click", function() {gameboard.reset()});

    //render function
    const render = () => {
        let boardArr = gameboard.getBoard();
        for (let i = 0; i < boardArr.length; i++) {
            document.getElementById(i).innerHTML = boardArr[i];
        }
    };
    
    //turn couples the move with re-rendering the DOM
    const turn = (square, player) => {
        //make a move 
        gameboard.move(square, player.getSymbol());
        //rerender the board
        render();
    }
    
    //winHeader changes based on win/draw, will reset if no param is given
    const winHeader = (winner) => {
        if (winner === "draw"){
            header.innerHTML = "Draw!";
            return;

        }else if (winner) {
            header.innerHTML = `${winner} wins!`;
            return;    
        }
        header.innerHTML = "Welcome to Tic-Tac-Toe!";
    }

    //change header based on the current player's turn
    const changeHeader = (currentPlayerBool) => {
        header.innerHTML = `${!currentPlayerBool ? 'Next: Player 1':'Next: Player 2'}`
    }

    
    return {turn, render, winHeader, changeHeader};
})();


//game - checks win state, current player.
const game = (() => {
    const playerOne = Player(1, "Player 1");
    const playerTwo = Player(2, "Player 2");
    let isPlayerOne = true;

    const resetPlayer = () =>{
        isPlayerOne = true;
        displayController.winHeader();
    }

    //all together now, this wil be the function on the event listener
    const playRound = (element) => {

        //has a space been filled || is the game over?
        if (element.innerHTML != "" || gameboard.checkWinner() === true){
            return;
        }

        //allocates symbol based on turn
        if (isPlayerOne) {
            displayController.turn(element.id, playerOne);
        }
        else{
            displayController.turn(element.id, playerTwo);
        }

        //swap header to the next player's turn
        displayController.changeHeader(isPlayerOne);
        
        //check for draw
        if (gameboard.checkDraw()){
            displayController.winHeader("draw");
        }

        //check if that move caused the game to win
        if(gameboard.checkWinner()) {
            displayController.winHeader(isPlayerOne ? playerOne.getName() : playerTwo.getName());
        }

        //swap turn to the next player
        isPlayerOne = !isPlayerOne;
    };
    

    return {playRound, resetPlayer};
})();
