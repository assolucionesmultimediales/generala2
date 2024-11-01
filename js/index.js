// Objeto que tiene las propiedades el juego
const game = {
  // Array de dados, cienco dados
  dados: [],
  // Array para guardar los dados que selecciono dentro de una jugada
  seleccionados: [],
  // Cantidad de juegadores
  cantJugadores: 2,
  // Propiedad que guarda de quien es el turno
  turno: 0,
  // Propiedad que guarda la cantidad de tiradas por juego
  tiros: 0,
  tirosTotales: 0,
  // Obj dentro de otro obj que a su vez tiene propiedades que a su vez tienen arrays
  puntos: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    // Escalera
    E: [],
    // Full
    F: [],
    // Poker
    P: [],
    // Generala
    G: [],
    // Generala Doble
    D: [],
    // Total
    T: [],
  },
  // Tamaño de los dados pixeles
  dadoSize: 150,
};

// Dibuja cada uno de los puntos de los dados
const atQuarter = game.dadoSize * 0.25;
const atHalf = game.dadoSize * 0.5;
const at3Quarter = game.dadoSize * 0.75;
const radius = game.dadoSize * 0.1;

// Llamo a la funcion inicia el juego
initGame();

// Esta funcion la llamo cuando inicia el juego
function initGame() {
  // A la propiedad turno del obj juego, le asigno un número al azar que va estar entre 0 y la cantidad de jugadores
  game.turno = nroAlAzar(0, game.cantJugadores - 1);
  // Vacia la tabla de puntajes accediendo a cada uno de los juegos y los recorre con un forEach
  ["1", "2", "3", "4", "5", "6", "E", "F", "P", "G", "D", "T"].forEach(
    (key) => {
      // A cada uno de los juegos le paso la funcion iniciar puntaje
      game.puntos[key] = iniPuntaje(key);
    }
  );
  // Pongo todos los dados en 0
  game.dados = [0, 0, 0, 0, 0];
  // Pongo los tiros 0
  game.tiros = 0;
  // Pongo los tiros totales en 0
  game.tirosTotales = 0;
  // Pongo todos los dados seleccionados en false
  game.seleccionados = [false, false, false, false, false];
  // Llamo a la funcion para mostrar el tiro
  mostrarTurno();
  // Llamo a la funcion que dibuja la tabla de puntos
  dibujarTablaPuntos();
}

// Funcion que inica el puntaje poniendolo a cada uno en 0
function iniPuntaje(queJuego) {
  const puntaje = [];
  for (let i = 0; i < game.cantJugadores; i++) {
    puntaje.push(queJuego === "T" ? 0 : -1);
  }
  return puntaje;
}

function tirarDados() {
  if (game.tiros === 0) {
    game.seleccionados = [true, true, true, true, true];
  }
  for (let i = 0; i < 5; i++) {
    if (game.seleccionados[i]) {
      // si
      game.dados[i] = nroAlAzar(1, 6);
    }
  }
  game.seleccionados = [false, false, false, false, false];
  game.tiros++;
  if (game.tiros === 3) {
    document.getElementById("tirarDados").onclick = () =>
      mostrarModal("¡Hey!", "Tenes que anotarte un punto");
  }
  mostrarTurno();
}

function seleccionar(dado) {
  const i = Number(dado.getAttribute("data-pos"));
  game.seleccionados[i] = !game.seleccionados[i];
  if (game.seleccionados[i]) {
    dado.classList.add("seleccionado");
  } else {
    dado.classList.remove("seleccionado");
  }
}

// Esta funcion le paso un minimo y un maximo y me va a devolver un número al azar entre esos parametros
function nroAlAzar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Funcion que llama a un span del HTML y le pasa el numero de tiros que como maximo son 3
function mostrarTurno() {
  document.querySelector("#tiros span").innerHTML = game.tiros;
}

function mostrarDados() {
  const cont = document.getElementById("dados");
  cont.innerHTML = null;
  for (let i = 0; i < 5; i++) {
    cont.appendChild(mostrarDado(i, game.dados[i]));
  }
}

