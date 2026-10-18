import type { ReactNode } from 'react';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

interface layoutProps{
    children: ReactNode;
}

function Layout({children}: layoutProps){
    return(
        <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-[antiquewhite] font-[Georgia,'Times_New_Roman',Times,serif] text-lg">
            <Header/>
                <div className='flex-1'>
                    {children}
                </div>
            <Footer/>       
        </div>
    )
}

export default Layout
