interface Libro {
    title: string,
    author_name?: string[],
    cover_i: number,
    key: string
}

async function librosTendencia_6(): Promise<Libro[]> {

    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=love&sort=rating+desc&limit=6&fields=title,author_name,cover_i,key`); 

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

const librosTendenciaHTML : HTMLDivElement| null = document.querySelector("#librosTendencia");

const cargando : HTMLHeadingElement = document.createElement("h4");
cargando.innerHTML="cargando...";
librosTendenciaHTML?.appendChild(cargando);

const librosTendencia : Libro[]= await librosTendencia_6();

for (let i=0; i < librosTendencia.length; i++ ){

    const libro_i : HTMLDivElement| null = document.querySelector(`#libro${i+1}`);

    
    const titulo: string = librosTendencia[i].title;
    const autor: string = librosTendencia[i].author_name?.join(",") ?? 'autor no disponible';
    const cover_i: number = librosTendencia[i].cover_i;
    const key: string = librosTendencia[i].key;

    (libro_i?.querySelector(".card-img-top") as HTMLImageElement).src=`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    (libro_i?.querySelector(".card-title") as HTMLHeadingElement).innerHTML=titulo;
    (libro_i?.querySelector(".card-text") as HTMLParagraphElement).innerHTML=autor;

    (libro_i?.querySelector('a') as HTMLAnchorElement).href=`libro.html?titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&cover=${encodeURIComponent(cover_i)}&key=${encodeURIComponent(key)}`

}
    
cargando.remove();

export{};