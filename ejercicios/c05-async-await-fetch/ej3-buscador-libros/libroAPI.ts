const resultados = document.querySelector('#resultados') as HTMLDivElement;

interface Libro {
    title: string,
    author_name?: string, 
    first_publish_year?: string,
    cover_i: number

}

export async function buscarLibro(nombre: string): Promise<Libro[]> {

    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=${nombre}`); 

        if (!salida.ok){
            throw new Error(`Error en la solicitud ${salida.status}`);
        }

        const salidaJSON = await salida.json();
        
        const libros : Libro[] = salidaJSON.docs;
        return libros;

    }

    catch (error){
        const errorHTML = document.createElement('p');
        errorHTML.style.backgroundColor = 'red';
        errorHTML.innerHTML = `Error al obtener los usuarios: ${error}`
        resultados.appendChild(errorHTML);

        return [];

    }
}