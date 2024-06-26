let musicas = [
    {titulo:'Thinkin Bout You' , artista : 'Frank ocean', src: 'music/frankocean.mp3', img :'img/frank.jpg'},
    {titulo:'Friday' , artista : 'The cure', src: 'music/thecure.mp3', img :'img/thecure.jpg'},
    {titulo:'1979' , artista : 'The smashing pumpkins', src: 'music/thesmashingpumpkins.mp3', img :'img/smashing.jpg'},  
];

let musica = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

document.querySelector('.botao-play').addEventListener('click', tocarmusica);

document.querySelector('.botao-pause').addEventListener('click', pausarmusica)

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
    tocarmusica();
    exibirProximaMusica();
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarmusica();
    exibirProximaMusica();
});

function renderizarMusica(index){
    musica.setAttribute('src',musicas[index].src);
    musica.addEventListener('loadeddata',() => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
    exibirProximaMusica();
}

function tocarmusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarmusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos( Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinuto = Math.floor(segundos / 60);
    let campoSegundo = segundos % 60;

    if(campoSegundo < 10){
        campoSegundo = '0' + campoSegundo;
    }

    return campoMinuto+':'+campoSegundo;
}

function exibirProximaMusica() {

    let imagemProximaMusica = document.querySelector(".imagemProximaMusica");
    let nomeProximaMusica = document.querySelector(".proximaMusica");

    let proxima = indexMusica + 1;
    if (proxima >= musicas.length) {
        proxima = 0;
    }

    let nomeProxima = musicas[proxima].titulo;
    let nomeArtista = musicas[proxima].artista;
    let imagem = musicas[proxima].img;
    
    imagemProximaMusica.src = imagem;
    nomeProximaMusica.innerHTML = `Próxima música : 
    <img id="imgProxima" src="${imagem}" alt="Imagem da próxima música"> 
    ${nomeProxima} - ${nomeArtista}`;

}

