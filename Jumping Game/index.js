const container = document.querySelector('.container')

let playerLeftSpace = 50
let playerBottomSpace = 150

const createPlayer = () => {
    const player = document.createElement("div")
    container.appendChild(player)
    player.classList.add("player")
}

createPlayer();