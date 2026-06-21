import '../App.css'
import type { libroCargable } from '../types/LibroCargable';
import portadaBase from '../../public/Captura de pantalla 2026-06-08 095254.png'

type CargableCardProps={
    libro: libroCargable;
}

function CargableCard ({libro}: CargableCardProps){

    return(
        <>
        <div className='card flex flex-col items-center'>
          <img src={portadaBase} alt="portada no disponible" className='w-[190px] h-[273px]'></img>
          <h5>{`Titulo:${libro.titulo}`}</h5>
          <p>{`Autor: ${libro.autor??'autor anónimo'}`}</p>
          <p>{`$${libro.precio}`}</p>
          <button>comprar</button>
        </div>
        </>
      )
}

export default CargableCard;