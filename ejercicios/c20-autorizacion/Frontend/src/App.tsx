import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Indice from './pages/Indice.tsx';
import LibroDetalle from './pages/LibroDetalle.tsx';
import Catalogo from './pages/Catalogo.tsx';
import ContactoForm from './pages/Contacto.tsx';
import Libros from './pages/Libros.tsx';
import Autores from './pages/Autores.tsx';
import Categorias from './pages/Categorias.tsx';
import Login from './pages/Login.tsx';
import { AuthProvider } from './components/context/AuthContext.tsx';
import { PrivateRoute } from './components/PrivateRoute.tsx';
import SinPermiso from './pages/SinPermiso.tsx';
import SoloAdmin from './pages/SoloAdmin.tsx';

function App(){

    return (
        <>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path='/Libro/:cover_i/:libro_key' element={<LibroDetalle/>}/>
                        <Route path='/' element={<Indice/>}/>
                        <Route path='/Catalogo' element={<Catalogo/>} />
                        <Route path='/Libros' element={<Libros/>} />
                            <Route path='/Autores' element={<Autores/>}/>
                            <Route path='/Categorias' element={<Categorias/>}/>
                        <Route element={<PrivateRoute rol={"ADMIN"}/>}>
                            <Route path='/Solo-Admin' element={<SoloAdmin/>}></Route>
                        </Route>
                        <Route path='/Contacto' element={<ContactoForm/>} />
                        <Route path='/Login' element={<Login/>} />
                        <Route path='/Sin-Permiso' element={<SinPermiso/>}/>
                    </Routes>
                </Layout>
            </AuthProvider>
        </>
    );
}

export default App;
