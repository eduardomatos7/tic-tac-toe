/*const nomeJogadorX = document.getElementById('player1')
const nomeJogadorO = document.getElementById('player2')
const vez = document.getElementById('vez')
const cellElements = document.querySelectorAll('.area')

let selected
let jogador = 'X'

cellElements.forEach(function(element){
    element.addEventListener('click', function(){
        if (element.innerHTML === ''){
            element.innerHTML = jogador
            if (jogador === 'X'){
                jogador = 'O'
            
            }else{
                jogador = 'X'
            }
        }
    })
})
*/
const BoardRegions = document.querySelectorAll('.area')
let vBoard = []
let turnPlayer = ''

function updateTitle() {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame(){
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = ' Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    BoardRegions.forEach(function(element){
        element.style.cursor = 'pointer'
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
    })
        
}

// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
      winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push("0.2", "1.1", "2.0")
    return winRegions
  }

function disableRegion(element){
    element.style.cursor = 'not-allowed' //mostrar bloqueio ao tentar clicar na regiao ja marcada
    element.removeEventListener('click', handleBoardClick)
}

// FUnção para aplicar traço na hora da vitoria
function handleWin(regions) {
    const winLine = document.createElement('div');
    winLine.classList.add('winLine');
    
    const board = document.querySelector('.areaMarcacao');
    board.appendChild(winLine); // Adiciona a linha ao tabuleiro

    if (regions.includes("0.0") && regions.includes("0.1") && regions.includes("0.2") ){ // Vitória horizontal top
        winLine.classList.add('horizontal-top-win');
        setTimeout(() => winLine.classList.add('expand-horizontal'), 100);
    }else if(regions.includes("1.0") && regions.includes("1.1") && regions.includes("1.2")){ // Vitória horizontal center
            winLine.classList.add('horizontal-center-win');
            setTimeout(() => winLine.classList.add('expand-horizontal'), 100);
    } else if(regions.includes("2.0") && regions.includes("2.1") && regions.includes("2.2")){ // Vitória horizontal bottom
            winLine.classList.add('horizontal-bottom-win');
            setTimeout(() => winLine.classList.add('expand-horizontal'), 100);
        
    } else if (regions.includes("0.0") && regions.includes("1.0") && regions.includes("2.0")){
            winLine.classList.add('vertical-left-win');
            setTimeout(() => winLine.classList.add('expand-vertical'), 100);
            
    }else if (regions.includes("0.1") && regions.includes("1.1") && regions.includes("2.1")){
        winLine.classList.add('vertical-center-win');
        setTimeout(() => winLine.classList.add('expand-vertical'), 100);

    }else if(regions.includes("0.2") && regions.includes("1.2") && regions.includes("2.2")){
        // Vitória vertical
        winLine.classList.add('vertical-right-win');
        setTimeout(() => winLine.classList.add('expand-vertical'), 100);
    } else if (regions.includes("0.0") && regions.includes("1.1") && regions.includes("2.2")) {
        // Diagonal da esquerda para a direita
        winLine.classList.add('diagonal-left');
        setTimeout(() => winLine.classList.add('expand-diagonal'), 100);
    } else if (regions.includes("0.2") && regions.includes("1.1") && regions.includes("2.0")) {
        // Diagonal da direita para a esquerda
        winLine.classList.add('diagonal-right');
        setTimeout(() => winLine.classList.add('expand-diagonal'), 100);
    }

    const playerName = document.getElementById(turnPlayer).value;
    document.querySelector('h2').innerHTML = playerName + ' Venceu!';
}



function handleBoardClick(ev){
    const span = ev.currentTarget
    const region = ev.currentTarget.dataset.region // N.N
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    
    if (turnPlayer === 'player1'){
        span.innerHTML = 'X'
        vBoard[row][column] = 'X'
        console.log(turnPlayer)

    }else{
        span.innerHTML = 'O'
        vBoard[row][column] = 'O'
    }
    console.clear()
    console.table(vBoard)
    disableRegion(span)
    const winRegions = getWinRegions()
    if (winRegions.length > 0){
        handleWin(winRegions)
    }else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    }else{
        document.querySelector('h2').innerHTML = 'Empate!'
    }
    
}

document.getElementById('start').addEventListener('click', initializeGame)

