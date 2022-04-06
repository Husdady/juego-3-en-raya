'use strict';

// Guardar un dato en Local storage
function setKeyToLocalStorage(key, value) {
	if (!isString(key) || !key || !value) return;

	const valueToStringify = JSON.stringify(value);
	return localStorage.setItem(key, valueToStringify);
}

// Obtener un dato guardado por medio de una key de Local Storage
function getKeyFromLocalStorage(key) {
	if (!isString(key) || !key) return;

	const key_saved = localStorage.getItem(key);
	return JSON.parse(key_saved);
}