import '../App.css';
import Tendencias from '../components/Tendencias';

function Indice(){
  
    return(

        <>
        <div className='h-screen'>
            <div className='flex flex-col items-center bg-[url(../public/Mejai27s_Soulstealer_old.png)] bg-no-repeat bg-center h-[250px]' id="titulo_indice">
                <h1>Bienvenido!</h1>
                <h2>Librería FeedMejai</h2>
            </div>
            <button className='w-screen'>Visitar Catálogo</button>
            <h1>Libros mejor valorados</h1>
            <Tendencias/>
            
        </div>
        </>
    )

}

export default Indice