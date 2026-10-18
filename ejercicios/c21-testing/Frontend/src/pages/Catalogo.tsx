import Busqueda from "../components/Busqueda"
import { useState } from "react"

function Catalogo(){
    const [input, setInput]=useState<string>("");
    const [titulo, setTitulo]=useState<string>("");

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setTitulo(input)
    }
    return(
        <>
        <div className="fondo">
            <div className="container mx-auto px-4">
                <nav className="flex flex-col gap-4 rounded-lg p-4 shadow md:flex-row md:items-center md:justify-between header-footer">
                    <h1 className="text-xl font-semibold">Busca tu libro</h1>
                    <form 
                        className="flex w-full gap-2 md:w-auto" 
                        role="search"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="search"
                            placeholder="Ingrese el título"
                            aria-label="Search"
                            id="tituloLibro"
                            className="w-full campo"
                            value={input}
                            onChange={(e)=> setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="boton"
                        >
                            Buscar
                        </button>
                    </form>
                </nav>

                <div>
                    <h1>Resultados para {titulo}...</h1>
                    <Busqueda titulo={titulo}/>
                </div>
            </div>
        
        </div>
        </>
    )
}

export default Catalogo
