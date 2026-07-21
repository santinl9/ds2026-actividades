import '../App.css'

type CargableCardProps={
    portada: string;
    titulo: string;
    autor?: string;
    precio: number
}

function CargableCard ({portada, titulo, autor, precio}: CargableCardProps){

    return(
        <>
        <div className='card flex flex-col items-center'>
          <img src={portada} alt="portada no disponible" className='w-[190px] h-[273px]'></img>
          <h5>{`Titulo:${titulo}`}</h5>
          <p>{`Autor: ${autor??'autor anónimo'}`}</p>
          <p>{`$${precio}`}</p>
          <button>comprar</button>
        </div>
        </>
      )
}

export default CargableCard;