async function librosTendencia_6() {
    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=love&sort=rating+desc&limit=6&fields=title,author_name,cover_i,key`);
        if (!salida.ok) {
            throw new Error(`Error en la solicitud ${salida.status}`);
        }
        const salidaJSON = await salida.json();
        const libros = salidaJSON.docs;
        return libros;
    }
    catch (error) {
        alert(`Error al obtener los libros tendencia: ${error}`);
        return [];
    }
}
async function libroDescripcion(key) {
    try {
        const salida = await fetch(`https://openlibrary.org${key}.json`);
        if (!salida.ok) {
            throw new Error(`Error en la solicitud ${salida.status}`);
        }
        const salidaJSON = await salida.json();
        const desripcion = (typeof salidaJSON.description === "string") ? salidaJSON.description : salidaJSON.description.value;
        return desripcion;
    }
    catch (error) {
        return "Descripcion no disponible";
    }
}
async function buscarLibro(nombre) {
    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=${nombre}`);
        if (!salida.ok) {
            throw new Error(`Error en la solicitud ${salida.status}`);
        }
        const salidaJSON = await salida.json();
        const libros = salidaJSON.docs;
        return libros;
    }
    catch (error) {
        alert(`Error al obtener los usuarios: ${error}`);
        return [];
    }
}
const libroHTML = (libro, i) => {
    const card = document.createElement('div');
    card.className = "card";
    card.id = `libro${i + 1}`;
    const portada = document.createElement('img');
    portada.className = "card-img-top";
    portada.src = `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`;
    const body = document.createElement('div');
    body.className = "card-body";
    const titulo = document.createElement('h5');
    titulo.className = "card-title";
    titulo.innerHTML = `${libro.title}`;
    const autor = document.createElement('p');
    autor.className = "card-text";
    autor.innerHTML = libro.author_name ? `autor:${libro.author_name}` : "autor no disponible";
    const boton = document.createElement('a');
    boton.href = "libro.html";
    boton.className = "btn btn-outline-danger";
    boton.innerHTML = "Ver más";
    card.appendChild(portada);
    body.appendChild(titulo);
    body.appendChild(autor);
    body.appendChild(boton);
    card.appendChild(body);
    const columna = document.createElement('div');
    columna.className = "col-md-2";
    columna.appendChild(card);
    return columna;
};
let libroEncontrado;
document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes("index.html")) {
        const librosTendenciaHTML = document.querySelector("#librosTendencia");
        const cargando = document.createElement("h4");
        cargando.innerHTML = "cargando...";
        librosTendenciaHTML?.appendChild(cargando);
        const librosTendencia = await librosTendencia_6();
        for (let i = 0; i < librosTendencia.length; i++) {
            const libro_i = librosTendenciaHTML?.querySelector(`#libro${i + 1}`);
            (libro_i?.querySelector(".card-img-top")).src = librosTendencia[i].cover_i ? `https://covers.openlibrary.org/b/id/${librosTendencia[i].cover_i}-M.jpg` : "../Mejai27s_Soulstealer_old (1).jpg";
            (libro_i?.querySelector(".card-title")).innerHTML = `${librosTendencia[i].title}`;
            (libro_i?.querySelector(".card-text")).innerHTML = librosTendencia[i].author_name ? `autor:${librosTendencia[i].author_name}` : "autor no disponible";
        }
        cargando.remove();
        librosTendenciaHTML?.addEventListener("click", (event) => {
            if (event.target.closest(".btn")) {
                const indice = Number(event.target.closest('[id*="libro"]').id.slice(-1));
                libroEncontrado = librosTendencia[indice - 1];
                sessionStorage.setItem("libroEncontrado", JSON.stringify(libroEncontrado));
            }
        });
    }
    if (window.location.pathname.includes("libro.html")) {
        const libro = JSON.parse(sessionStorage.getItem("libroEncontrado"));
        document.querySelector("#portada").src = `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`;
        document.querySelector("#tituloLibro").innerHTML = libro.title;
        document.querySelector("#autor").innerHTML = libro.author_name ? `autor: ${libro.author_name}` : 'autor no disponible';
        document.querySelector("#descripcion").innerHTML = `descripción:\n${await libroDescripcion(libro.key)}`;
        document.querySelector("#precio").innerHTML = `$${(Math.random() * 5000).toFixed(2).toString()}`;
    }
    if (window.location.pathname.includes("catalogo.html")) {
        const cargando = () => {
            const p = document.createElement('p');
            p.innerHTML = 'Cargando...';
            return p;
        };
        const resultados = document.querySelector('#resultados');
        const formulario = document.querySelector('#buscador');
        let libros;
        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();
            resultados.innerHTML = '';
            const titulo = document.querySelector('#tituloLibro').value;
            if (titulo != '') {
                const resultadosPara = document.createElement("h2");
                resultados.innerHTML = `Resultados para:"${titulo}"`;
                resultados.appendChild(resultadosPara);
                const cargandoHTML = cargando();
                resultados.appendChild(cargandoHTML);
                libros = await buscarLibro(titulo);
                let i = 0;
                libros.slice(0, 10).forEach(libro => {
                    resultados.appendChild(libroHTML(libro, i));
                    i++;
                });
                cargandoHTML.style.display = 'none';
            }
            else {
                alert('Por favor, ingresa un título para buscar.');
            }
        });
        resultados.addEventListener("click", (event) => {
            if (event.target.closest(".btn")) {
                const indice = Number(event.target.closest('[id*="libro"]').id.slice(-1));
                libroEncontrado = libros[indice - 1];
                sessionStorage.setItem("libroEncontrado", JSON.stringify(libroEncontrado));
                window.location.href = "libro.html";
            }
        });
    }
    if (window.location.pathname.includes("contacto.html")) {
        const form = document.querySelector("#formContacto");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                return;
            }
            alert("Mensaje enviado correctamente.");
            form.reset();
            form.classList.remove("was-validated");
        });
    }
});
export {};
