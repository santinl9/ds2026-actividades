interface Libro {
    title: string,
    author_name?: string[],
    cover_i: number,
    key: string
}

async function buscarLibro(titulo: string): Promise<Libro[]> {

    try {
        const salida = await fetch(`https://openlibrary.org/search.json?q=${titulo}&fields=title,author_name,cover_i,key`); 

        if (!salida.ok){
            throw new Error(`Error en la solicitud ${salida.status}`);
        }

        const salidaJSON = await salida.json();
        
        const libros : Libro[] = salidaJSON.docs;
        return libros;

    }

    catch (error){

        alert( `Error al obtener libros: ${error}`);

        return [];

    }
}

const libroHTML = (libro:Libro,i:number ): HTMLDivElement =>{

    const tituloLibro: string= libro.title;
    const autorLibro: string = libro.author_name? libro.author_name.join(",") : "autor no disponible";
    const coverLibro: number = libro.cover_i;
    const keyLibro: string = libro.key;

    const card = document.createElement('div');
    card.className="card";
    card.id=`libro${i+1}`;

    const portada = document.createElement('img');
    portada.className="card-img-top";
    portada.src= `https://covers.openlibrary.org/b/id/${coverLibro}-M.jpg`;

    const body =document.createElement('div');
    body.className="card-body"

    const titulo = document.createElement('h5');
    titulo.className="card-title"
    titulo.innerHTML=tituloLibro;

    const autor =document.createElement('p');
    autor.className="card-text";
    autor.innerHTML=autorLibro;

    const boton =document.createElement('a');
    boton.href="libro.html";
    boton.className="btn btn-outline-danger"
    boton.innerHTML="Ver más"
    boton.href=`libro.html?titulo=${encodeURIComponent(tituloLibro)}&autor=${encodeURIComponent(autorLibro)}&cover=${encodeURIComponent(coverLibro)}&key=${encodeURIComponent(keyLibro)}`

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


const libro = new URLSearchParams(window.location.search);

const resultados = document.querySelector('#resultados') as HTMLDivElement;
const formulario = document.querySelector('#buscador') as HTMLFormElement;
let titulo : string | null;

const cargando =(): HTMLParagraphElement => {
    const p = document.createElement('p');
    p.innerHTML = 'Cargando...';
    return p;
}

formulario.addEventListener('submit', async (event) => {

    event.preventDefault();
    resultados.innerHTML='';

    const titulo : string = (document.querySelector('#tituloLibro') as HTMLInputElement).value;

    if (titulo != ''){

        const resultadosPara = document.createElement("h2") as HTMLParagraphElement;
        resultados.innerHTML=`Resultados para:"${titulo}"`;
    
        resultados.appendChild(resultadosPara);

        const cargandoHTML = cargando() as HTMLParagraphElement;
        resultados.appendChild(cargandoHTML);
    
        const libros: Libro[] = await buscarLibro(titulo);
        let i=0;

        libros.slice(0,10).forEach(libro => {

            resultados.appendChild(libroHTML(libro,i));
            i++;

        })
        cargandoHTML.remove();

    }
    else {
        alert('Por favor, ingresa un título para buscar.');
    }

})

if (libro.get("titulo")) {

    (document.querySelector("#tituloLibro") as HTMLInputElement).value = libro.get("titulo")?? "";
    formulario.requestSubmit();
}
else{

    const h1 = (document.createElement('h1') as HTMLHeadingElement);
    h1.innerHTML = "Habría que buscar algo...";
    resultados.appendChild(h1);

}

export {};