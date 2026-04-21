import {Libro, Catalogo} from './clases.js';


const crearLibroHTML = (libro : Libro) : HTMLElement => {

    let libroHTML =document.createElement('li') as HTMLElement;
    
    let titulo = document.createElement('h3') as HTMLHeadingElement;
    titulo.innerHTML= libro.verTitulo();
    
    let datos = document.createElement('p') as HTMLParagraphElement;
    datos.innerHTML =`Autor: ${libro.verAutor()} <br> Precio: $${libro.verPrecio()} <br> Disponible: ${libro.verDisponibilidad() ? 'Sí' : 'No'}`;

    let isbn = document.createElement('p') as HTMLParagraphElement;
    isbn.className = 'isbnClass';
    isbn.innerHTML = libro.verISBN();

    let botonEliminar = document.createElement('button') as HTMLButtonElement;
    botonEliminar.className='eliminarLibro';
    botonEliminar.innerHTML= 'Eliminar';

    let botonDisponibilidad = document.createElement('button') as HTMLButtonElement;
    botonDisponibilidad.className='cambiarDisponibilidad';
    botonDisponibilidad.innerHTML= 'cambiar disponibilidad';


    libroHTML.appendChild(titulo);
    libroHTML.appendChild(datos);
    libroHTML.appendChild(isbn);
    libroHTML.appendChild(botonEliminar);
    libroHTML.appendChild(botonDisponibilidad);

    return libroHTML;

}

const listarLibroHTML = (libroHTML : HTMLElement): void =>{

    listaLibros.appendChild(libroHTML);

}

/*const eliminarLibroHTML = (libroHTML : HTMLElement) : void => {
    libroHTML.remove();
}*/

const renderizar = (libros : Libro[]) : void => {

    listaLibros.innerHTML = '';

    for ( let libro of libros){

        listarLibroHTML(crearLibroHTML(libro));
    }

    stats.innerHTML = 
        (`Libros totales:${catalogo.cantidadLibros(libros)}-
         Valor promedio ${Math.floor(catalogo.verPrecioTotal(libros)/catalogo.cantidadLibros(libros))}`);
}

const agregarLibro = (libro : Libro) : void => {
    catalogo.cargarLibro(libro);
    renderizar(catalogo.verLibros());
}

const eliminarLibro = (isbn : string) : void => {
    catalogo.eliminarLibro(isbn);
    renderizar(catalogo.verLibros());
}

const cambiarDisponibilidad = ( Libro : Libro) : void => {
    Libro.cambiarDisponibilidad();
    renderizar(catalogo.verLibros());
}

const validarFormulario = (): boolean => {

    let formularioValido = true;
    let lista = document.createElement('ul') as HTMLUListElement;
    
    if ((document.querySelector('#isbn') as HTMLInputElement).value == ''){
        let item = document.createElement('li') as HTMLLIElement;
        item.innerHTML = 'El campo ISBN no puede estar vacío';
        lista.appendChild(item);
        formularioValido = false;
    }
    if ((document.querySelector('#titulo') as HTMLInputElement).value == ''){  
        let item = document.createElement('li') as HTMLLIElement;
        item.innerHTML = 'El campo Título no puede estar vacío';
        lista.appendChild(item);
        formularioValido = false;
    
    }
    if ((document.querySelector('#autor') as HTMLInputElement).value == ''){
        let item = document.createElement('li') as HTMLLIElement;
        item.innerHTML = 'El campo Autor no puede estar vacío';
        lista.appendChild(item);
        formularioValido = false;
    }
    if ((document.querySelector('#precio') as HTMLInputElement).value == ''){
        let item = document.createElement('li') as HTMLLIElement;
        item.innerHTML = 'El campo Precio no puede estar vacío';
        lista.appendChild(item);
        formularioValido = false;
    }
    else if (Number((document.querySelector('#precio') as HTMLInputElement).value) < 0){
        let item = document.createElement('li') as HTMLLIElement;
        item.innerHTML = 'El campo Precio no puede ser negativo';
        lista.appendChild(item);
        formularioValido = false;
    }

    formulario.innerHTML = 'Error(es) de formulario:'; //esto hace que el formulario se pise por errores consecutivos
    formulario.appendChild(lista);

    return formularioValido;
}

const vaciarCampos = (): void => {
    (document.querySelector('#isbn') as HTMLInputElement).value = '';
    (document.querySelector('#titulo') as HTMLInputElement).value = '';
    (document.querySelector('#autor') as HTMLInputElement).value = '';
    (document.querySelector('#precio') as HTMLInputElement).value = '';
    (document.querySelector('#errorForm') as HTMLFormElement).innerHTML = '';
}

const catalogo = Catalogo.crearCatalogo();
let botonLibro =document.querySelector('#cargaLibro') as HTMLButtonElement;
let botonAutor = document.querySelector('#filtrar') as HTMLButtonElement;
let botonDisponibles = document.querySelector('#mostrarDisponibles') as HTMLButtonElement;
let botonTodos = document.querySelector('#mostrarTodos') as HTMLButtonElement;

const listaLibros = document.querySelector('#lista') as HTMLElement;
const stats = document.querySelector('#stats') as HTMLParagraphElement;
const formulario = document.querySelector('#errorForm') as HTMLFormElement;

botonLibro.addEventListener('click', () => {

    if (validarFormulario()){
        let libro = Libro.crearLibro(
            (document.querySelector('#isbn') as HTMLInputElement).value,
            (document.querySelector('#titulo') as HTMLInputElement).value,
            (document.querySelector('#autor') as HTMLInputElement).value,
            Number((document.querySelector('#precio') as HTMLInputElement).value)
        );
        agregarLibro(libro);
        vaciarCampos();
    }   
    else{
        alert('formulario inválido');
    }
});

botonAutor.addEventListener('click', () => {

    let autor = (document.querySelector('#filtroAutor') as HTMLInputElement).value;

    renderizar(catalogo.verAutor(autor));
    
});

botonDisponibles.addEventListener('click', () => {
    
    renderizar(catalogo.verDisponible());


});

botonTodos.addEventListener('click', () => {
    
    renderizar(catalogo.verLibros());

});

listaLibros.addEventListener('click', (event) =>{

    let elemento = event.target as HTMLElement;

    if(elemento.className == 'eliminarLibro'){

        let libroHTML = elemento.parentElement as HTMLElement;
        //let isbn = (elemento.querySelector('.isbn') as HTMLParagraphElement).innerHTML; elemento es un botón 
        let isbn = (libroHTML.querySelector('.isbnClass') as HTMLParagraphElement).innerHTML;
        eliminarLibro(isbn);

    }
    else if (elemento.className == 'cambiarDisponibilidad'){

        let libroHTML = elemento.parentElement as HTMLElement;
        let isbn = (libroHTML.querySelector('.isbnClass') as HTMLParagraphElement).innerHTML;
        let libro = catalogo.verLibros().find(libro => libro.verISBN() === isbn);
        if (libro){
            
            // es innecesario, con solo actualizar el libro y renderizar es suficiente
            /*libro.cambiarDisponibilidad();
            let libro_temp = libro;

            eliminarLibro(isbn);
            agregarLibro(libro_temp);*/ 
            cambiarDisponibilidad(libro);

        }
    }

});