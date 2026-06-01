import './App.css';
import {useState} from 'react';
import {Navbar } from './components/layout/Navbar.tsx';
import {Indice } from './pages/Indice.tsx';
import {Librotsx } from './pages/Libro.tsx';
import type { Libro } from './types/Libro.ts';

export type PaginaProps ={
  pagina: number;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
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
