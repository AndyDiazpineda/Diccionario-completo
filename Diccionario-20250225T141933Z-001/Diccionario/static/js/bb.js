document.addEventListener("DOMContentLoaded", () => {
    let listElements = document.querySelectorAll(".list_button--click");

    listElements.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.toggle("arrow");

            let menu = element.nextElementSibling;
            let height = (menu.clientHeight === 0) ? menu.scrollHeight : 0;
            menu.style.height = `${height}px`;
        });
    });

    // Lógica para ocultar/mostrar el menú con el logo
    const nav = document.querySelector(".nav");
    const logo = document.querySelector(".list_img"); // Asegúrate de que esta clase sea correcta
    const toggleIcon = document.getElementById("toggle-menu");

    logo.addEventListener("click", () => {
        nav.style.display = "none";
        toggleIcon.style.display = "block";
    });

    toggleIcon.addEventListener("click", () => {
        nav.style.display = "block";
        toggleIcon.style.display = "none";
    });
});

// Código relacionado con la búsqueda de la palabra
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();

    if (!inpWord) {
        alert("Por favor, ingresa una palabra.");
        return;
    }

    result.innerHTML = '<h3>Cargando...</h3>';  // Indicador de carga

    fetch(`${url}${inpWord}`)
        .then(response => {
            if (!response.ok) throw new Error("Palabra no encontrada");
            return response.json();
        })
        .then((data) => {
            result.innerHTML = `
                <div class="word">
                    <h3>${data[0].word}</h3>
                    <button onclick="playSound('${data[0].phonetics[0]?.audio || ''}')">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].phonetics[0]?.text || "Sin pronunciación"}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0]?.definitions[0]?.definition || "No hay significado disponible."}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0]?.definitions[0]?.example || ""}
                </p>
            `;
        })
        .catch(() => {
            result.innerHTML = '<h3 class="error">No se pudo encontrar la palabra</h3>';
        });
});

function playSound(audioUrl) {
    if (audioUrl) {
        sound.src = audioUrl;
        sound.play();
    } else {
        alert("No hay audio disponible.");
    }
};