const mostrarDado = (i, numero) => {
  let dado = document.createElement("canvas");
  dado.classList.add("dado");
  dado.setAttribute("data-pos", "" + i);
  dado.setAttribute("width", "" + game.dadoSize);
  dado.setAttribute("height", "" + game.dadoSize);
  dado.style.borderRadius = game.dadoSize / 100 + "em";
  dado.style.margin = game.dadoSize / 200 + "em";
  dibujarDado(dado, numero);
  dado.onclick = () => {
    seleccionar(dado);
  };
  return dado;
};

function dibujarDado(cont, numero) {
  let ctx = cont.getContext("2d");

  //Borro
  ctx.clearRect(0, 0, game.dadoSize, game.dadoSize);

  //Dado
  ctx.beginPath();
  ctx.rect(0, 0, game.dadoSize, game.dadoSize);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
  //Puntitos de acuerdo al parámetro numero
  switch (numero) {
    case 1:
      dibujarCirculo(ctx, atHalf, atHalf);
      break;

    case 2:
      dibujarCirculo(ctx, at3Quarter, atQuarter);
      dibujarCirculo(ctx, atQuarter, at3Quarter);
      break;

    case 3:
      dibujarCirculo(ctx, at3Quarter, atQuarter);
      dibujarCirculo(ctx, atQuarter, at3Quarter);
      dibujarCirculo(ctx, atHalf, atHalf);
      break;

    case 4:
      dibujarCirculo(ctx, at3Quarter, atQuarter);
      dibujarCirculo(ctx, atQuarter, at3Quarter);
      dibujarCirculo(ctx, atQuarter, atQuarter);
      dibujarCirculo(ctx, at3Quarter, at3Quarter);
      break;

    case 5:
      dibujarCirculo(ctx, at3Quarter, atQuarter);
      dibujarCirculo(ctx, atQuarter, at3Quarter);
      dibujarCirculo(ctx, atQuarter, atQuarter);
      dibujarCirculo(ctx, at3Quarter, at3Quarter);
      dibujarCirculo(ctx, atHalf, atHalf);
      break;

    case 6:
      dibujarCirculo(ctx, at3Quarter, atQuarter);
      dibujarCirculo(ctx, atQuarter, at3Quarter);
      dibujarCirculo(ctx, atQuarter, atQuarter);
      dibujarCirculo(ctx, at3Quarter, at3Quarter);
      dibujarCirculo(ctx, atQuarter, atHalf);
      dibujarCirculo(ctx, at3Quarter, atHalf);
      break;
  }
}

// Esta función anota el puntaje cuando hago click en la celda de la tabla
function anotarPuntaje(queJuego) {
  // Si el puntaje dentro de ese juego dentro de ese jugador es distinto a menos -1
  if (game.puntos[queJuego][game.turno] !== -1) {
    // Va a llamar a la funcion mostrar modal y le va a pasar el titulo y el mensaje
    mostrarModal(
      "Juego ya anotado",
      "¡No se puede volver a anotar '" + queJuego + "'!"
    );
  }
  // Si no se cumple esta condicion, es decir, que el puntaje dentro de ese juego de ese jugador es -1 por lo tanto esta vacio y lo puedo usar
  else {
    // Va crear la constante puntaje y le va a pasar la funcion para calcular el puntaje que recibe el juego
    const puntaje = calcularPuntaje(queJuego);
    // ...............................................
    if (puntaje === 0) {
      const aceptado = confirm(
        "¿Seguro que queres tacharte '" + queJuego + "'?"
      );
      if (aceptado) {
        if (queJuego === "G" && game.puntos["D"][game.turno] !== 0) {
          mostrarModal("¡Ojo!", "Primero debe tacharse la Doble Generala (D)");
        } else {
          game.puntos[queJuego][game.turno] = 0;
          cambiarTurno();
        }
      }
    } else {
      if (queJuego === "D" && game.puntos["G"][game.turno] !== 50) {
        mostrarModal("¡Ojo!", "Primero debe anotarse la Generala (G)");
      } else {
        game.puntos[queJuego][game.turno] = puntaje;
        game.puntos["T"][game.turno] += puntaje;
        cambiarTurno();
      }
    }
  }
}

function cambiarTurno() {
  game.tiros = 0;
  game.dados = [];
  game.seleccionados = [];
  game.turno++;
  if (game.turno > game.cantJugadores - 1) {
    game.turno = 0;
  }
  document.getElementById("tirarDados").onclick = () => tirar();

  mostrarTurno();
  mostrarDados();
  dibujarTablaPuntos();

  game.tirosTotales++;
  if (game.tirosTotales === 11 * game.cantJugadores) {
    gameOver();
  }
}

