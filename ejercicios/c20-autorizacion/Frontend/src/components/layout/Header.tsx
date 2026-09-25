import logo from '/Mejai27s_Soulstealer_old (1).png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header(){
    const location = useLocation();
    const {usuario, logout} =useAuth();
    const navigate = useNavigate();

    const manejarSesion=()=>{
        if (usuario){
            logout();
            navigate("/");
        }
        else navigate("/Login")
    }

    return (
        <div className="flex flex-row items-center gap-4 h-[70px] px-4 header-footer flex-wrap">
            <img src={logo} alt="Logo" width="30" height="24" />
            {location.pathname === '/' ? (<strong><Link to='/'>FeedMejai</Link></strong>) : (<Link to='/'>FeedMejai</Link>)}
            {location.pathname === '/Catalogo' ? (<strong><Link to='/Catalogo'>Catalogo</Link></strong>) : (<Link to='/Catalogo'>Catalogo</Link>)}
            {location.pathname === '/Libros' ? (<strong><Link to='/Libros'>Libros</Link></strong>) : (<Link to='/Libros'>Libros</Link>)}
            {location.pathname === '/Autores' ? (<strong><Link to='/Autores'>Autores</Link></strong>) : (<Link to='/Autores'>Autores</Link>)}
            {location.pathname === '/Categorias' ? (<strong><Link to='/Categorias'>Categorias</Link></strong>) : (<Link to='/Categorias'>Categorias</Link>)}
            {location.pathname === '/Contacto' ? (<strong><Link to='/Contacto'>Contacto</Link></strong>) : (<Link to='/Contacto'>Contacto</Link>)}
            {location.pathname === '/Solo-Admin' ? (<strong><Link to='/Solo-Admin'>Solo Admin</Link></strong>) : (<Link to='/Solo-Admin'>Solo Admin</Link>)}
            {!usuario && (location.pathname === '/Login' ? (<strong><Link to='/Login'>Login</Link></strong>) : (<Link to='/Login'>Login</Link>))}
            
            <div className='ml-auto'>
            {usuario && <span>Hola, {usuario.nombre} </span>}
            <button className="boton ml-auto" onClick={manejarSesion}>
                {usuario ? 'Salir' : 'Ingresar'}
            </button>
            </div>
        </div>
    );
}

export default Header;
