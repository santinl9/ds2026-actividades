interface Libro {
    title: string,
    author_name?: string,
    cover_i: number
}

export async function librosTendencia_diario_6(): Promise<Libro[]> {

    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=love&sort=rating+desc&limit=6&fields=title,author_name,cover_i`); 

        if (!salida.ok){
            throw new Error(`Error en la solicitud ${salida.status}`);
        }

        const salidaJSON = await salida.json();
        
        const libros : Libro[] = salidaJSON.docs;
        return libros;

    }

    catch (error){
        alert(`Error al obtener los libros tendencia: ${error}`)

        return [];
    }
}

const librosTendenciaHTML = document.querySelector("#librosTendencia");

const cargando = document.createElement("h4");
cargando.innerHTML="cargando..."
librosTendenciaHTML?.appendChild(cargando);

const librosTendencia_6 = await librosTendencia_diario_6();

for (let i=0; i < librosTendencia_6.length; i++ ){

    const libro_i = librosTendenciaHTML?.querySelector(`#libro${i+1}`);

    (libro_i?.querySelector(".card-img-top") as HTMLImageElement).src=librosTendencia_6[i].cover_i?`https://covers.openlibrary.org/b/id/${librosTendencia_6[i].cover_i}-M.jpg`: "../Mejai27s_Soulstealer_old (1).jpg";
    (libro_i?.querySelector(".card-title") as HTMLHeadingElement).innerHTML=`${librosTendencia_6[i].title}`;
    (libro_i?.querySelector(".card-text") as HTMLParagraphElement).innerHTML=librosTendencia_6[i].author_name?`autor:${librosTendencia_6[i].author_name}` :"autor no disponible";

}
    
cargando.remove();










export {};