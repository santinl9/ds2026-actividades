interface Libro {
    title: string,
    author_name?: string,
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

async function libroDescripcion(key:string): Promise<string> {

    try {
        const salida = await fetch(`https://openlibrary.org${key}.json`); 

        if (!salida.ok){
            throw new Error(`Error en la solicitud ${salida.status}`);
        }

        const salidaJSON = await salida.json();
    
        const desripcion : string = salidaJSON.description;
        return desripcion;

    }

    catch (error){
        alert(`Error al obtener desripcion: ${error}`)

        return "";
    }
}

let libroEncontrado: Libro;

document.addEventListener("DOMContentLoaded", async() => {

    if (window.location.pathname.includes("index.html")) {

        const librosTendenciaHTML = document.querySelector("#librosTendencia");

        const cargando = document.createElement("h4");
        cargando.innerHTML="cargando..."
        librosTendenciaHTML?.appendChild(cargando);
        
        const librosTendencia = await librosTendencia_6();
        
        for (let i=0; i < librosTendencia.length; i++ ){
        
            const libro_i = librosTendenciaHTML?.querySelector(`#libro${i+1}`);
        
            (libro_i?.querySelector(".card-img-top") as HTMLImageElement).src=librosTendencia[i].cover_i?`https://covers.openlibrary.org/b/id/${librosTendencia[i].cover_i}-M.jpg`: "../Mejai27s_Soulstealer_old (1).jpg";
            (libro_i?.querySelector(".card-title") as HTMLHeadingElement).innerHTML=`${librosTendencia[i].title}`;
            (libro_i?.querySelector(".card-text") as HTMLParagraphElement).innerHTML=librosTendencia[i].author_name?`autor:${librosTendencia[i].author_name}` :"autor no disponible";

        }
            
        cargando.remove();

        librosTendenciaHTML?.addEventListener("click", (event) =>{

            if((event.target as Element ).closest(".btn")){

                const indice =  Number(((event.target as Element).closest('[id*="libro"]') as Element).id.slice(-1));
                libroEncontrado = librosTendencia[indice-1];

                sessionStorage.setItem("libroEncontrado", JSON.stringify(libroEncontrado));
                window.location.href = "libro.html";

            }

        })
    }

    if (window.location.pathname.includes("libro.html")) {
        const libro: Libro = JSON.parse(sessionStorage.getItem("libroEncontrado")!);

        (document.querySelector("#portada") as HTMLImageElement).src=`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`;
        (document.querySelector("#tituloLibro") as HTMLHeadingElement).innerHTML = libro.title;
        (document.querySelector("#autor") as HTMLHeadingElement).innerHTML = libro.author_name? `autor: ${libro.author_name}` : 'autor no disponible';
        (document.querySelector("#descripcion") as HTMLParagraphElement).innerHTML =`descripción:\n${await libroDescripcion(libro.key)}`;
        (document.querySelector("#precio") as HTMLParagraphElement).innerHTML =`$${(Math.random() * 5000).toFixed(2).toString()}` ;
    }
});












export {};