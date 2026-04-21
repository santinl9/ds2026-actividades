export class Libro{
    isbn : string;
    titulo : string;
    autor: string;
    precio: number;
    disponible: boolean;

    constructor(isbn: string, titulo: string, autor: string, precio: number){
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
        this.disponible = true;
    }

    static crearLibro(isbn: string, titulo: string, autor: string, precio: number): Libro{
        return new Libro(isbn, titulo, autor, precio);
    }

    verISBN(): string{
        return this.isbn;
    }
    verTitulo(): string{
        return this.titulo;
    }
    verAutor(): string{
        return this.autor;
    }
    verPrecio(): number{
        return this.precio;
    }
    verDisponibilidad(): boolean{
        return this.disponible;
    }
    cambiarDisponibilidad():void{
        this.disponible = !this.disponible;
    }

}

export class Catalogo{
    libros: Libro[];

    constructor(){
        this.libros = [];
    }

    static crearCatalogo(): Catalogo{
        return new Catalogo();
    }

    cargarLibro(libro: Libro): void{
        this.libros.push(libro);
    }
    eliminarLibro(isbn: string): void{
        this.libros = this.libros.filter(libro => libro.verISBN() !== isbn);
    }
    verLibros(): Libro[]{
        return this.libros;
    }
    verAutor(autor: string): Libro[]{
        return this.libros.filter(libro => libro.verAutor() === autor);
    }
    verDisponible(): Libro[]{
        return this.libros.filter(libro => libro.verDisponibilidad());
    }
    verPrecioTotal(libros: Libro[]): number{
        let precioTotal : number =0;

        for (let libro of libros){
            precioTotal += libro.verPrecio();
        }
        
        return precioTotal;
    }
    cantidadLibros(libros : Libro[]): number{
        return libros.length;
    }
}