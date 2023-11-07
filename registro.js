

//armo la funcion y el evento para guardar los datos que se suban desde el admin
class PartidoAdmin {
    constructor( equipo1, equipo2, golesEquipo1Real,golesEqiupo2Real ){
        this.equipo1 = equipo1,
        this.equipo2 = equipo2,
        this.golesEquipo1Real = golesEquipo1Real,
        this.golesEqiupo2Real = golesEqiupo2Real
    }
}

let botonAdmin = document.querySelector(".botonAdmin")
console.log(botonAdmin)

botonAdmin.addEventListener("click", function Admin() {
    
    let partido = document.querySelector(".Partido").textContent
    let equipo1 = document.querySelector(".Equipo1").textContent
    let equipo2 = document.querySelector(".Equipo2").textContent
    let golesEquipo1Real= document.querySelector(".GolesEquipo1Real").value
    let golesEqiupo2Real= document.querySelector(".GolesEquipo2Real").value
  
    let nuevo = new PartidoAdmin(equipo1, equipo2, golesEquipo1Real, golesEqiupo2Real)
    let haciaLS = JSON.stringify(nuevo)
    localStorage.setItem(partido,haciaLS)

})



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
let botonGuardarDatos = document.getElementById("botonGuardarDatos")

botonGuardarDatos.addEventListener("click",
function guardarDatos(){
    let email= document.getElementById("email").value
    let pass= document.getElementById("pass").value
    let nombre=  document.getElementById("name").value
    let lastName= document.getElementById("lastName").value
    let usuario = new Usuario(nombre, lastName, email, pass) 



    listaUsuarios.unshift(usuario)
    console.log(listaUsuarios)


})



// funcion que guarda y evalua la prediccion del jugador en el prode

let botonApuesta = document.getElementById("botonApuesta")

botonApuesta.addEventListener("click", function Apuesta(){

    let partidoProde = document.getElementById("PartidoProde").textContent
    let resultadosreales = localStorage.getItem(partidoProde)
    let objResultadosReales = JSON.parse(resultadosreales)
    console.log(objResultadosReales)

    let equipo1 = objResultadosReales.equipo1
    let equipo2 = objResultadosReales.equipo2

    // goles reales
    let golesEquipo1Real= parseInt(objResultadosReales.golesEquipo1Real)
    let golesEquipo2Real= parseInt(objResultadosReales.golesEqiupo2Real)
    // goles del usuario
    let golesEquipo1Usuario= document.getElementById("GolesEquipo1Usuario").value

    let golesEquipo2Usuario= document.getElementById("GolesEquipo2Usuario").value
    puntosUsuario = listaUsuarios[0].puntos

    if ( (golesEquipo2Usuario > golesEquipo1Usuario & golesEquipo2Real > golesEquipo1Real)) {
        let respuestaResultado = document.querySelector(".respuestaResultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! Gano" + equipo2 + ", sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        console.log("Acertaste! Gano" + equipo2 + ", sumas 1 punto")
        puntosUsuario++
    }
    else if ((golesEquipo2Usuario < golesEquipo1Usuario & golesEquipo2Real < golesEquipo1Real)) {
        let respuestaResultado = document.querySelector(".respuestaResultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! Gano" + equipo1 + ", sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        console.log("Acertaste! Gano" + equipo1 + ", sumas 1 punto")
        puntosUsuario ++
    }
    else if ((golesEquipo2Usuario == golesEquipo1Usuario & golesEquipo2Real == golesEquipo1Real)){
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
    
    if (golesEquipo2Usuario==golesEquipo2Real) {
        let respuestaResultado = document.querySelector(".respuestaGolesBoca")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste los goles de " + equipo2 +" ! Sumas un punto!"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("Acertaste los goles de" + equipo2 +"! Sumas un punto!")
        puntosUsuario ++
    } else {
        let respuestaResultado = document.querySelector(".respuestaGolesBoca")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "No acertaste los goles de " + equipo2 +" , no sumas puntos en esta categoria"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("No acertaste los goles de " + equipo2 +" , no sumas puntos en esta categoria")
        
    }
    
    if (golesEquipo1Usuario==golesEquipo1Real) {
        let respuestaResultado = document.querySelector(".respuestaGolesRiver")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste los goles de "+ equipo1 + " ! Sumas un punto!"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("Acertaste los goles de "+ equipo1 + " ! Sumas un punto!")
        puntosUsuario ++
    } else {
        let respuestaResultado = document.querySelector(".respuestaGolesRiver")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "No acertaste los goles de " + equipo1 + " , no sumas puntos en esta categoria"
        respuestaResultado.appendChild(contenedorRespuestaResultado)  
        console.log("No acertaste los goles de " + equipo1 + " , no sumas puntos en esta categoria")
        
    }

    let puntosAcumulados = document.querySelector(".puntosAcumulados")
    let listado = document.createElement("div")
    listado.innerHTML = puntosUsuario
    puntosAcumulados.appendChild(listado)
    listaUsuarios[0].puntos = puntosUsuario
    console.log()
    
})


let mostrarResultados = document.getElementById("botonListaUsuarios")


mostrarResultados.addEventListener("click", 
function resultados(){

    
    listaUsuarios.sort((a,b) => {
        if(a.puntos > b.puntos) {
            return -1;
        } else if (a.puntos < b.puntos) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log(listaUsuarios)
    let text ="";
    for (var i = 0; i < listaUsuarios.length; i++) {
        text += '<li>'+listaUsuarios[i].nombre + " " +listaUsuarios[i].puntos+'</li>';
    }
    
    document.getElementById("ranking").innerHTML = text; 
})

  


