let deckId
let computerScore = 0
let playerScore = 0
const remainingCardsEl = document.getElementById("remaining-cards")
const newDeckBtn = document.getElementById("new-deck-button")
const drawCardBtn = document.getElementById("draw-card-button")
const computerCardEl = document.getElementById("computer-card")
const playerCardEl = document.getElementById("player-card")
const computerScoreEl = document.getElementById("computer-score")
const playerScoreEl = document.getElementById("player-score")
const winnerTitleEl = document.getElementById("winner-title")

newDeckBtn.addEventListener("click", async() => {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const data = await res.json()    
        deckId = data.deck_id
        console.log(data)
        remainingCardsEl.textContent = `Remaining cards: ${data.remaining}`
})

drawCardBtn.addEventListener("click", async() => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()        
        remainingCardsEl.textContent = `Remaining cards: ${data.remaining}`
        let computerCard = data.cards[0]
        let playerCard = data.cards[1]

        computerCardEl.innerHTML = `<img src = ${(computerCard.image)}>`
        playerCardEl.innerHTML = `<img src = ${(playerCard.image)}>`

    
    determineWinner(computerCard, playerCard)    
        
    
})

function determineWinner(card1, card2){
    const cardsVal = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const valueIndexCard1 = cardsVal.indexOf(card1.value)
    const valueIndexCard2 = cardsVal.indexOf(card2.value)    
    
    if (valueIndexCard1 > valueIndexCard2){
        computerScore++       
        computerScoreEl.textContent = `Computer: ${computerScore}`
        winnerTitleEl.textContent = "Computer Scores"
    }else if(valueIndexCard2 > valueIndexCard1){
        playerScore++
        playerScoreEl.textContent = `Player: ${playerScore}`
        winnerTitleEl.textContent = "Player Scores"
    }else{
        winnerTitleEl.textContent = "War"
    }
}