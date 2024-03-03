
var actual_player = 'x'

const win_configurations = ['123','456','789','147','258','369','159','357']

const get_cell_value = cell_id => document.getElementById(cell_id).innerText

const is_cell_empty = cell_id => get_cell_value(cell_id) == ''

const mark_cell = (cell_id) => { if(is_cell_empty(cell_id)) document.getElementById(cell_id).innerText = actual_player }

const clear_cell = cell_id => document.getElementById(cell_id).innerText = ''

const clear_all_cell = () => { for(const cell of document.getElementsByClassName('tris-cell')) clear_cell(cell.id) }

function set_actual_player(player){

    actual_player = player

    const opposite = (player == 'x') ? 'o' : 'x'
    
    document.getElementById(player + '-points-container').classList.add('active')
    document.getElementById(opposite + '-points-container').classList.remove('active')

}

const next_turn = () => set_actual_player( (actual_player == 'x') ? 'o' : 'x' )

const add_point = (player) => document.querySelector('#' + player + '-points').innerText = Math.round(document.querySelector('#' + player + '-points').innerText) + 1

function include_all(l1, l2) {
    
    // l2 includes ALL l1's elements

    let count = 0

    for(const el of l1) if(l2.includes(el)) count++
    
    if(count == l1.length) return true

    return false

}

function is_grid_full() {

    for(const cell of document.getElementsByClassName('tris-cell')) if(get_cell_value(cell.id) == '') return false

    return true

}

function get_player_cells(player) {

    let cells = ''

    for(const cell of document.getElementsByClassName('tris-cell')) { 
        
        if(get_cell_value(cell.id) == player) {
            cells += cell.id.split('cell_')[1]
        }
    
    }
    
    return cells

}

function check_player_victory(player) {

    const cells = get_player_cells(player)

    for(const configurations of win_configurations) {

        if(include_all(configurations, cells)) return true

    }

    return false

}
