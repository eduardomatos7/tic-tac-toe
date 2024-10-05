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
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener('click', handleBoardClick)
  })
    
}

document.getElementById('start').addEventListener('click', initializeGame)

