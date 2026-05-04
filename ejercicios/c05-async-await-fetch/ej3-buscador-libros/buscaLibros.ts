import { buscarLibro } from "./libroAPI.js";

const libroHTML = (titulo: string, autor:string | undefined, publicacion:string | undefined , id_portada: number | undefined ): HTMLDivElement =>{

    const div = document.createElement('div');
    const tituloHTML = document.createElement('h4');
    const autorHTML = document.createElement('p');
    const publicacionHTML = document.createElement('p');
    const portadaHTML = document.createElement('img');

    tituloHTML.innerHTML = `Título: ${titulo}`;
    autor? autorHTML.innerHTML = `Autor: ${autor}` : autorHTML.innerHTML = 'Autor: Desconocido';
    publicacion? publicacionHTML.innerHTML = `Año de publicación: ${publicacion}` : publicacionHTML.innerHTML = 'Año de publicación: Desconocido';
    id_portada? portadaHTML.src = `https://covers.openlibrary.org/b/id/${id_portada}-M.jpg` : portadaHTML.alt = 'Portada no disponible';

    div.appendChild(tituloHTML);
    div.appendChild(autorHTML);
    div.appendChild(publicacionHTML);
    div.appendChild(portadaHTML);
    
    return div;
}

const cargando =(): HTMLParagraphElement => {
    const p = document.createElement('p');
    p.innerHTML = 'Cargando...';
    return p;
}

const resultados = document.querySelector('#resultados') as HTMLDivElement;
const botonBuscar = document.querySelector('#botonBuscar') as HTMLButtonElement;

botonBuscar.addEventListener('click', async () => {

    resultados.innerHTML='';

    const titulo = (document.querySelector('#titulo') as HTMLInputElement).value;
    if (titulo != ''){
    
        const cargandoHTML = cargando();
        resultados.appendChild(cargandoHTML);
    
        const libros = await buscarLibro(titulo);
        libros.slice(0,10).forEach(libro => {
        
            resultados.appendChild(libroHTML(libro.title, libro.author_name, libro.first_publish_year, libro.cover_i));

        })
        cargandoHTML.style.display = 'none';

    }
    else {
        alert('Por favor, ingresa un título para buscar.');
    }

})
