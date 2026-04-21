export class Libro {
    isbn;
    titulo;
    autor;
    precio;
    disponible;
    constructor(isbn, titulo, autor, precio) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
        this.disponible = true;
    }
    static crearLibro(isbn, titulo, autor, precio) {
        return new Libro(isbn, titulo, autor, precio);
    }
    verISBN() {
        return this.isbn;
    }
    verTitulo() {
        return this.titulo;
    }
    verAutor() {
        return this.autor;
    }
    verPrecio() {
        return this.precio;
    }
    verDisponibilidad() {
        return this.disponible;
    }
    cambiarDisponibilidad() {
        this.disponible = !this.disponible;
    }
}
export class Catalogo {
    libros;
    constructor() {
        this.libros = [];
    }
    static crearCatalogo() {
        return new Catalogo();
    }
    cargarLibro(libro) {
        this.libros.push(libro);
    }
    eliminarLibro(isbn) {
        this.libros = this.libros.filter(libro => libro.verISBN() !== isbn);
    }
    verLibros() {
        return this.libros;
    }
    verAutor(autor) {
        return this.libros.filter(libro => libro.verAutor() === autor);
    }
    verDisponible() {
        return this.libros.filter(libro => libro.verDisponibilidad());
    }
    verPrecioTotal(libros) {
        let precioTotal = 0;
        for (let libro of libros) {
            precioTotal += libro.verPrecio();
        }
        return precioTotal;
    }
    cantidadLibros(libros) {
        return libros.length;
    }
}
