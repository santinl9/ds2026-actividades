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

        const desripcion : string = (typeof salidaJSON.description === "string")?salidaJSON.description : salidaJSON.description.value;
        return desripcion;

    }

    catch (error){

        return "Descripcion no disponible";
    }
}

async function buscarLibro(nombre: string): Promise<Libro[]> {

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

        alert( `Error al obtener los usuarios: ${error}`);

        return [];

    }
}

const libroHTML = (libro:Libro,i:number ): HTMLDivElement =>{

    const card = document.createElement('div');
    card.className="card";
    card.id=`libro${i+1}`;

    const portada = document.createElement('img');
    portada.className="card-img-top";
    portada.src= `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`;

    const body =document.createElement('div');
    body.className="card-body"

    const titulo = document.createElement('h5');
    titulo.className="card-title"
    titulo.innerHTML=`${libro.title}`

    const autor =document.createElement('p');
    autor.className="card-text";
    autor.innerHTML=libro.author_name?`autor:${libro.author_name}`:"autor no disponible";

    const boton =document.createElement('a');
    boton.href="libro.html";
    boton.className="btn btn-outline-danger"
    boton.innerHTML="Ver más"

    card.appendChild(portada);

    body.appendChild(titulo);
    body.appendChild(autor);
    body.appendChild(boton);
    
    card.appendChild(body)

    const columna = document.createElement('div');
    columna.className="col-md-2";
    
    columna.appendChild(card);
    
    return columna;
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

    if (window.location.pathname.includes("catalogo.html")){

        const cargando =(): HTMLParagraphElement => {
            const p = document.createElement('p');
            p.innerHTML = 'Cargando...';
            return p;
        }
        
        const resultados = document.querySelector('#resultados') as HTMLDivElement;
        const formulario = document.querySelector('#buscador') as HTMLButtonElement;
        let libros :Libro[];
        
        formulario.addEventListener('submit', async (event) => {

            event.preventDefault();
            resultados.innerHTML='';
        
            const titulo = (document.querySelector('#tituloLibro') as HTMLInputElement).value;

            if (titulo != ''){

                const resultadosPara = document.createElement("h2");
                resultados.innerHTML=`Resultados para:"${titulo}"`;
            
                resultados.appendChild(resultadosPara);

                const cargandoHTML = cargando();
                resultados.appendChild(cargandoHTML);
            
                libros = await buscarLibro(titulo);
                let i=0;
                libros.slice(0,10).forEach(libro => {

                    resultados.appendChild(libroHTML(libro,i));
                    i++;
        
                })
                cargandoHTML.style.display = 'none';
        
            }
            else {
                alert('Por favor, ingresa un título para buscar.');
            }
        
        })

        resultados.addEventListener("click", (event) =>{

            if((event.target as Element ).closest(".btn")){

                const indice =  Number(((event.target as Element).closest('[id*="libro"]') as Element).id.slice(-1));
                libroEncontrado = libros[indice-1];

                sessionStorage.setItem("libroEncontrado", JSON.stringify(libroEncontrado));
                window.location.href = "libro.html";

            }

        })
    }

    if (window.location.pathname.includes("contacto.html")) {
        const form = document.querySelector("#formContacto") as HTMLFormElement;
    
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
})










export {};