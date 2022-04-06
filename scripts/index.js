'use strict';

var USER_KEY = "username";
let isPlaying = false;
let gameFinished = false;
let delayForUserResponse = false;
let responses = [];
const positionsForWin = {
	case1: [0, 1, 2],
	case2: [3, 4, 5],
	case3: [6, 7, 8],
	case4: [0, 3, 6],
	case5: [1, 4, 7],
	case6: [2, 5, 8],
	case7: [0, 4, 8],
	case8: [2, 4, 6],
}

// Obtener el nombre del usuario
function getUsername() {
	const username = document.getElementById("username");
	return username;
}

// Obtener botones
function getButtons() {
	const buttons = [...document.querySelectorAll(".tab")];
	return buttons;
}

// Iniciar música de fondo
function initBackgroundMusic() {
	const backgroundMusic = document.getElementById("background-music");
	backgroundMusic.play();
}

// Crear ficha
function createFicha(color) {
	const newFicha = document.createElement("img");
	newFicha.className = "ficha";

	if (color === "red") {
		newFicha.src = "./img/ficha-roja.png";
	} else {
		newFicha.src = "./img/ficha-negra.png";
	}

	return newFicha;
}

// Crear una respuesta aleatoria del bot
function createAleatoryResponse(arr){
	const arrCopy = [...arr];

  for(let i = arrCopy.length - 1; i > 0; i--){
     let j = Math.floor( Math.random() * (i + 1) );
     [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
}

// Respuesta del bot
function botResponse() {
	if (winUser) return;

	const buttons = getButtons();
	const possiblesResponses = [];

	// Iterar botones
	buttons.forEach((button, i) => {
		// Comprobar si el botón contiene ya una ficha
		const existUserResponse = button.hasChildNodes();

		// Si no contiene una ficha, es porque existe un lugar disponible para marcar
		if (!existUserResponse) {
			possiblesResponses.push({
				index: i,
				button: button,
			});
		}
	});

	// Obtener una respuesta aleatoria
	const aleatoryResponse = createAleatoryResponse(possiblesResponses);

	if (isEmptyArray(aleatoryResponse)) {
		return alert("A sido un empate!");
	}

	// Crear nueva ficha
	const newFicha = createFicha("red");

	const { index, button } = aleatoryResponse[0];

	// Mostrar la respuesta del bot en el tricki
	button.appendChild(newFicha);

	responses.push({
		isUser: false,
		position: index,
	});

	const botWin = verifyIfBotWin();

	if (botWin) {
		alert('El bot gana');
		gameFinished = true;
	}

	setTimeout(() => {
		delayForUserResponse = false;
	}, 2000);
}

// Comprobar si el usuario a ganado;
function verifyIfUserWin() {
	let userWin = false;
	const userResponses = responses.filter((response) => response.isUser);

	const positionKeys = Object.keys(positionsForWin);

	positionKeys.forEach((key) => {
		const cases = positionsForWin[key];
		let count = 0; 

		cases.forEach((casePosition) => {
			const match = userResponses.find((userResponse) => userResponse.position === casePosition);

			if (match) count += 1;
			if (count === 3) userWin = true;
		});
	});

	return userWin;
}

// Comprobar si el usuario a ganado;
function verifyIfBotWin() {
	let botWin = false;
	const botResponses = responses.filter((response) => !response.isUser);

	const positionKeys = Object.keys(positionsForWin);

	positionKeys.forEach((key) => {
		const cases = positionsForWin[key];
		let count = 0; 

		cases.forEach((casePosition) => {
			const match = botResponses.find((botResponse) => botResponse.position === casePosition);

			if (match) count += 1;
			if (count === 3) botWin = true;
		});
	});

	return botWin;
}

// Evento 'click' en los botones para mostrar una ficha
function onPressButton(e, button, index) {
	if (winUser || winBot) {
		alert("La partida ha finalizado");
	}

	if (!isPlaying) {
		alert("Debes iniciar el juego, pulsando el botón \"Jugar!\" ");
		return false;
	}

	if (button.hasChildNodes()) return;
	if (delayForUserResponse) {
		alert("Aún no es tu turno!")
		return false;
	};

	// Guardar respuesta de usuario
	responses.push({
		isUser: true,
		position: index,
	});

	const newFicha = createFicha();

	// Agregar respuesta de usuario
	button.appendChild(newFicha);

	delayForUserResponse = true;

	const userWin = verifyIfUserWin();

	if (userWin) {
		const username = getUsername();
		alert(`El usuario ${username.value} gana`);
		gameFinished = true;
	}

	// Esperar respuesta de usuario
	setTimeout(botResponse, 1000);
}

// Evento click en botones
function handleButtonsOnclick() {
	const buttons = getButtons();
	
	buttons.forEach((button, i) => {
		button.onclick = function(e) {
			if (gameFinished) {
				alert("El juego ha finalizado")
				return false;
			}

			onPressButton(e, button, i);
		};
	});
}

// Evento 'click' en botón jugar
function onPlay() {
	const { value } = getUsername();
	const isEmptyValue = isEmptyString(value);
	const minValue = isLessThan({ value: value, min: 2 });
	const maxValue = isGreaterThan({ value: value, max: 30 });

	// Si no es un nombre de usuario válido
	if (isEmptyValue || minValue || maxValue) {
		alert("Necesitas proporcionar un nombre de usuario válido!")
		return false;
	};

	alert("A jugar!, Diviérte");

	isPlaying = true;

	// Guardar key en localstorage
	setKeyToLocalStorage(USER_KEY, value);

	// Iniciar musica de fondo
	initBackgroundMusic();
}

// Inicializar juego
function initGame() {
	// Obtener el nombre del usuario
	const username = getUsername(); 

	// Obtener botón play
	const playButton = document.getElementById("play");

	// Obtener key de localstorage
	const username_saved = getKeyFromLocalStorage(USER_KEY);

	// Evento click en cada boton para mostrar las fichas
	handleButtonsOnclick();

	// Si existe un valor guardado en localstorage, asignarlo al nombre de usuario
	if (username_saved) {
		username.value = username_saved;
	}

	// Evento click en boton play
	playButton.onclick = onPlay;
}

window.onload = initGame;
