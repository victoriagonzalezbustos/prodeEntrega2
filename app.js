
//creo la clase para el usuario

class Usuario {
    constructor(nombre, lastName, email, pass) {
        this.nombre = nombre,
        this.lastName = lastName,
        this.email = email,
        this.pass = pass,
        this.puntos = 0
            
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

//funcion para guardar al usuario
let botonGuardarDatos = document.getElementById("botonGuardarDatos")

botonGuardarDatos.addEventListener("click",
function guardarDatos(){
    let email= document.getElementById("email").value
    let pass= document.getElementById("pass").value
    let nombre=  document.getElementById("name").value
    let lastName= document.getElementById("lastName").value
    let usuario = new Usuario(nombre, lastName, email, pass) 



    listaUsuarios.unshift(usuario)
   


})  

// creo la clase para recoger datos de las apuestas
class PartidoApuesta {
    constructor(equipo1, equipo2, goles1,goles2 ){
        this.equipo1 = equipo1,
        this.equipo2 = equipo2,
        this.goles1 = goles1,
        this.goles2 = goles2
    }
}

// creo la funcion para guardar en el local storage las apuestas 
let partidos = document.querySelectorAll(".Partido")
let botonGuardarApuesta= document.querySelectorAll(".botonGuardarApuesta")

for ( let boton of botonGuardarApuesta){

boton.addEventListener("click", function GuardarApuesta() {
/*
    let i= boton.id

    let partidos= document.querySelectorAll(".Partido")
    let equipos1 = document.querySelectorAll(".Equipo1")
    let equipos2 = document.querySelectorAll(".Equipo2")
    let golesEquipo1apuesta = document.querySelectorAll(".GolesEquipo1Usuario")
    let golesEquipo2apuesta = document.querySelectorAll(".GolesEquipo2Usuario")

    //console.log(document.querySelectorAll("GolesEquipo1Usuario"))

    let partido= partidos[i].textContent
    let equipo1= equipos1[i].textContent
    let equipo2= equipos2[i].textContent
    let goles1 = golesEquipo1apuesta[i].value
    let goles2 = golesEquipo2apuesta[i].value
  
    let nuevo = new PartidoApuesta(equipo1, equipo2, goles1, goles2)
    
    
    let haciaLS = JSON.stringify(nuevo)
    
    localStorage.setItem(partido,haciaLS)

    golesEquipo1apuesta[i].disabled = true
    golesEquipo2apuesta[i].disabled = true

    */
    Swal.fire({
        title: "Apuesta exitosa!",
        text: "Tu prediccion se guardo exitosamente!",
        icon: "success"
      });
    
  
})}



// aca llamo a la api y transformo la respuesta en json

let mostrarResultados = document.querySelector(".mostrarResultados")
mostrarResultados.addEventListener("click",
async function ResultadosReales(){
    await fetch("https://v3.football.api-sports.io/fixtures?date=2019-03-01", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "68b476039a6b5f4bb6b1fc0046fad8db"
        }
    })
    .then(res=> res.json())
    .then(response=>{
        DataPartidos = response.response
        
    })
    .catch((error)=> console.log("error",error))

//inicializo los arrays donde voy a meter la data que necesito para hacer las comparaciones 
partidosReales=[]    
golesEquiposVisitantes=[]
golesEquiposLocales=[]
//lleno los arrays con los partidos y goles de los equipos
for (let match of DataPartidos){
    partidosReales.push(match.teams.home.name + " vs " + match.teams.away.name)
    golesEquiposVisitantes.push(match.goals.away)
    golesEquiposLocales.push(match.goals.home)
}
//acoto los arrays a fines de no procesar tantos datos, esto en una aplicacion real no estaria
partidosRealesAcotado = partidosReales.slice(1,4)
golesEquiposVisitantesAcotado =  golesEquiposVisitantes.slice(1,4)
golesEquiposLocalesAcotado = golesEquiposLocales.slice(1,4)





// comparo la info de la api (partidos reales) con la info del local storage (resultados apostados x el usuario)
for (let i of partidosRealesAcotado){
    a = partidosRealesAcotado.indexOf(i)
    partidoApuesta = JSON.parse(localStorage.getItem(i))
    puntosusuario = listaUsuarios[0].puntos


    if (partidoApuesta.goles1 > partidoApuesta.goles2 & golesEquiposLocalesAcotado[a] > golesEquiposVisitantesAcotado[a]){
        
        let respuestaResultado = document.querySelector(".resultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML =  "Acertaste! Gano" + partidoApuesta.equipo1 + ", sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        puntosusuario++
        
    }else if(partidoApuesta.goles1 < partidoApuesta.goles2 & golesEquiposLocalesAcotado[a] < golesEquiposVisitantesAcotado[a]){
        let respuestaResultado = document.querySelector(".resultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! Gano" + partidoApuesta.equipo2 + ", sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        puntosusuario++
        
    }else if(partidoApuesta.goles1 == partidoApuesta.goles2 & golesEquiposLocalesAcotado[a] == golesEquiposVisitantesAcotado[a]){
        let respuestaResultado = document.querySelector(".resultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "Acertaste! "+ i +" Empataron!, sumas 1 punto"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
        puntosusuario++
    }else{
        let respuestaResultado = document.querySelector(".resultado")
        let contenedorRespuestaResultado = document.createElement("div")
        contenedorRespuestaResultado.innerHTML = "En el partido de " + i + " No acertaste, no sumas puntos"
        respuestaResultado.appendChild(contenedorRespuestaResultado)
    }
    listaUsuarios[0].puntos = puntosusuario



}

let puntosAcumulados = document.querySelector(".puntosAcumulados")
let listado = document.createElement("div")
listado.innerHTML = "tus puntos totales son: " + listaUsuarios[0].puntos
puntosAcumulados.appendChild(listado)



})


// esta lista muestra el ranking 

let mostrarRanking = document.querySelector(".mostrarRanking")
mostrarRanking.addEventListener("click", 
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

  


