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

function disableRegion(element){
    element.style.cursor = 'not-allowed' //mostrar bloqueio ao tentar clicar na regiao ja marcada
    element.removeEventListener('click', handleBoardClick)
}



function handleBoardClick(ev){
    const span = ev.currentTarget
    const region = ev.currentTarget.dataset.region // N.N
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if (span.innerText === ''){
        if (turnPlayer === 'player1'){
            span.innerHTML = 'X'
            vBoard[row][column] = 'X'
            turnPlayer = 'player2'
            console.log(turnPlayer)
    
        }else{
            span.innerHTML = 'O'
            turnPlayer = 'player1'
            vBoard[row][column] = 'O'
        }
        console.clear()
        console.table(vBoard)
        if (span !== ''){
            disableRegion(span)}


    }
    
}

document.getElementById('start').addEventListener('click', initializeGame)

