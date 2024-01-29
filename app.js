//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10: ';
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
let chute;  // Declare chute as a global variable

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

exibirTextoTela('h1','Jogo do Número secreto');
exibirTextoTela('p','Escolha um número entre 1 e 10: ');

function verificarChute(){
    chute = document.querySelector('input').value; // Use the global variable chute

    if(chute == numeroSecreto){
        exibirTextoTela('h1','acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        tentativas++;
        exibirTextoTela('p',`você descobriu o número secreto com ${tentativas} ${palavraTentativa}!!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoTela('p','O número secreto é menor que');
        } else{
            exibirTextoTela('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();
        exibirTextoTela('h1',`Você gastou ${tentativas} ${palavraTentativa} `);
    }
}

function exibirMensagemInicial(){
    exibirTextoTela('h1','Jogo do Número secreto');
    exibirTextoTela('p','Escolha um número entre 1 e 10: ');
}


function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if(quantidadeElementosLista == 9){
        listaNumerosSorteados = []
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    // Use the global variable chute
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    exibirMensagemInicial()
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}