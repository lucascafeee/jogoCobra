var obstaculo;
var obsX = [];
var obsY = [];



var tela;
var ctx;

var cabeca;
var maca;
var bola;

var pontos;
var maca_x;
var maca_y;

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
var noJogo = true;    

const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMO = 29;
const ATRASO = 140;
const C_ALTURA = 300;
const C_LARGURA = 300;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

var scoreNoJogo = 0;
// MUSICA
const musicaDeFundo = new Audio();
musicaDeFundo.src = "./music.mp3";
onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla



document.getElementById("tela").style.display = "none";
document.getElementById("jogarBotao").addEventListener("click", () =>{
    document.getElementById("tela").style.display = "block"
    document.getElementById("jogarBotao").style.display = "none";

    iniciar(); // Chama função inicial do jogo
});


// Definição das funções

    var canvas = document.getElementById("tela")
    canvas.addEventListener("click", () => {
        musicaDeFundo.play();
    }); 

    

function iniciar() {

    nomeJogador = prompt("INSIRA O NOME DO PLAYER!");

    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

    musicaDeFundo.play();

    carregarImagens();
    criarCobra();
    localizarObstaculo();
    localizarMaca();
    setTimeout("cicloDeJogo()", ATRASO);
}    

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "cabeca.png";    
    
    bola = new Image();
    bola.src = "ponto.png"; 
    
    maca = new Image();
    maca.src = "maca.png"; 

    obstaculo = new Image();
    obstaculo.src = "cabeca.png"
}

function criarCobra() {
    pontos = 3;
	
    for (var z = 0; z < pontos; z++) {
        x[z] = 50 - z * TAMANHO_PONTO;
        y[z] = 50;
    }
}

function localizarMaca() {
    var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    maca_x = r * TAMANHO_PONTO;

    r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    maca_y = r * TAMANHO_PONTO;
}    


    function localizarObstaculo(){
        var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
        obsX.push(r * TAMANHO_PONTO)
    
        r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
        obsY.push(r * TAMANHO_PONTO)
    }

function cicloDeJogo() {
    if (noJogo) {
        verificarObstaculo();
        verificarMaca();
        verificarColisao();
        mover();
        fazerDesenho();
        setTimeout("cicloDeJogo()", ATRASO);
    }
}

function verificarMaca() {
    if ((x[0] == maca_x) && (y[0] == maca_y)) {
        pontos++;
        scoreNoJogo = scoreNoJogo + 100;
        console.log(scoreNoJogo);
        localizarObstaculo();
        localizarMaca();
    }
}    


    function verificarObstaculo(){
       for(let i = 0; i < obsX.length; i++) {
        if((x[0] == obsX[i]) && (y[0] == obsY[i])) {
            noJogo = false;
        }
       }
    }

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
    }

    if (y[0] >= C_ALTURA) {
        noJogo = false;
    }

    if (y[0] < 0) {
       noJogo = false;
    }

    if (x[0] >= C_LARGURA) {
      noJogo = false;
    }

    if (x[0] < 0) {
      noJogo = false;
    }
}

function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z-1];
        y[z] = y[z-1];
    }

    if (paraEsquerda) {
        x[0] -= TAMANHO_PONTO;
    }

    if (paraDireita) {
        x[0] += TAMANHO_PONTO;
    }

    if (paraCima) {
        y[0] -= TAMANHO_PONTO;
    }

    if (paraBaixo) {
        y[0] += TAMANHO_PONTO;
    }
}    

function fazerDesenho() {
    ctx.clearRect(0, 0, C_LARGURA, C_ALTURA);
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);
	
    if (noJogo) {
        ctx.drawImage(maca, maca_x, maca_y);
		for(let i = 0; i < obsX.length; i++){
            ctx.drawImage(obstaculo, obsX[i], obsY[i])
        }
        for (var z = 0; z < pontos; z++) {
            if (z == 0) {
                ctx.drawImage(cabeca, x[z], y[z]);
            } else {
                ctx.drawImage(bola, x[z], y[z]);
            }
        }    
    } else {
        fimDeJogo();
    }        
}

function fimDeJogo() {
    musicaDeFundo.pause();
    musicaDeFundo.currentTime = 0;
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 18px serif";
    ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
}

function verificarTecla(e) {
    var tecla = e.keyCode;

    if ((tecla == TECLA_ESQUERDA) && (!paraDireita)) {
        paraEsquerda = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_DIREITA) && (!paraEsquerda)) {
        paraDireita = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_ACIMA) && (!paraBaixo)) {
        paraCima = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if ((tecla == TECLA_ABAIXO) && (!paraCima)) {
        paraBaixo = true;
        paraDireita = false;
        paraEsquerda = false;
    }        
}
