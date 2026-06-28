import type { ReactNode } from 'react';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

interface layoutProps{
    children: ReactNode;
}

function Layout({children}: layoutProps){
    return(
        <>
            <Header/>
                <div className='cuerpo'>
                    {children}
                </div>
            <Footer/>       
        </>
    )
}

export default Layout