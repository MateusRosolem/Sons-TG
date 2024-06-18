from flask import Flask, request, send_file, jsonify, render_template, send_file
from pytube import YouTube
import os

app = Flask(__name__)

# Lista para armazenar os comentários permanentemente
comentarios = []



def generate_audio_html():
    audio_html = ""
    for filename in os.listdir('downloads'):
        if filename.endswith('.mp3'):
            audio_id = filename.rsplit('.', 1)[0]
            title = audio_id.replace('_', ' ')
            audio_html += f'''
            <div class="audioDiv">
                <h1>{title}</h1>
                <button onclick="document.getElementById('{audio_id}').play()">Play</button>
                <button onclick="document.getElementById('{audio_id}').pause()">Pause</button>
                <audio id="{audio_id}" controls="controls">
                    <source src="/downloads/{filename}" type="audio/mp3" />seu navegador não suporta HTML5
                </audio>
            </div>
            '''
    return audio_html


# Rota para a página inicial
@app.route('/')
def index():
    audio_html = generate_audio_html()
    return render_template('index.html', audio_html=audio_html, comentarios=comentarios)


@app.route('/download', methods=['POST'])
def download_audio():
    url = request.json['url']
    yt = YouTube(url)
    stream = yt.streams.filter(only_audio=True).first()
    output_path = stream.download(output_path='downloads')
    base, ext = os.path.splitext(output_path)
    new_file = base + '.mp3'

    if not os.path.exists(new_file):
        os.rename(output_path, new_file)

    audio_html = generate_audio_html()

    return jsonify({'html_button': audio_html})

@app.route('/downloads/<filename>')
def serve_audio(filename):
    return send_file(os.path.join('downloads', filename))




#  Rota para receber um novo comentário via POST
@app.route('/comentario', methods=['POST'])
def add_comentario():
    comentario = request.json['comentario']
    comentarios.append(comentario)
    return jsonify({'comentario': comentario})

# Rota para remover um comentário
@app.route('/comentario/<int:index>', methods=['DELETE'])
def remove_comentario(index):
    if 0 <= index < len(comentarios):
        del comentarios[index]
        return jsonify({'message': 'Comentário removido com sucesso.'}), 200
    else:
        return jsonify({'error': 'Índice de comentário inválido.'}), 400
    
    
    
if __name__ == '__main__':
    if not os.path.exists('downloads'):
        os.makedirs('downloads')
    app.run(debug=True)