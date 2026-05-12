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

const libro = new URLSearchParams(window.location.search);

(document.querySelector("#portada") as HTMLImageElement).src=`https://covers.openlibrary.org/b/id/${libro.get("cover")}-L.jpg`;
(document.querySelector("#tituloLibro") as HTMLHeadingElement).innerHTML = libro.get("titulo")?? "titulo no disponible";
(document.querySelector("#autor") as HTMLHeadingElement).innerHTML = libro.get("autor")?? "autor no disponible";
(document.querySelector("#descripcion") as HTMLParagraphElement).innerHTML =`descripción:\n${await libroDescripcion(libro.get("key")?? "")}`;
(document.querySelector("#precio") as HTMLParagraphElement).innerHTML =`$${(Math.random() * 5000).toFixed(2).toString()}`;

(document.querySelector("#volver_catalogo") as HTMLAnchorElement).href = `catalogo.html?titulo=${encodeURIComponent(libro.get("titulo")??"")}`

export {};