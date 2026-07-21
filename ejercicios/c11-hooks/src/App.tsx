import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx' //con export default va sin llaves
import Indice from './pages/Indice.tsx';
import LibroDetalle from './pages/LibroDetalle.tsx';
import NuevoLibroForm from './pages/NuevoLibroForm';
import CatalogoPropio from './pages/CatalogoPropio.tsx';
import { useState } from 'react';
import type { libroCargable } from './types/LibroCargable.ts';


function App(){

    const [libros, setLibros]=useState<libroCargable[]>([])

    const cargarLibro=(nuevo_libro: libroCargable)=> setLibros([...libros, nuevo_libro])
    

    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/Libro/:cover_i/:title/:author_name/:libro_key' element={<LibroDetalle/>}/>
                    <Route path='/' element={<Indice/>}/>
                    <Route path='/Catalogo-Propio/Nuevo-Libro' element={<NuevoLibroForm cargarLibro={cargarLibro}/>}/>
                    <Route path='/Catalogo-Propio' element={<CatalogoPropio libros={libros}/>}/>
                </Routes>
            </Layout>
        </>
    )
}

export default App
