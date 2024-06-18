
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


var audio = document.getElementById('Atencao');
var progress = document.getElementById('progressAtencao');
audio.ontimeupdate = function () {
    var percentage = (audio.currentTime / audio.duration) * 100;
    progress.value = percentage;
};

function adicionarComentario() {
    var comentario = document.getElementById('comentarioInput').value.trim();
    if (comentario !== '') {
        $.ajax({
            type: 'POST',
            url: '/comentario',
            contentType: 'application/json',
            data: JSON.stringify({ comentario: comentario }),
            success: function (response) {
                var novoComentario = response.comentario;
                var listaComentarios = document.getElementById('listaComentarios');
                var novoItem = document.createElement('li');
                novoItem.innerHTML = `${novoComentario} <button class="commentButton" onclick="removerComentario(event)">Remover</button>`;
                listaComentarios.appendChild(novoItem);
                document.getElementById('comentarioInput').value = '';
            },
            error: function (error) {
                console.error('Erro ao adicionar comentário:', error);
            }
        });
    }
}

// Função para remover comentário via AJAX
function removerComentario(event) {
    var listItem = event.target.parentNode;
    var index = Array.prototype.indexOf.call(listItem.parentNode.children, listItem);

    $.ajax({
        type: 'DELETE',
        url: `/comentario/${index}`,
        success: function (response) {
            listItem.remove();
        },
        error: function (error) {
            console.error('Erro ao remover comentário:', error);
        }
    });
}

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



function downloadAudio() {
    const url = document.getElementById('youtubeUrl').value;
    axios.post('/download', { url: url })
        .then(response => {
            const audioContainer = document.getElementById('audioContainer');
            audioContainer.innerHTML = response.data.html_button;
        })
        .catch(error => {
            console.error('There was an error downloading the audio!', error);
        });
}


