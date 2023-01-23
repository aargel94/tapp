import React ,{useEffect, useState } from 'react';

const Header =(props)=>{

    const [datosUser, setDatosUser] = useState({})
    const [open, setOpen] =useState(false)
    useEffect(()=>{
        if( localStorage.getItem('authInfo')){
           let b= JSON.parse(localStorage.getItem('authInfo'))    
           setDatosUser(b)  
          
        }else{
            window.location.href='/login'
        }
        
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const logout=()=>{
        localStorage.removeItem('authInfo');
        // remove all
        localStorage.clear();
        window.location.href='/login'
    }
    return(
        <>
        { datosUser &&
            <header className='d-flex'>
                
                <div className='mx-2 fw-900 fs-25'>
                    TApp
                </div>
                <div className='mx-2 cursor-pointer' onClick={()=>setOpen(!open)}>
                    {datosUser.name} <i className="fas fa-chevron-down"></i>
                </div>
                {   open &&
                    <div className='menu-down cursor-pointer' onClick={logout}>
                        Salir
                    </div>
                }
                
            </header>
        }
        
        </>
    )
}
export default Header;