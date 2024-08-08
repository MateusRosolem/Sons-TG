
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


window.onscroll = function() {
  var menu = document.getElementById("top-menu");
  if (window.pageYOffset > 0) {
    menu.classList.add("menu-hidden");
  } else {
    menu.classList.remove("menu-hidden");
  }
};

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

    // Adicionar botão de remoção
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'commentButton';
    removeButton.onclick = () => removerComentario(comentario, novoComentarioLi);

    novoComentarioLi.appendChild(removeButton);
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

function removerComentario(comentario, comentarioElement) {
    // Remove o comentário do localStorage
    let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios = comentarios.filter(c => c !== comentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));

    // Remove o elemento do DOM
    comentarioElement.remove();
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





function playVideo() {
            var url = document.getElementById("youtubeUrl").value;
            var videoId = extractVideoId(url);
            if (videoId) {
                var embedUrl = "https://www.youtube.com/embed/" + videoId;
                document.getElementById("videoContainer").innerHTML = '<iframe src="' + embedUrl + '" frameborder="0" allowfullscreen></iframe>';
            } else {
                alert("Por favor, insira um link válido do YouTube.");
            }
        }

        function extractVideoId(url) {
            var videoId = null;
            var urlParts = url.split("v=");
            if (urlParts.length == 2) {
                videoId = urlParts[1].split("&")[0];
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1].split("?")[0];
            }
            return videoId;
        }




        window.addEventListener('scroll', function () {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                }
            });
        });








document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Função de rolagem suave
    function smoothScroll(target, duration) {
        var targetPosition = target.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Adiciona o evento de clique para links de navegação
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            smoothScroll(targetSection, 1000);
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
            const lyrics = {
                musica1: "Aqui vai a letra completa da Música 1.",
                musica2: "Aqui vai a letra completa da Música 2.",
                musica3: "Aqui vai a letra completa da Música 3."
            };

            const lyricsButtons = document.querySelectorAll('.lyrics-btn');
            const modalOverlay = document.getElementById('modalOverlay');
            const lyricsModal = document.getElementById('lyricsModal');
            const lyricsText = document.getElementById('lyricsText');
            const closeBtn = document.getElementById('closeBtn');

            lyricsButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const song = this.getAttribute('data-song');
                    lyricsText.textContent = lyrics[song];
                    modalOverlay.style.display = 'block';
                    lyricsModal.style.display = 'block';
                });
            });

            closeBtn.addEventListener('click', function() {
                modalOverlay.style.display = 'none';
                lyricsModal.style.display = 'none';
            });

            modalOverlay.addEventListener('click', function() {
                modalOverlay.style.display = 'none';
                lyricsModal.style.display = 'none';
            });
        });





var disqus_config = function () {
        this.page.url = engajamento.html;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = engajamento; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function () {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
        var d = document, s = d.createElement('script');
        s.src = 'https://EXAMPLE.disqus.com/embed.js';  // Replace EXAMPLE with your Disqus shortname
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();



function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }










/**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
    */



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


