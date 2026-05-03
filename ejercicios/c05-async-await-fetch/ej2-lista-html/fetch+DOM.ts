import { obtenerUsuarios } from "./fetch+DOM_obtenerUsuarios.js";

const crearLi = (nombre: string, mail: string): HTMLElement => {

    const li = document.createElement('li');
    li.innerHTML = `Nombre:${nombre} - Mail:${mail}`;
    return li;

} 

const cargando = (): HTMLParagraphElement => {
    const p = document.createElement('p');
    p.innerHTML='Cargando...';
    return p;

}

const botonUsuarios = document.querySelector('#botonUsuarios') as HTMLButtonElement;
const botonVaciar =document.querySelector('#botonVaciar') as HTMLButtonElement;
const lista = document.querySelector('#listaUsuarios') as HTMLUListElement;

botonUsuarios.addEventListener('click', async () => {

    const p = cargando();
    lista.appendChild(p);

    const usuarios = await obtenerUsuarios();

    p.style.display='none';

    usuarios.forEach(element => {
        lista.appendChild(crearLi(element.name, element.email));
    })

});

botonVaciar.addEventListener('click', () => {
    
    lista.innerHTML = '';

});