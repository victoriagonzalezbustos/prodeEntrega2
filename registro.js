

//armo la funcion para guardar los datos que se suban desde el adin

function Admin() {
    let golesRiverReal= document.getElementById("GolesRiverReal").value
    let golesBocaReal= document.getElementById("GolesBocaReal").value
    console.log(golesRiverReal)
    console.log(golesBocaReal)

}

//creo la clase para el usuario

class Usuario {
    constructor(nombre, lastName, email, pass) {
        this.nombre = nombre,
        this.lastName = lastName,
        this.email = email,
        this.pass = pass,
        this.puntos = Math.round(Math.random()*10)
            
    }
}

// aca armo usuarios random y los pusheo a la lista de usuarios
// para simular competidores
listaUsuarios = []; 
usuario1 = {
    nombre: "vicky",
    lastName: "gonzalez",
    email: "vicky@gmail.com",
    pass: "123",
    puntos: 5
}

usuario2 = {
    nombre: "agus",
    lastName: "naca",
    email: "agus@gmail.com",
    pass: "123",
    puntos: 7
}

usuario3 = {
    nombre: "martu",
    lastName: "barone",
    email: "martu@gmail.com",
    pass: "123",
    puntos: 2
}

listaUsuarios.push(usuario1, usuario2, usuario3)
listaPuntos = []

//funcion que se ejecuta en el registro para guardar al usuario

function guardarDatos(){
    let email= document.getElementById("email").value
    let pass= document.getElementById("pass").value
    let nombre=  document.getElementById("name").value
    let lastName= document.getElementById("lastName").value
    let usuario = new Usuario(nombre, lastName, email, pass) 

    listaUsuarios.unshift(usuario)
    console.log(listaUsuarios)


}

// funcion que guarda y evalua la prediccion del jugador en el prode

function Apuesta(){
    let golesRiverReal= document.getElementById("GolesRiverReal").value
    let golesBocaReal= document.getElementById("GolesBocaReal").value
    let golesRiverUsuario= document.getElementById("GolesRiverUsuario").value
    let golesBocaUsuario= document.getElementById("GolesBocaUsuario").value
    puntosUsuario = listaUsuarios[0].puntos

    if ( (golesBocaUsuario > golesRiverUsuario & golesBocaReal > golesRiverReal)) {
        let respuestaResultado = document.querySelector(".respuestaResultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! Gano Boca, sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        console.log("Acertaste! Gano Boca, sumas 1 punto")
        puntosUsuario++
    }
    else if ((golesBocaUsuario < golesRiverUsuario & golesBocaReal < golesRiverReal)) {
        let respuestaResultado = document.querySelector(".respuestaResultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! Gano River, sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        console.log("Acertaste! Gano River, sumas 1 punto")
        puntosUsuario ++
    }
    else if ((golesBocaUsuario == golesRiverUsuario & golesBocaReal == golesRiverReal)){
        let respuestaResultado = document.querySelector(".respuestaResultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! Empataron, sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("Acertaste! Empataron, sumas 1 punto")
        puntosUsuario ++
    } else {
        let respuestaResultado = document.querySelector(".respuestaResultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "No acertaste! No sumas puntos en esta categoria"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("No acertaste! No sumas puntos en esta categoria")
        
    }
    
    if (golesBocaUsuario==golesBocaReal) {
        let respuestaResultado = document.querySelector(".respuestaGolesBoca")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste los goles de Boca! Sumas un punto!"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("Acertaste los goles de Boca! Sumas un punto!")
        puntosUsuario ++
    } else {
        let respuestaResultado = document.querySelector(".respuestaGolesBoca")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "No acertaste los goles de Boca, no sumas puntos en esta categoria"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("No acertaste los goles de Boca, no sumas puntos en esta categoria")
        
    }
    
    if (golesRiverUsuario==golesRiverReal) {
        let respuestaResultado = document.querySelector(".respuestaGolesRiver")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste los goles de River! Sumas un punto!"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("Acertaste los goles de River! Sumas un punto!")
        puntosUsuario ++
    } else {
        let respuestaResultado = document.querySelector(".respuestaGolesRiver")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "No acertaste los goles de River, no sumas puntos en esta categoria"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("No acertaste los goles de River, no sumas puntos en esta categoria")
        
    }

    let puntosAcumulados = document.querySelector(".puntosAcumulados")
    let listado = document.createElement("div")
    listado.innerHTML = puntosUsuario
    puntosAcumulados.appendChild(listado)
    listaUsuarios[0].puntos = puntosUsuario
    console.log()
    
}


function resultados(lista){

    
    lista.sort((a,b) => {
        if(a.puntos > b.puntos) {
            return -1;
        } else if (a.puntos < b.puntos) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log(lista)
    let text ="";
    for (var i = 0; i < listaUsuarios.length; i++) {
        text += '<li>'+listaUsuarios[i].nombre + " " +listaUsuarios[i].puntos+'</li>';
    }
    
    document.getElementById("ranking").innerHTML = text; 
}

  


