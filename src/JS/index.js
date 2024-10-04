const nomeJogadorX = document.getElementById('player1')
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



