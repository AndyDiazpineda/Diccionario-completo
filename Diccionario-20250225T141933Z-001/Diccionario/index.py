import wikipediaapi
from flask import Flask, render_template, request

app = Flask(__name__)

# Función para obtener una definición corta de una palabra
def get_definition(word):
    wiki_wiki = wikipediaapi.Wikipedia(
        language='es',
        user_agent='my-dictionary-app/1.0 (officecuenta365@gmail.com)'
    )
    
    page = wiki_wiki.page(word)
    if not page.exists():
        return f"No se encontró una definición para '{word}'"
    
    # Obtener el primer párrafo del texto
    text = page.text
    first_paragraph = text.split('\n')[0]  # Tomamos el primer párrafo
    return first_paragraph

# Ruta principal que carga la plantilla
@app.route('/')
def home():
    return render_template('index.html')  # Esta es la plantilla que se renderiza

# Ruta para manejar la solicitud POST y mostrar la definición
@app.route('/get_definition', methods=['POST'])
def get_word_definition():
    word = request.form['word']  # Obtener la palabra del formulario
    definition = get_definition(word)  # Obtener la definición de la palabra
    return render_template('index.html', definition=definition, word=word)  # Renderizamos la página con la definición

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/ayuda')
def ayuda():
    return render_template('ayuda.html') 

@app.route('/sobrenosotros')
def sobrenosotros():
    return render_template('sobrenosotros.html')

@app.route('/ingles')
def ingles():
    return render_template('ingles.html')

if __name__ == "__main__":
    app.run(debug=True)  # Ejecutar la app con depuración activada
