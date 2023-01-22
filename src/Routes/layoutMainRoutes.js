import React, { useEffect} from 'react';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/login';
import Post from '../components/post';
import NavBar from '../components/base/header'

const LayoutMainRoutes = (props) => {
    
    useEffect(()=>{
      
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <>
        <Router>
            { localStorage.getItem('authInfo') &&
                <NavBar />
            }
            <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route path="/" exact element={<Post />}  />
            </Routes> 
       </Router>
        </>
    )
}
export default LayoutMainRoutes;
  