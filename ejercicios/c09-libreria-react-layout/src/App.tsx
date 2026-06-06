import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx' //con export default va sin llaves
import Indice from './pages/Indice.tsx';
import LibroDetalle from './pages/LibroDetalle.tsx';


function App(){

    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/Libro/:cover_i/:title/:author_name/:key' element={<LibroDetalle/>}/>
                    <Route path='/' element={<Indice/>}/>
                </Routes>
            </Layout>
        </>
    )
}

export default App
