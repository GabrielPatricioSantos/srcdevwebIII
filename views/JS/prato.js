function imagePrev () {
	let image = document.getElementById('image')
	let file = document.getElementById('fileInput').files[0];
	let reader = new FileReader();
	
    reader.onloadend = function () {
        image.setAttribute('src', reader.result)
    }

    if(file)
	    reader.readAsDataURL(file);
}

function newIngredient (addLabel) {
    let receita = document.getElementsByClassName('receita')[0]

    if(receita.querySelector('.newIng') == null) {
        let medidas = receita.querySelector('select[name="medidas[]"]')

        receita.innerHTML += 
        `<div class="row g-3">
            <div class="col mb-3">`+
                ((addLabel) ? "<label>Nome</label>" : "") +
                `<input type="text" name="newIng[]" class="form-control newIng" placeholder="Novo ingrediente" required>
            </div>

            <div class="col mb-3">`+
                ((addLabel) ? "<label>Porção</label>" : "") +
                `<input type="number" class="form-control" name="porcoes[]" required>
            </div>
            
            <div class="col-md mb-3">`+
                ((addLabel) ? "<label>Medida</label>" : "") +
                `<select name="medidas[]" class="form-control" required>`+
                    medidas.innerHTML+
                `</select>
            </div>
        </div>`
    }
}

function rmvIngredient () {
    let receita = document.querySelector('.receita')
    let rows = receita.querySelectorAll('.row')

    if(rows.length == 1 && receita.querySelector('.newIng') != null)
        return

    if(rows.length == 1 ) {
        newIngredient(true)

        let receita = document.querySelector('.receita')
        let rows = receita.querySelectorAll('.row')
        
        receita.removeChild(rows[0])
    } else
        receita.removeChild(rows[rows.length - 1])
}

function addIngredient () {
    let receita = document.getElementsByClassName('receita')[0]

    let row     = receita.getElementsByClassName('row')[0].cloneNode(true)
    let selects = row.querySelectorAll("select")
    let input   = row.querySelector("input")

    row.querySelectorAll('label').forEach(label => {
        label.remove()
    })

    selects.forEach(select => {
        select.selectedIndex = 0
    });

    //input.value = "1"

    receita.appendChild(row)
}