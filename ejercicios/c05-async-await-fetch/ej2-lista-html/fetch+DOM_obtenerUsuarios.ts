interface Usuario {
    id: number;
    name: string;
    email: string;
    phone : string;
}

const lista = document.querySelector('#listaUsuarios') as HTMLUListElement;

export async function obtenerUsuarios(): Promise<Usuario[]> {
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) { // response.ok es false cuando el status HTTP es 4xx o 5xx
            throw new Error(`Error en la solicitud: ${response.status}`); //trhow me deriva al catch asignando en 'error'. En este caso le asigno a 'error' un objeto tipo Error con un mensaje personalizado que incluye el status de la respuesta.
        }
        const usuarios: Usuario[] = await response.json(); //.json() parsea el json a un objeto de JS usable
        return usuarios;
    } catch (error) {

        const errorHTML = document.createElement('p');
        errorHTML.style.backgroundColor = 'red';
        errorHTML.innerHTML = `Error al obtener los usuarios: ${error}`
        lista.appendChild(errorHTML);
        
        return [];
    }

}
