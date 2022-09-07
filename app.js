const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

// Data
const worldCups = [
    {
        "id": 1,
        "winner": "o Uruguai",
        "year": '1930'
    },
    {
        "id": 2,
        "winner": "a Itália",
        "year": '1934'
    },
    {
        "id": 3,
        "winner": "a Itália",
        "year": '1938'
    },
    {
        "id": 4,
        "winner": "o Uruguai",
        "year": '1950'
    },
    {
        "id": 5,
        "winner": "a Alemanha",
        "year": '1954'
    },
    {
        "id": 6,
        "winner": "o Brasil",
        "year": '1958'
    },
    {
        "id": 7,
        "winner": "o Brasil",
        "year": '1962'
    },
    {
        "id": 8,
        "winner": "a Inglaterra",
        "year": '1966'
    },
    {
        "id": 9,
        "winner": "o Brasil",
        "year": '1970'
    },
    {
        "id": 10,
        "winner": "a Alemanha",
        "year": '1974'
    },
    {
        "id": 11,
        "winner": "a Argentina",
        "year": '1978'
    },
    {
        "id": 12,
        "winner": "a Itália",
        "year": '1982'
    },
    {
        "id": 13,
        "winner": "a Argentina",
        "year": '1986'
    },
    {
        "id": 14,
        "winner": "a Alemanha",
        "year": '1990'
    },
    {
        "id": 15,
        "winner": "o Brasil",
        "year": '1994'
    },
    {
        "id": 16,
        "winner": "a França",
        "year": '1998'
    },
    {
        "id": 17,
        "winner": "o Brasil",
        "year": '2002'
    },
    {
        "id": 18,
        "winner": "a Itália",
        "year": '2006'
    },
    {
        "id": 19,
        "winner": "a Espanha",
        "year": '2010'
    },
    {
        "id": 20,
        "winner": "a Alemanha",
        "year": '2014'
    },
    {
        "id": 21,
        "winner": "a França",
        "year": '2018'
    }
]

// Get random id
let id = worldCups[Math.floor(Math.random() * worldCups.length)].id
let cup = worldCups.findIndex((i) => i.id == id)

// Get data from id
let winner = worldCups[cup].winner
let year = worldCups[cup].year

// Push 'winner' to 'h2'
const getWinner = () => {
    document.getElementById("winner").innerHTML = `Em que ano ${winner} venceu?`;
}

// Keyword
const wordle = year

// Keys
const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'ENTER',
    '←',
]

// Rows for anwser
const guessRows = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
]

// Init
let currentRow = 0
let currentTile = 0
let isGameOver = false

// For each row
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

// For each key
keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

// Handle Click
const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === '←') {
            deleteLetter()
            return
        }
        if (letter === 'ENTER') {
            checkRow()
            return
        }
        addLetter(letter)
    }
}

// Add leter
const addLetter = (letter) => {
    if (currentTile < 4 && currentRow < 3) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

// Delete letter
const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

// Validate anwser
const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile > 3) {
        flipTile()
        if (wordle == guess) {
            showMessage('✅ Parabéns! Você acertou!')
            tryAgain()
            isGameOver = true
            return
        } else {
            if (currentRow >= 2) {
                showMessage(`⛔ Errou! Resposta: ${year}`)
                tryAgain()
                isGameOver = true
                return
            }
        }
        if (currentRow < 2) {
            currentRow++
            currentTile = 0
        }
    }
}

// End message
const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
}

// Try again message
function tryAgain() {
    const buttonElement = document.createElement('button')
    buttonElement.setAttribute('onclick', 'reload()')
    buttonElement.innerHTML = `Jogar Novamente!`
    messageDisplay.append(buttonElement)
}

//reload-button
function reload() {
    window.location.reload();
}

// Colors
const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

// Animation
const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}
