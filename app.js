const btnBorrar = document.getElementById('btnBorrar')

document.addEventListener('DOMContentLoaded', () => {
    cargaContactos()
})


agenda.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('btn-warning') || e.target.classList.contains('fa-trash')){
        console.log(e.target.dataset.id)
        fetch('http://localhost:20000/delete', {
            method: 'POST',
            body: JSON.stringify({
                email:e.target.dataset.id
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
            .then( async (res) => {
                console.log('delete', await res.json())
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
})

btnBorrar.addEventListener('click', () => {
    const email = document.getElementById('email').value

    fetch('http://localhost:20000/delete', {
        method: 'POST',
        body: JSON.stringify({
            email
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then( async (res) => {
            console.log('delete', await res.json())
        })
        .catch((error) => {
            console.log('error', error)
        })
})

const cargaContactos = () => {
    const options = {
        method: 'GET'
    }
    fetch('http://localhost:20000/read', options)
        .then(async (res) => {
            const contactos = await res.json()
            console.log('contactos', contactos.regresa)
            contactos.regresa.forEach((contacto) => {
                const contactoInfo = contacto
                agenda.innerHTML += `<tr>
                <td>${contactoInfo.nombre}</td>
                <td>${contactoInfo.apaterno}</td>
                <td>${contactoInfo.amaterno}</td>
                <td>${contactoInfo.direccion}</td>
                <td>${contactoInfo.telefono}</td>
                <td>${contactoInfo.ciudad}</td>
                <td>${contactoInfo.estado}</td>
                <td>${contactoInfo.email}</td>
                <td>
                    <button type="submit" class="btn btn-danger" data-id="${contactoInfo.email}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button id="showDialog" class="btn btn-warning marco" data-id="${contactoInfo.email}">
                        <i class="fas fa-trash" data-id="${contactoInfo.email}"></i>
                    </button>
                </td>
                </tr>`
            });
        })
        .catch((error) => {
            console.log('error' , error)
        })
}

const insertaContacto = () => {
    const nombre = document.getElementById('nombre')
    const apaterno = document.getElementById('apaterno')
    const amaterno = document.getElementById('amaterno')
    const direccion = document.getElementById('direccion')
    const telefono = document.getElementById('telefono')
    const ciudad = document.getElementById('ciudad')
    const estado = document.getElementById('estado')
    const email = document.getElementById('email')




    fetch('http://localhost:20000/create', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre.value,
            apaterno: apaterno.value,
            amaterno: amaterno.value,
            direccion: direccion.value,
            telefono: telefono.value,
            ciudad: ciudad.value,
            estado: estado.value,
            email: email.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then( async (res) => {
            console.log('create', await res.json())
        })
        .catch((error) => {
            console.log('error', error)
        })
}