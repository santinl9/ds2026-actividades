import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx' //con export default va sin llaves
import Indice from './pages/Indice.tsx';
import LibroDetalle from './pages/LibroDetalle.tsx';
import Catalogo from './pages/Catalogo.tsx';
import ContactoForm from './pages/Contacto.tsx';
import Libros from './pages/Libros.tsx';
import Autores from './pages/Autores.tsx'

function App(){

    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/Libro/:cover_i/:libro_key' element={<LibroDetalle/>}/>
                    <Route path='/' element={<Indice/>}/>
                    <Route path='/Catalogo' element ={<Catalogo/>} />
                    <Route path='/Libros' element={<Libros/>} />
                    <Route path= 'Autores' element={<Autores/>}/>
                    <Route path='/Contacto' element={<ContactoForm/>} />
                </Routes>
            </Layout>
        </>
    )
}

export default App
