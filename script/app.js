
let turn = 'x'
let ended = false

const point_x = document.querySelector('#x')
const point_o = document.querySelector('#o')

const win_combinations = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

let nextTurn = () => {
    turn == 'x' ? turn = 'o' : turn = 'x'
}

let phrase = (p) => {
    const phrase = document.querySelector('#phrase')
    phrase.innerText = p
    setTimeout(()=>{
        phrase.innerText = ''
    }, 1000
    )
}

let getActualMarked = () => {
    let x_marked = []
    let o_marked = []
    const cells = document.querySelectorAll('.cell')
    for(let cell of cells){
        id = parseInt(cell.id)
        if(cell.innerText != ''){
            cell.innerText == 'x' ? x_marked.push(id) : o_marked.push(id)
        }
    }
    return [x_marked, o_marked]
}

let mark = (cell) => {
    if(cell.innerText == ''){
        cell.classList.add(turn)
        cell.innerText = turn
        nextTurn()
        checkWinner()
    }
}

let addPoint = (p) => {
    p.innerText = parseInt(p.innerText)+1
}

let win = (p) => {
    ended = true
    phrase(`player ${p} won`)
    p=='x' ? addPoint(point_x) : addPoint(point_o)
    newGame()
}

let draw = () => {
    phrase(`draw`)
    newGame()
}

let allIncludes = (l1, l2) => {
    // l1 includes ALL l2
    let count = 0
    l1.forEach(el1 => {
        if(l2.includes(el1)){
            count++
        }
    })
    if(count==l1.length){
        return true
    }
    return false
}

let checkWinner = () => {
    let ended = false
    const x_marked = getActualMarked()[0]
    const o_marked = getActualMarked()[1]
    win_combinations.forEach(combs=>{
        if(allIncludes(combs, x_marked)){
            win('x')
            ended = true
        } else if (allIncludes(combs, o_marked)){
            win('o')
            ended = true
        }
    })
    if (x_marked.length+o_marked.length==9 && !ended){
        draw()
    }
}

let newGame = () => {
    turn = 'x'
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell=>{
        cell.innerText = ''
        cell.classList.remove('x', 'o')
    })
    ended = false
}

// LISTENER

let addAllListeners = () => {
    for(let cell of document.querySelectorAll('.cell')){
        cell.addEventListener('click', ()=>{
            mark(cell)
        })
    }
}
addAllListeners()
