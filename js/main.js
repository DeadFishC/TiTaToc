const gameBoard = (() => {
    let _board = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    let _count = 0;

    const play = (place, sign) => { _board[place] = sign; _count++;};
    const clear = () => {_board = [-1,-1,-1,-1,-1,-1,-1,-1,-1]; _count = 0};
    const checkWin = () => {
        for (let i = 0; i < 9; i += 3) {
            if (_board[i] == -1 && _board[i] ==_board[i+1] && _board[i+1] == _board[i+2])
                return _board[i];
        }
        for (let i = 0; i < 3; i++) {
            if (_board[i] != -1 && _board[i] == _board[i+3] && _board[i+3] == _board[i+6])
                return _board[i];
        }
        if (_board[0] != -1 && _board[0] == _board[4] && _board[4] == _board[8])
            return _board[0];
        if (_board[2] != -1 && _board[2] == _board[4] && _board[4] == _board[6])
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

let deleteMe = 0;
$(document).on('click', '.tile', function () {
    if (!this.hasChildNodes()) {
        if (deleteMe == 0) {
            $('#' + this.id).append('<img src="img/circle.svg" class="circle" alt="Circle" onload="SVGInject(this)">');
            deleteMe++;
        }
        else {
            $('#' + this.id).append('<img src="img/cross.svg" class="circle" alt="Circle" onload="SVGInject(this)">');
            deleteMe--;
        }
    }
});



const playerFactory = (sign, name) => {
    return {sign, name};
};

player = playerFactory('x', 'Kek');