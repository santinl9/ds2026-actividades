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
const librosTendenciaHTML = document.querySelector("#librosTendencia");
const cargando = document.createElement("h4");
cargando.innerHTML = "cargando...";
librosTendenciaHTML?.appendChild(cargando);
const librosTendencia = await librosTendencia_6();
for (let i = 0; i < librosTendencia.length; i++) {
    const libro_i = document.querySelector(`#libro${i + 1}`);
    const titulo = librosTendencia[i].title;
    const autor = librosTendencia[i].author_name?.join(",") ?? 'autor no disponible';
    const cover_i = librosTendencia[i].cover_i;
    const key = librosTendencia[i].key;
    (libro_i?.querySelector(".card-img-top")).src = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    (libro_i?.querySelector(".card-title")).innerHTML = titulo;
    (libro_i?.querySelector(".card-text")).innerHTML = autor;
    (libro_i?.querySelector('a')).href = `libro.html?titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&cover=${encodeURIComponent(cover_i)}&key=${encodeURIComponent(key)}`;
}
cargando.remove();
export {};
