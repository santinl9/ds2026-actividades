const resultados = document.querySelector('#resultados');
export async function buscarLibro(nombre) {
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
        const errorHTML = document.createElement('p');
        errorHTML.style.backgroundColor = 'red';
        errorHTML.innerHTML = `Error al obtener los usuarios: ${error}`;
        resultados.appendChild(errorHTML);
        return [];
    }
}
