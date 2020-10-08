const board = document.querySelector('.board');
const reset = document.getElementById('reset');

const player1 = 'X';
const player2 ='O';

let player = player1;

board.addEventListener('click', play);

function play(go) {
    go.target.innerHTML = player;
    if(player === player1)
    player = player2;
    else player = player1;
}

reset.addEventListener('click', resetBoard);

function resetBoard() {
    const board = document.querySelector('.board');
    const children = Array.from(board.children);
    for (let i = 0; i < board.children.length; i++) {
        board.children[i].innerText = '';
    }
}