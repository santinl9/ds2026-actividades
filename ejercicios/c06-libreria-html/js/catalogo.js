async function buscarLibro(titulo) {
    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=${titulo}&fields=title,author_name,cover_i,key`);
        if (!salida.ok) {
            throw new Error(`Error en la solicitud ${salida.status}`);
        }
        const salidaJSON = await salida.json();
        const libros = salidaJSON.docs;
        return libros;
    }
    catch (error) {
        alert(`Error al obtener libros: ${error}`);
        return [];
    }
}
const libroHTML = (libro, i) => {
    const tituloLibro = libro.title;
    const autorLibro = libro.author_name ? libro.author_name.join(",") : "autor no disponible";
    const coverLibro = libro.cover_i;
    const keyLibro = libro.key;
    const card = document.createElement('div');
    card.className = "card";
    card.id = `libro${i + 1}`;
    const portada = document.createElement('img');
    portada.className = "card-img-top";
    portada.src = `https://covers.openlibrary.org/b/id/${coverLibro}-M.jpg`;
    const body = document.createElement('div');
    body.className = "card-body";
    const titulo = document.createElement('h5');
    titulo.className = "card-title";
    titulo.innerHTML = tituloLibro;
    const autor = document.createElement('p');
    autor.className = "card-text";
    autor.innerHTML = autorLibro;
    const boton = document.createElement('a');
    boton.href = "libro.html";
    boton.className = "btn btn-outline-danger";
    boton.innerHTML = "Ver más";
    boton.href = `libro.html?titulo=${encodeURIComponent(tituloLibro)}&autor=${encodeURIComponent(autorLibro)}&cover=${encodeURIComponent(coverLibro)}&key=${encodeURIComponent(keyLibro)}`;
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
const libro = new URLSearchParams(window.location.search);
const resultados = document.querySelector('#resultados');
const formulario = document.querySelector('#buscador');
let titulo;
const cargando = () => {
    const p = document.createElement('p');
    p.innerHTML = 'Cargando...';
    return p;
};
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
        const libros = await buscarLibro(titulo);
        let i = 0;
        libros.slice(0, 10).forEach(libro => {
            resultados.appendChild(libroHTML(libro, i));
            i++;
        });
        cargandoHTML.remove();
    }
    else {
        alert('Por favor, ingresa un título para buscar.');
    }
});
if (libro.get("titulo")) {
    document.querySelector("#tituloLibro").value = libro.get("titulo") ?? "";
    formulario.requestSubmit();
}
else {
    const h1 = document.createElement('h1');
    h1.innerHTML = "Habría que buscar algo...";
    resultados.appendChild(h1);
}
export {};
