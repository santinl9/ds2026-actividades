import logo from '/Mejai27s_Soulstealer_old (1).png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header(){
    const location = useLocation()
    return (
        <>
        <div className="flex flex-row items-center gap-4 h-[70px] px-4 header-footer">
            <img src={logo} alt="Logo" width="30" height="24"></img>
            {location.pathname=='/'?(<strong><Link to='/'>FeedMejai</Link></strong>): (<Link to='/'>FeedMejai</Link>)}
            {location.pathname=='/Catalogo'?(<strong><Link to='/Catalogo'>Catalogo</Link></strong>): (<Link to='/Catalogo'>Catalogo</Link>)}
            {location.pathname=='/Libros'?(<strong><Link to='/Libros'>Libros</Link></strong>): (<Link to='/Libros'>Libros</Link>)}
            {location.pathname=='/Autores'?(<strong><Link to='/Autores'>Autores</Link></strong>): (<Link to='/Autores'>Autores</Link>)}
            {location.pathname=='/Categorias'?(<strong><Link to='/Categorias'>Categorias</Link></strong>): (<Link to='/Categorias'>Categorias</Link>)}
            {location.pathname=='/Contacto'?(<strong><Link to='/Contacto'>Contacto</Link></strong>): (<Link to='/Contacto'>Contacto</Link>)}
        </div>
        </>
    )
}

export default Header