function dibujarCirculo(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#872072";
  ctx.fill();
  ctx.closePath();
}

function tirar() {
  tirarDados();
  mostrarDados();
}

// Esta funcion dibuja la tabla
function dibujarTablaPuntos() {
  // Guardo en la constante trEncabezado el tr del encabezado de la tabla
  const trEncabezado = document.querySelector("#puntajes thead tr");
  // Adentro del tr del encabezado un th que dice Juego
  trEncabezado.innerHTML = "<th>Juego</th>";

  // Hace un for que en base a la cantidad de jugadores va hacer lo que esta adentro
  for (let i = 0; i < game.cantJugadores; i++) {
    // Guarda en una const un elemento th nuevo, es decir lo crea desde 0
    const thJugador = document.createElement("th");
    // Adentro del th va a poner una J de jugador mas el número si es el 1 o el 2
    thJugador.innerHTML = "J" + (i + 1);
    // Al tr del encabeza le va a meter el th del jugador
    trEncabezado.appendChild(thJugador);
  }

  // Guardo el body de la tabla en una const
  const tbody = document.querySelector("#puntajes tbody");
  // Va a vaciar todo lo que este adentro del tbody de la tabla
  tbody.innerHTML = null;

  // Con cada uno de los juegos, va a hacer un forEach que le va a pasar todo esto
  ["1", "2", "3", "4", "5", "6", "E", "F", "P", "G", "D", "T"].forEach(
    // Por cada uno de los juegos va a
    (key) => {
      // Crea un elemento tr y lo guarda dentro de una const
      const trJuego = document.createElement("tr");
      // Crea un elemento td y lo guarda dentro de una const
      const tdJuego = document.createElement("td");
      // Al tdJuego le va a pasar la key, es decir el nombre del juego
      tdJuego.innerHTML = key;
      // Adentro del tr le menete el trJuego
      trJuego.appendChild(tdJuego);
      // Hace un for que recorre otra vez la cantidad de jugadores
      for (let i = 0; i < game.cantJugadores; i++) {
        // Crear un td y lo va a guardar en una const
        const tdJugador = document.createElement("td");
        // Va a guardar el puntaje en una const
        const puntajeJuego = game.puntos[key][i];
        // Al tdJugar le va a meter adentro el puntaje del juego
        tdJugador.innerHTML =
          // Si el puntaje del juego es -1 lo deja vacio, si el puntaje del juego es 0 le va a pasar una X
          // Si el puntaje no es ni -1 ni 0, le va a pasar el puntaje
          puntajeJuego === -1 ? "-" : puntajeJuego === 0 ? "X" : puntajeJuego;
        // Adentro del trJuego le va a meter el tdJugador
        trJuego.appendChild(tdJugador);
      }
      // Hago un condicional que si la key es distinta a T
      if (key != "T") {
        // En el trJuego vas a meter un onclick de la funcion anotarPuntaje que a su vez le paso la key
        trJuego.onclick = () => anotarPuntaje(key);
      }
      // En el tBody de la tabla le voy a meter todo esto de recien
      tbody.appendChild(trJuego);
    }
  );

  Array.from(
    document.querySelectorAll("#puntajes thead th, #puntajes tbody td")
  ).forEach((celda) => celda.classList.remove("turnoActual"));

  document
    .querySelector("#puntajes thead th:nth-of-type(" + (game.turno + 2) + ")")
    .classList.add("turnoActual");
  Array.from(
    document.querySelectorAll(
      "#puntajes tbody td:nth-of-type(" + (game.turno + 2) + ")"
    )
  ).forEach((celda) => celda.classList.add("turnoActual"));
}

