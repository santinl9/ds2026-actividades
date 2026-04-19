const cargar_producto=(nombre)=>{
    
    const boton_eliminar = document.createElement('button');
    boton_eliminar.id = 'eliminar_producto';
    boton_eliminar.innerHTML = 'eliminar';

    const producto = document.createElement('li');
    producto.innerHTML = nombre;
    producto.appendChild(boton_eliminar);

    return producto;
}

const eliminar_producto =(producto)=>{

    producto.remove();
    console.log("producto eliminado con éxito");
    
}

const boton_carga = document.querySelector('#agregar_producto');
const boton_vaciar =document.querySelector('#vaciar_lista')
const lista_productos = document.querySelector('#lista_productos');

boton_carga.addEventListener('click',()=>{

    const nombre_prodcuto = document.querySelector('#nombre_producto').value;
    const producto = cargar_producto(nombre_prodcuto);
    lista_productos.appendChild(producto);
    
});

boton_vaciar.addEventListener('click',()=>{

    lista_productos.innerHTML = '';
    console.log("lista vaciada con éxito");
});

//const boton_eliminar = document.querySelector('#eliminar_producto'); se asigna en null antes de siquiera cargar cualquier cosa

lista_productos.addEventListener('click',(event)=>{  //escuchar clicks en la lista es la forma de no depender de un elemento que no existe inicialmente
    
    let elemento = event.target; 
    if(elemento.id === 'eliminar_producto'){ //con esto me aseguro que el click sea un botón de eliminar
        eliminar_producto(elemento.parentElement);
    }

});