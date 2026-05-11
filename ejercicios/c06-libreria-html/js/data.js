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
        const desripcion = salidaJSON.description;
        return desripcion;
    }
    catch (error) {
        alert(`Error al obtener desripcion: ${error}`);
        return "";
    }
}
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
                window.location.href = "libro.html";
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
});
export {};
