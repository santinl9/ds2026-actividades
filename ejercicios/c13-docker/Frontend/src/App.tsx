import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx' //con export default va sin llaves
import Indice from './pages/Indice.tsx';
import LibroDetalle from './pages/LibroDetalle.tsx';
import Catalogo from './pages/Catalogo.tsx';
import ContactoForm from './pages/Contacto.tsx';

function App(){

    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/Libro/:cover_i/:title/:author_name/:libro_key' element={<LibroDetalle/>}/>
                    <Route path='/' element={<Indice/>}/>
                    <Route path='/Catalogo' element ={<Catalogo/>} />
                    <Route path='/Contacto' element={<ContactoForm/>} />
                </Routes>
            </Layout>
        </>
    )
}

export default App
