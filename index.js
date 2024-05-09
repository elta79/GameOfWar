let deckId
let computerScore = 0
let playerScore = 0

const remainingCardsEl = document.getElementById("remaining-cards")
const drawCardBtn = document.getElementById("draw-card-button")
const computerCardEl = document.getElementById("computer-card")
const playerCardEl = document.getElementById("player-card")
const computerScoreEl = document.getElementById("computer-score")
const playerScoreEl = document.getElementById("player-score")
const winnerTitleEl = document.getElementById("winner-title")



drawCardBtn.addEventListener("click", async() => {
    if(drawCardBtn.textContent === "New Game"){
    const resDraw = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const dataDraw = await resDraw.json()
        deckId = dataDraw.deck_id
        // console.log(dataDraw)
        drawCardBtn.style.backgroundColor="yellow"
        drawCardBtn.textContent = "DRAW"
        remainingCardsEl.textContent = `Remaining cards: ${dataDraw.remaining}`
    }else if (drawCardBtn.textContent === "DRAW") {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        const data = await res.json()        
            remainingCardsEl.textContent = `Remaining cards: ${data.remaining}`
            let computerCard = data.cards[0]
            let playerCard = data.cards[1]
    
            computerCardEl.innerHTML = `<img class="card-img" src = ${(computerCard.image)}>`
            playerCardEl.innerHTML = `<img class ="card-img" src = ${(playerCard.image)}>`
            computerCardEl.style.backgroundColor="#022f00"
            playerCardEl.style.backgroundColor="#022f00"
        
        determineWinner(computerCard, playerCard)    
    
        if(data.remaining === 0){
            if(computerScore===playerScore){
                winnerTitleEl.style.color="#AB0000"
                winnerTitleEl.textContent ="Tie Game!"
            }else if (computerScore > playerScore){
                winnerTitleEl.style.color="#0037AB"
                winnerTitleEl.textContent = "Computer Wins the Game!"
            }else{
                winnerTitleEl.style.color="#E3E801"
                winnerTitleEl.textContent = "You Win the Game!!"
            }
            
            drawCardBtn.style.backgroundColor = "gray"
            drawCardBtn.style.color = "white"
            drawCardBtn.textContent = "RESETTING"

            setTimeout(() => {
                if (drawCardBtn.textContent === "RESETTING"){
                    drawCardBtn.style.backgroundColor = "#06bcef"
                    drawCardBtn.style.color = "black"
                    drawCardBtn.textContent = "New Game"
                    computerCardEl.innerHTML = ""
                    playerCardEl.innerHTML = ""
                    computerCardEl.style.backgroundColor="#09d402"
                    playerCardEl.style.backgroundColor="#09d402"
                    remainingCardsEl.textContent = "Remaining cards: 0"
                    winnerTitleEl.textContent = "Let's play again!!"                    
                }
            },4000)

        }
    }
    
})

function determineWinner(card1, card2){
    const cardsVal = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const valueIndexCard1 = cardsVal.indexOf(card1.value)
    const valueIndexCard2 = cardsVal.indexOf(card2.value)    
    
    if (valueIndexCard1 > valueIndexCard2){
        computerScore++       
        computerScoreEl.textContent = `Computer: ${computerScore}`
        winnerTitleEl.style.color="#0037AB"
        winnerTitleEl.textContent = "Computer Scores"
    }else if(valueIndexCard2 > valueIndexCard1){
        playerScore++
        playerScoreEl.textContent = `Player: ${playerScore}`
        winnerTitleEl.style.color="#E3E801"
        winnerTitleEl.textContent = "Player Scores"
    }else{
        winnerTitleEl.style.color="#AB0000"
        winnerTitleEl.textContent = "War"
    }

}