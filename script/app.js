
const text_element = document.querySelector('.result')

const change_text = text => text_element.innerText = text

function victory(player) {

    change_text(player + ' ha vinto!')

    add_point(player)

    clear_all_cell()

    set_actual_player('x')

}

function draw() {

    change_text('pareggio!')

    add_point('x')
    add_point('o')

    clear_all_cell()

    set_actual_player('x')

}

// =====================================================================0

function add_listener(query, func) {
    document.querySelector(query).addEventListener('click', ()=>{
        func.call()
    })
}

// CELLS
const tris_cells = document.getElementsByClassName('tris-cell')

for(const cell of tris_cells) {

    cell.addEventListener('click', ()=>{
        
        mark_cell(cell.id)
        next_turn()

        if(check_player_victory('x')) victory('x')
        else if(check_player_victory('o')) victory('o')
        else if(is_grid_full()) draw()

    })

}

add_listener('.btn-clear', ()=>{ clear_all_cell(); set_actual_player('x'); change_text('') })
add_listener('.btn-reset', ()=>{ location.reload() })
