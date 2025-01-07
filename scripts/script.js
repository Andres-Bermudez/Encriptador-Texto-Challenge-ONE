// Variables para acceder a los elementos HTML desde JavaScript.
let textoIngresado = document.getElementById("textoIngresado");
let botonEncriptar = document.getElementById("botonEncriptar");
let botonDesencriptar = document.getElementById("botonDesencriptar");
let botonCopiar = document.getElementById("botonCopiar");
let botonPegar = document.getElementById("botonPegar");
let imagenResultado = document.getElementById("imagenResultado");
let tituloResultado = document.getElementById("tituloResultado");
let mensajeEncriptado = document.getElementById("mensajeEncriptado");

let texto = "";
let caracteres = /[^a-zñ\s]/; // Expresion regular.

// Funcion para verificar si el area de texto esta vacia o si contiene caracteres especiales.
function verificarTexto() {
    texto = textoIngresado.value; // Para capturar el texto que esta en el textarea.

    if (texto.trim() === "") {
        alert("Debes ingresar un texto...");

    } else if (caracteres.test(texto)) {
        alert("¡Recuerda solo usar letras minúsculas y sin acentos!");

    } else {
        // Modificacion de la zona de resultado.
        imagenResultado.style.display = "none";
        tituloResultado.innerHTML = "Mensaje Encriptado:";
    }
}

// Funcion para encriptar el texto ingresado por el usuario.
function encriptarTexto() {
    verificarTexto();

    // Para convertir el texto ingresado en un arreglo de caracteres individuales.
    let arreglo = texto.split("");

    for (i = 0; i < arreglo.length; i++) {

        // Se recorre el arreglo generado y se verifica si existen vocales, 
        // y las cambia segun las llaves de encriptacion.
        if (arreglo[i] === "a") {
            arreglo[i] = "ai";

        } else if (arreglo[i] === "e") {
            arreglo[i] = "enter";

        } else if (arreglo[i] === "i") {
            arreglo[i] = "imes";

        } else if (arreglo[i] === "o") {
            arreglo[i] = "ober";

        } else if (arreglo[i] === "u") {
            arreglo[i] = "ufat";
        }
    }

    // Se vuelve a generar una cadena de caracteres(String) y se muestra en pantalla.
    texto = arreglo.join("");
    mensajeEncriptado.innerHTML = texto;
    limpiar();
}

// Funcion para desencriptar el texto.
function desencriptarTexto() {
    verificarTexto();

    let textoDesencriptado = textoIngresado.value;

    // Para reemplazar las subcadenas segun las llaves de encriptacion.
    textoDesencriptado = textoDesencriptado.replace(/ai/g, "a");
    textoDesencriptado = textoDesencriptado.replace(/enter/g, "e");
    textoDesencriptado = textoDesencriptado.replace(/imes/g, "i");
    textoDesencriptado = textoDesencriptado.replace(/ober/g, "o");
    textoDesencriptado = textoDesencriptado.replace(/ufat/g, "u");
    
    tituloResultado.innerHTML = "Mensaje desencriptado:";
    mensajeEncriptado.innerHTML = textoDesencriptado;
    limpiar();
}

function copiar() {
    texto = mensajeEncriptado.textContent;

    if (texto === "Ingresa el texto que desees encriptar o desencriptar...") {
        alert("No hay nada que copiar!");

    } else {
        // API para copiar texto al portapapeles.
        navigator.clipboard.writeText(texto)
                .then(function() {
                    
                })
                .catch(function(err) {
                    console.error('Error al copiar texto al portapapeles: ', err);
                    alert('Error al copiar texto al portapapeles.');
                });

        botonPegar.style.display = "flex";
    }
}

function pegar() {
    // API para pegar desde el portapapeles.
    navigator.clipboard.readText()
                .then(textoPegado => {
                    textoIngresado.value += textoPegado;
                })
                .catch(err => {
                    console.error('Error al pegar desde el portapapeles: ', err);
                    alert('Error al pegar desde el portapapeles.');
                });

    botonPegar.style.display = "none";
}

// Funcion limpiar el textarea.
function limpiar() {
    let nuevoTexto = "";
    textoIngresado.value = nuevoTexto;
}

// LLamado a las funciones, estan a la espera de eventos("click").
botonEncriptar.addEventListener("click", encriptarTexto);
botonDesencriptar.addEventListener("click", desencriptarTexto);
botonCopiar.addEventListener("click", copiar);
botonPegar.addEventListener("click", pegar);