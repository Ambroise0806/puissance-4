export class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
    }

    drawGrid() {
        let table = document.createElement('table')
        let tbody = document.createElement('tbody')
        let cont = document.getElementById('container')
        for (let i = 0; i < this.rows; i++) {
            let row = document.createElement("tr")
            for (let j = 0; j < this.cols; j++) {
                let col = document.createElement("td")
                col.setAttribute("rows", i)
                col.setAttribute("cols", j)
                col.textContent = i + "-" + j
                col.addEventListener('click', () => {
                    if (!col.classList.contains('clicked')) {
                        if (this.player === 1) {
                            this.token(col)
                            this.player = 2
                        } else {
                            this.token(col)
                            this.player = 1
                        }
                        col.classList.add('clicked')
                    }
                })
                row.appendChild(col)
            }
            tbody.appendChild(row)
        }
        table.appendChild(tbody)
        cont.appendChild(table)
    }

    // token(cell) {
    //     if (this.player === 1) {
    //         cell.style.backgroundColor = 'red'
    //         // const j1 = "joueur 1"
    //         // cell.innerHTML = j1
    //     } else {
    //         // const j2 = "joueur 2"
    //         // cell.innerHTML = j2
    //         cell.style.backgroundColor = 'yellow'
    //     }
    // }
    token(cell) {
        if (this.player === 1) {
            cell.style.backgroundColor = 'red';
            this.dropToken(cell);
        } else {
            cell.style.backgroundColor = 'yellow';
            this.dropToken(cell);
        }
    }
    
    dropToken(cell) {
        let row = cell.getAttribute("rows")
        let col = cell.getAttribute("cols")
        for (let i = this.rows - 1; i >= 0; i--) {
            let nextCell = document.querySelector(`td[rows="${i}"][cols="${col}"]`);
            if (!nextCell.classList.contains('clicked')) {
                cell.classList.add('dropping');
                setTimeout(() => {
                    cell.classList.remove('dropping');
                    nextCell.classList.add('clicked');
                    nextCell.style.backgroundColor = cell.style.backgroundColor;
                    cell.style.backgroundColor = ''
                    cell.classList.remove('clicked') 
                })
                break
            }
        }
    }  
}

// export class Indicator {

//     constructor(id1, id2) {
//         this.id1 = id1;
//         this.id2 = id2;
//     }

//     show (){
//         let div = document.getElementById('indicateur');
//         div.style.width = '100px';
//         div.style.height = '100px';
//         div.style.backgroundColor = 'red';
//     }
// }








