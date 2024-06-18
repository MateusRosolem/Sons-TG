
src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"

document.addEventListener('DOMContentLoaded', (event) => {
    const audios = document.querySelectorAll('audio');

    audios.forEach(audio => {
        audio.addEventListener('play', () => {
            audios.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
        });
    });
});



function adicionarComentario() {
    const comentarioInput = document.getElementById('comentarioInput');
    const comentario = comentarioInput.value.trim();

    if (comentario) {
        // Adiciona o comentário à lista
        adicionarComentarioNaLista(comentario);

        // Salva o comentário no localStorage
        salvarComentarioNoLocalStorage(comentario);

        // Limpa o campo de entrada
        comentarioInput.value = '';
    }
}

function adicionarComentarioNaLista(comentario) {
    const listaComentarios = document.getElementById('listaComentarios');
    const novoComentarioLi = document.createElement('li');
    novoComentarioLi.className = 'commentLi';
    novoComentarioLi.textContent = comentario;
    listaComentarios.appendChild(novoComentarioLi);
}

function salvarComentarioNoLocalStorage(comentario) {
    let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.push(comentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function carregarComentariosDoLocalStorage() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.forEach(comentario => {
        adicionarComentarioNaLista(comentario);
    });
}

// Carrega os comentários quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarComentariosDoLocalStorage);


function filterAudios() {
    var input = document.getElementById('searchBar').value.toUpperCase();
    var audioDivs = document.getElementsByClassName('audioDiv');
    for (var i = 0; i < audioDivs.length; i++) {
        var h1 = audioDivs[i].getElementsByTagName('h1')[0];
        if (h1.innerHTML.toUpperCase().indexOf(input) > -1) {
            audioDivs[i].style.display = "";
        } else {
            audioDivs[i].style.display = "none";
        }
    }
}



// function downloadAudio() {
//     const url = document.getElementById('youtubeUrl').value;
//     axios.post('/download', { url: url })
//         .then(response => {
//             const audioContainer = document.getElementById('audioContainer');
//             audioContainer.innerHTML = response.data.html_button;
//         })
//         .catch(error => {
//             console.error('There was an error downloading the audio!', error);
//         });
// }


