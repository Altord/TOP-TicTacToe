function player(playerName, symbol) {
    const symbolClass = symbol + "Class";
    return { playerName, symbol, symbolClass};
}





const gameBoard = (()=>{
    let gameInProgress = false;
    let gameBoardArray = ["","","","","","","","","",];
    let winningCell = ["","",""];
    const player1 = player("player1","x", "xClass");
    const player2 = player("player2", "o", "oClass");
    const btnGame = document.querySelector('#new-game')
    const gameBoardFull = document.querySelector('.internal-wrapper')
    let currentPlayer = player1;
    const openCells = document.querySelectorAll(".box");
    const player1Set = document.querySelectorAll('.player1')
    const player2Set = document.querySelectorAll('.player2')
    let xWin = 0;
    let oWin = 0;

    const playGame = () =>{
        currentPlayer = player1;
        gameInProgress = true;
        gameBoardArray = ["","","","","","","","","",];
        openCells.forEach((cell) => {
            cell.classList.remove("xClass");
            cell.classList.remove("oClass");
            cell.classList.remove('winning-x');
            cell.classList.remove('winning-o');
            cell.innerHTML = '';
            cell.removeEventListener("click", addPlayerMark);
            cell.addEventListener("mouseenter", hoverPlayerMarkShow);
            cell.addEventListener("mouseleave", hoverPlayerMarkHide);
            cell.addEventListener("click", addPlayerMark, {once: true});

        });
    };

    const hoverPlayerMarkShow = (e) => {
        if (gameInProgress) {
            if (e.target.classList.contains("xClass") || e.target.classList.contains("oClass")) {
            } else {
                e.target.classList.add("hover-cell");
                e.target.innerHTML = currentPlayer.symbol;

            }
        }
    };
    const hoverPlayerMarkHide = (e) => {
        if (e.target.classList.contains("xClass") || e.target.classList.contains("oClass")) {
        } else {
            e.target.classList.remove("hover-cell");
            e.target.innerHTML = "";
        }
    };

    const pickOp = () => {
        btnGame.addEventListener('click', playGame);
    }

    const addPlayerMark = (e) => {
        if (gameInProgress) {
            const cell = e.target;
            const cellIndex = cell.id[5];
            cell.innerHTML = currentPlayer.symbol;
            cell.classList.remove("hover-cell");
            cell.innerHTML = currentPlayer.symbol;
            cell.classList.add(currentPlayer.symbolClass);
            gameBoardArray[cellIndex] = currentPlayer.symbol;
            checkWin(currentPlayer);
            console.log(gameBoardArray);
            switchTurn();
        }
    };

    const switchTurn = () => {
        return currentPlayer === player1 ? (currentPlayer = player2) : (currentPlayer = player1);
    };

    const checkWin = (currentPlayer) => {
        const winningCombos = [
            ["0", "1", "2"],
            ["3", "4", "5"],
            ["6", "7", "8"],
            ["0", "3", "6"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["0", "4", "8"],
            ["2", "4", "6"],
        ];
        for (let i = 0; i < winningCombos.length; i++) {
            if (
                gameBoardArray[winningCombos[i][0]] === currentPlayer.symbol &&
                gameBoardArray[winningCombos[i][1]] === currentPlayer.symbol &&
                gameBoardArray[winningCombos[i][2]] === currentPlayer.symbol
            ) {
                winningCell[0] = winningCombos[i][0];
                winningCell[1] = winningCombos[i][1];
                winningCell[2] = winningCombos[i][2];
                return [winningCell[0], winningCell[1], winningCell[2], endGameWinner(currentPlayer)];
            }
        }

        if (!gameBoardArray.some((cell) => cell == "")) {
            endGameDraw();
        }
    };

    const endGameDraw = () =>{
        gameInProgress = false;
        msg.innerHTML = "Game over! It's a draw. Play again?";
        console.log("game is a draw");
        }
    const endGameWinner = (currentPlayer) => {

        gameInProgress = false;


        if (currentPlayer.playerName === 'player1'){
            document.getElementById("cell-" + winningCell[1]).classList.add("winning-o");
            document.getElementById("cell-" + winningCell[2]).classList.add("winning-o");
            document.getElementById("cell-" + winningCell[0]).classList.add("winning-o");
            oWin += 1;
            document.getElementById('player1-score').innerHTML = oWin;
            player1Set.forEach((active) =>{
                active.classList.add('winning-o')
            })

        }else{
            document.getElementById("cell-" + winningCell[0]).classList.add("winning-x");
            document.getElementById("cell-" + winningCell[1]).classList.add("winning-x");
            document.getElementById("cell-" + winningCell[2]).classList.add("winning-x");
            xWin += 1;
            document.getElementById('player2-score').innerHTML = xWin;
            player2Set.forEach((active) =>{
                active.classList.add('winning-x')
            })
        }






      

        console.log(`${currentPlayer.playerName} with symbol ${currentPlayer.symbol} is winner!
         Winning cells are ${winningCell[0]},${winningCell[1]},${winningCell[2]},`);



    }

    pickOp();

})();















