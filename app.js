let listaDeNumerosChutado = [];
let listaDenumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Web Speech API não suporta nesse navegador');
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    let numeroEscolhidoUser = chute;
    console.log(listaDeNumerosChutado);

    if (chute === numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Esse mama na égua descobriu o número secreto com ${tentativa} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        listaDeNumerosChutado = [];
    } else {
        if (chute < 1 || chute > 10) {
            exibirTextoNaTela('p', 'O chute não está entre 1 e 10. Jogue novamente!');
            limparCampo();
        } else {
            if (listaDeNumerosChutado.includes(numeroEscolhidoUser)) {
                exibirTextoNaTela('p', 'Você já chutou esse número.');
                limparCampo();
            } else {
                listaDeNumerosChutado.push(numeroEscolhidoUser);
                if (chute > numeroSecreto) {
                    exibirTextoNaTela('p', 'O número secreto é menor!');
                } else {
                    exibirTextoNaTela('p', 'O número secreto é maior!');
                }
                tentativa++;
                limparCampo();
            }
        }
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementoNaLista = listaDenumerosSorteados.length;

    if (quantidadeDeElementoNaLista === numeroLimite) {
        listaDenumerosSorteados = [];
    }

    if (listaDenumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDenumerosSorteados.push(numeroEscolhido);
        //console.log(listaDenumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function verificarRegra(chuteUser) {
    if (chuteUser < 1 || chuteUser > 10) {
        exibirTextoNaTela('p', 'O chute não está entre 1 e 10. Jogue novamente!');
        limparCampo();
    }
}
