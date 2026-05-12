async function libroDescripcion(key) {
    try {
        const salida = await fetch(`https://openlibrary.org${key}.json`);
        if (!salida.ok) {
            throw new Error(`Error en la solicitud ${salida.status}`);
        }
        const salidaJSON = await salida.json();
        const desripcion = (typeof salidaJSON.description === "string") ? salidaJSON.description : salidaJSON.description.value;
        return desripcion;
    }
    catch (error) {
        return "Descripcion no disponible";
    }
}
const libro = new URLSearchParams(window.location.search);
document.querySelector("#portada").src = `https://covers.openlibrary.org/b/id/${libro.get("cover")}-L.jpg`;
document.querySelector("#tituloLibro").innerHTML = libro.get("titulo") ?? "titulo no disponible";
document.querySelector("#autor").innerHTML = libro.get("autor") ?? "autor no disponible";
document.querySelector("#descripcion").innerHTML = `descripción:\n${await libroDescripcion(libro.get("key") ?? "")}`;
document.querySelector("#precio").innerHTML = `$${(Math.random() * 5000).toFixed(2).toString()}`;
document.querySelector("#volver_catalogo").href = `catalogo.html?titulo=${encodeURIComponent(libro.get("titulo") ?? "")}`;
export {};
