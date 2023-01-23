import React ,{useState, useEffect } from 'react';
import { LoginSocialGoogle, LoginSocialFacebook  } from 'reactjs-social-login'
import Spinner from './base/spiner';

const Login =(props)=>{

    const [show, setShow] = useState(false)
    const [showLoad, setShowLoad] = useState(false)
    
    useEffect(()=>{
        if(localStorage.getItem('authInfo')){
            window.location.href='/'
        }else{
            setShow(true)
        }
    }, [])

    
    return(
        <div>
            { showLoad && <Spinner /> }
            <div className='login'>
                { show &&
                    <>
                        <h2>Iniciar Sesión</h2>
                        <hr />
                        <LoginSocialGoogle
                            client_id='329970426386-5jlo53igid074b7o8p76r6plqi3cn0cn.apps.googleusercontent.com'
                            // onLoginStart={onLoginStart}
                            redirect_uri={'/post'}
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={({ provider, data }: IResolveParams) => {
                                setShowLoad(true)
                            if(data.email_verified){
                                
                                let b={
                                    name: data.name,
                                    access_token: data.access_token
                                }
                                
                                window.location.href='/'
                                localStorage.setItem('authInfo',JSON.stringify(b))
                            }
                            }}
                            onReject={err => {
                            console.log(err, 'err');
                            }}
                        >
                            <div className='cursor-pointer login-btn google'> <i className="fab fa-google"></i> Google</div>
                        </LoginSocialGoogle>
                        
                        <LoginSocialFacebook
                            appId={'1272449583614205'}
                            fieldsProfile={
                                'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                            }
                        onResolve={({ provider, data }: IResolveParams) => {
                            setShowLoad(true)
                            if(data){
                                let b={
                                    name: (data.first_name +" "+ data.last_name),
                                    access_token: data.accessToken,
                                }
                               
                                window.location.href='/'
                                localStorage.setItem('authInfo',JSON.stringify(b))
                            }
                            }}
                            onReject={err => {
                            console.log(err, 'err');
                            }}
                        >
                        <div className='cursor-pointer login-btn facebook'> <i class="fab fa-facebook-f"></i> Facebook</div>
                        </LoginSocialFacebook>
                        
                    
            </>
        }
        </div>
      </div>
    )      
}
export default Login;