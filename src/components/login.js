import React ,{useState, useEffect } from 'react';
import { LoginSocialGoogle, LoginSocialFacebook  } from 'reactjs-social-login'

const Login =(props)=>{

    const [show, setShow] = useState(false)
    
    useEffect(()=>{
        if(localStorage.getItem('authInfo')){
            console.log('aqui, entro')
            window.location.href='/'
        }else{
            setShow(true)
        }
    }, [])

    // const onLoginStart = useCallback(() => {
        
    // }, [])
    
    // const onLogoutSuccess = useCallback(() => {
    //     setProfile(null)
    //     setProvider('')
    //     alert('logout success')
        
    // }, [])
    
    const flogin =(e)=>{
        
        // console.log(e, 'flogin')
        

    }
    
    return(
        <div>
            <div className='login'>
                { show &&
                    <>
                    
                        <h2>Iniciar Sesión</h2>

                        <LoginSocialGoogle
                            client_id='329970426386-5jlo53igid074b7o8p76r6plqi3cn0cn.apps.googleusercontent.com'
                            // onLoginStart={onLoginStart}
                            redirect_uri={'/post'}
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={({ provider, data }: IResolveParams) => {
                            
                            if(data.email_verified){
                                
                                let b={
                                    name: data.name,
                                    access_token: data.access_token
                                }
                                flogin(b)
                                // loginFunction(b)
                                window.location.href='/'
                                localStorage.setItem('authInfo',JSON.stringify(b))
                            }
                            }}
                            onReject={err => {
                            console.log(err, 'err');
                            }}
                        >
                            <span className='cursor-pointer login-btn'>Google</span>
                        </LoginSocialGoogle>
                        <hr />
                        <LoginSocialFacebook
                        appId={'1272449583614205'}
                        fieldsProfile={
                            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                        }
                        // onLoginStart={onLoginStart}
                        // onLogoutSuccess={onLogoutSuccess}
                        // redirect_uri={REDIRECT_URI}
                        onResolve={({ provider, data }: IResolveParams) => {
                            if(data){
                                console.log('entrooo')
                                let b={
                                    name: (data.first_name +" "+ data.last_name),
                                    access_token: data.accessToken,
                                }
                                flogin(b)
                                // loginFunction(b)
                                window.location.href='/'
                                localStorage.setItem('authInfo',JSON.stringify(b))
                            }
                            }}
                            onReject={err => {
                            console.log(err, 'err');
                            }}
                        >
                        Facebook
                        </LoginSocialFacebook>
                        
                    
            </>
        }
        </div>
      </div>
    )      
}
export default Login;