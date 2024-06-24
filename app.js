let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados =[]; //donde almacenaremos los números secretos ya sorteados
let numeroMaximo = 10;

console.log(numeroSecreto);

function asignarTextoElemento(elemento,texto){ //elemento: elemento a cambiar; texto: texto a mostrar
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML=texto;
    return;
}

// función que captura lo que el usuario colocó
function verificarIntento(){
    let numeroDeUsuario =parseInt(document.getElementById("valorUsuario").value);

    if (numeroDeUsuario === numeroSecreto){
        //el usuario acertó
        asignarTextoElemento('p',`¡Acertaste al número secreto en ${intentos} ${intentos == 1? "intento": "intentos"}!`);
        document.getElementById('reiniciar').removeAttribute("disabled");
    } else{
        // el usuario no acertó
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor');
        } else{
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

// función que limpia caja blanca si usuario no acerta
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    //si ya sorteamos todos los números
    if(listaNumerosSorteados.length==numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else{
         // si el número Generado ya está en la lista de números sorteados, generamos otro
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}: `);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    limpiarCaja(); //limpiamos caja donde usuario va a meter sus intentos
    condicionesIniciales(); //indicamos mensaje de intervalo de números e inicializar el número de intentos y genera nuevo número secreto
    document.querySelector('#reiniciar').setAttribute('disabled','true');//deshabilitar el botón del "nuevo juego"
}

condicionesIniciales();