// Esta función calcula el puntaje al hacer click en la celda y recibe como parametro el juego al cual le va a tener que calcular
function calcularPuntaje(queJuego /*1 2 3 4 5 6 E F etc*/) {
  // Va a crear una constante para copiar el array con los resultados de los dados
  // Llama a la funcion copyArray y le pasa como parametro el array de los dados y le va a pasar un sort para ordenarlos
  const dadosCopia = copyArray(game.dados).sort();
  // El switch va a recibir un parametro que va a ser el case
  switch (queJuego) {
    // Si queJuego (que es el parametro) es escalera
    case "E":
      // Va a pasar la función para validar el puntaje y calcularlo, y va a calcular la cantidad de tiros para poner el puntaje correspondiente
      return esEscalera(dadosCopia) ? (game.tiros === 1 ? 25 : 20) : 0;
    // Vuelve a hacer todo lo mismo con cada uno de los casos para cada juego
    case "F":
      return esFull(dadosCopia) ? (game.tiros === 1 ? 35 : 30) : 0;
    case "P":
      return esPoker(dadosCopia) ? (game.tiros === 1 ? 45 : 40) : 0;
    case "G":
      return esGenerala(dadosCopia) ? 50 : 0;
    case "D":
      return esGenerala(dadosCopia) ? 100 : 0;
    // El default lo que hace es el case si el parametro no corresponde a ningun de los anteriores
    default:
      // Va a llamar a la funciona puntajeNumeros y le va a pasar el juego pero como es un numero en un string, con number lo transformo a un numero
      return puntajeNumeros(Number(queJuego));
  }
}

// Esta es la funcion que va a llamar el switch de calcularPuntaje en caso de que no corresponda a ningun juego y si a un numero
// Recibe como parametro un numero
function puntajeNumeros(numero) {
  // Va a declarar una variable puntaje como 0
  let puntaje = 0;
  // Esto va a sumar los puntos correspondientes al numero del dado que sea igual la numero del juego
  for (let i = 0; i < 5; i++) {
    if (game.dados[i] === numero) {
      puntaje += numero;
    }
  }
  // Y devuelve el puntaje
  return puntaje;
}

// Esta funcion valida si es escalera
function esEscalera(dados) {
  return /12345|23456|13456/.test(dados.join(""));
}

// Esta funcion valida si es generala
function esGenerala(dados) {
  return /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/.test(dados.join(""));
}

// Esta funcion valida si es poker
function esPoker(dados) {
  return /1{4}[2-6]|12{4}|13{4}|14{4}|15{4}|16{4}|2{4}[3-6]|23{4}|24{4}|25{4}|26{4}|3{4}[4-6]|34{4}|35{4}|36{4}|4{4}[5-6]|45{4}|46{4}|5{4}6|56{4}/.test(dados.join(""));

}

// Esta funcion valida si es full
function esFull(dados) {
  return /^1{2}([2-6])\1{2}$|^1{3}([2-6])\2{1}$|^2{3}([3-6])\3{1}$|^2{2}([3-6])\4{2}$|^3{3}([4-6])\5{1}$|^3{2}([4-6])\6{2}$|^4{3}([5-6])\7$|^4{2}([5-6])\8{2}$|^5{3}6{2}$|^5{2}6{3}$/gm.test(
    dados.join("")
  );
}

document.addEventListener("deviceready", onDeviceReady, false);

// Esta funcion hace que cuando se inicia la app
function onDeviceReady() {
  // Va a llamar a la funcion para iniciar el juego
  initGame();
}

// Esta funcion copia un array
// El slice devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
function copyArray(a) {
  return a.slice();
}

// Funcion para cuando termina el juego, es decir se completan todas las celdas
function gameOver() {
  let mensaje = "Juego terminado";
  const totales = game.puntos["T"];
  if (allEqual(totales)) {
    mostrarModal("Juego terminado", "Empate");
  } else {
    mostrarModal(
      "Juego terminado",
      "gano el jugador " + (totales.indexOf(Math.max(...totales)) + 1)
    );

    document.getElementById("tirarDados").setAttribute("disabled", "disabled");
  }
  const allEqual = (arr) => arr.every((val) => val === arr[0]);

  // Funcion que muestra un modal con el titulo y mensaje que recibe en los parametros
  function mostrarModal(titulo, mensaje) {
    // Crea una varibale modal donde guarda el modal que lo llama desde el html
    var modal = document.getElementById("modal");
    // Selecciona el H2 dentro del modal y le mete el parametro titulo adentro
    modal.querySelector("h2").innerHTML = titulo;
    // Selecciona el p dentro del modal y le mete el parametro mensaje adentro
    modal.querySelector("p").innerHTML = mensaje;
    // Le agraga un displey flex la modal porque seguramente desde css tienen un display none para no mostrarlo
    modal.style.display = "flex";
  }
}
