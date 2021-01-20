let activePlayer, player1, player2;

const gameBoard = (() => {
    let _board = ['E','E','E','E','E','E','E','E','E'];
    let _count = 0;

    const play = (place, sign) => { _board[place] = sign; _count++; console.log(_board);};
    const clear = () => {_board = ['E','E','E','E','E','E','E','E','E']; _count = 0};
    const checkWin = () => {
        console.log('_count: '+ _count);
        for (let i = 0; i < 9; i += 3) {
            if (_board[i] != 'E' && _board[i] ==_board[i+1] && _board[i+1] == _board[i+2])
                return _board[i];
        }
        for (let i = 0; i < 3; i++) {
            if (_board[i] != 'E' && _board[i] == _board[i+3] && _board[i+3] == _board[i+6])
                return _board[i];
        }
        if (_board[0] != 'E' && _board[0] == _board[4] && _board[4] == _board[8])
            return _board[0];
        if (_board[2] != 'E' && _board[2] == _board[4] && _board[4] == _board[6])
            return _board[2];
        if (_count == 9)
            return 'Tie';
        return 'Continue';
    };
    return {
        play,
        clear,
        checkWin
    };  
})();

$(document).on('click', '.tile', function () {
    if (!this.hasChildNodes()) {
        $('#' + this.id).append(`<img src="${activePlayer.sign == 'X' ? 'img/cross.svg' : 'img/circle.svg'}" class="circle" alt="Circle" onload="SVGInject(this)">`);
        gameBoard.play(this.id, activePlayer.sign);
        let result = gameBoard.checkWin();
        console.log("result: " + result);
        if (result == 'Continue') {
            activePlayer = activePlayer == player2 ? player1 : player2;
            return;
        }
        if (result == 'Tie') {
            $('#message').text("It's a tie!");
            $('#message').css("visibility", "visible");
            return;
        }
        if (result == 'X') {
            $('#message').text(`${player1.name} wins!`);
            $('#message').css("visibility", "visible");
            return;
        }
        else {
            $('#message').text(`${player2.name} wins!`);
            $('#message').css("visibility", "visible");
        }

    }
});

const start = () => {
    let validation = () => {
        
    }

    player1 = playerFactory('X', $('#player1_name').val());
    player2 = playerFactory('O', $('#player2_name').val());
    let roll = Math.floor(Math.random() * Math.floor(2));
    if (roll == 0)
        activePlayer = player1;
    else
        activePlayer = player2;
    $('.playerField').addClass('fadeoutSlide');
    $('.grid_container').addClass('showGridLines');
    $('.wrapper').addClass('gridPulse');
    $('#playButton').addClass('spinButton');
    $('.playButton').addClass('fadeout');
}

const playerFactory = (sign, name) => {
    return {sign, name};
};
