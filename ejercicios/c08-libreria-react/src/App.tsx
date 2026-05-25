import './App.css';
import {useState} from 'react';
import {Navbar } from './Navbar.tsx';
import {Indice } from './Indice.tsx';
import {Librotsx } from './Libro.tsx';

export type PaginaProps ={
  pagina: number;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
}

export interface Libro {
  title: string,
  author_name?: string[],
  cover_i: number,
  key: string
}

export function App(){

  const [pagina, setPagina] = useState<number>(1);
  const [libro, setLibro] = useState<Libro | undefined>();

  return(
    <>
    <Navbar 
      pagina={pagina} 
      setPagina={setPagina}>
    </Navbar>
    {
    (pagina==1
    && <Indice
          setLibro={setLibro}
          setPagina={setPagina}>
      </Indice>
    )
    ||
    (pagina==4
    && <Librotsx
          libro={libro}
          setPagina={setPagina}>
      </Librotsx>
    )
    }
    </>
  )
}
