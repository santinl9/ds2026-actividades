import logo from '/Mejai27s_Soulstealer_old (1).png';
import { Link, useLocation } from 'react-router-dom';
import { obtenerToken, borrarToken } from '../../services/sesion';

function Header(){
    const location = useLocation();
    const token = obtenerToken();

    return (
        <div className="flex flex-row items-center gap-4 h-[70px] px-4 header-footer flex-wrap">
            <img src={logo} alt="Logo" width="30" height="24" />
            {location.pathname === '/' ? (<strong><Link to='/'>FeedMejai</Link></strong>) : (<Link to='/'>FeedMejai</Link>)}
            {location.pathname === '/Catalogo' ? (<strong><Link to='/Catalogo'>Catalogo</Link></strong>) : (<Link to='/Catalogo'>Catalogo</Link>)}
            {location.pathname === '/Libros' ? (<strong><Link to='/Libros'>Libros</Link></strong>) : (<Link to='/Libros'>Libros</Link>)}
            {location.pathname === '/Autores' ? (<strong><Link to='/Autores'>Autores</Link></strong>) : (<Link to='/Autores'>Autores</Link>)}
            {location.pathname === '/Categorias' ? (<strong><Link to='/Categorias'>Categorias</Link></strong>) : (<Link to='/Categorias'>Categorias</Link>)}
            {location.pathname === '/Contacto' ? (<strong><Link to='/Contacto'>Contacto</Link></strong>) : (<Link to='/Contacto'>Contacto</Link>)}
            {location.pathname === '/Login' ? (<strong><Link to='/Login'>Login</Link></strong>) : (<Link to='/Login'>Login</Link>)}
            {token && (
                <button
                    type="button"
                    onClick={() => { borrarToken(); window.location.reload(); }}
                    className="ml-auto text-xs px-2 py-1 rounded bg-red-800 text-white hover:bg-red-700"
                >
                    Salir
                </button>
            )}
        </div>
    );
}

export default Header;
