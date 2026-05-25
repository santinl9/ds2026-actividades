import './App.css';
import type {PaginaProps} from './App.tsx';
import logo from '../public/Mejai27s_Soulstealer_old (1).png';

export function Navbar({pagina, setPagina}: PaginaProps){

    return (
        <>
        <div id="navbar" className="flex flex-row items-center gap-4 h-[70px]">
            <img src={logo} alt="Logo" width="30" height="24"></img>
            {pagina==1?(<strong><a onClick={ ()=> setPagina(1)}>FeedMejai</a></strong>): (<a onClick={ ()=> setPagina(1)}>FeedMejai</a>)}
            {pagina==2?(<strong><a onClick={ ()=> setPagina(2)}>Catálogo</a></strong>): (<a onClick={ ()=> setPagina(2)}>Catálogo</a>)}
            {pagina==3?(<strong><a onClick={ ()=>setPagina(3)}>Contacto</a></strong>): (<a onClick={ ()=>setPagina(3)}>Contacto</a>)}
            {pagina==4?(<strong><a onClick={ ()=>setPagina(4)}>Libro</a></strong>): (<a onClick={ ()=>setPagina(4)}>Libro</a>)}
        </div>
        </>
    )
}
