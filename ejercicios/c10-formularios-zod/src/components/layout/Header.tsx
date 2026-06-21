import '../../App.css';
import logo from '../../../public/Mejai27s_Soulstealer_old (1).png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header(){
    const location = useLocation()
    return (
        <>
        <div className="flex flex-row items-center gap-4 h-[70px] header-footer">
            <img src={logo} alt="Logo" width="30" height="24"></img>
            {location.pathname=='/'?(<strong><Link to='/'>FeedMejai</Link></strong>): (<Link to='/'>FeedMejai</Link>)}
            {location.pathname=='/Catalogo'?(<strong><Link to='Catalogo'>Catalogo</Link></strong>): (<Link to='/Catalogo'>Catalogo</Link>)}
            {location.pathname=='/Catalogo-Propio'?(<strong><Link to='Catalogo-Propio'>Catalogo</Link></strong>): (<Link to='/Catalogo-Propio'>Catalogo Propio</Link>)}
            {location.pathname=='/Contacto'?(<strong><Link to='Contacto'>Contacto</Link></strong>): (<Link to='/Contacto'>Contacto</Link>)}
            {location.pathname=='/Libro'?(<strong><Link to='Libro'>Libro</Link></strong>): (<Link to='/Libro'>Libro</Link>)}

        </div>
        </>
    )
}

export default Header