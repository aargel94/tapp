import React ,{useEffect, useState } from 'react';
import Call from '../config/Call'
import moment from 'moment'
import Spiner from '../components/base/spiner'

const Post =(props)=>{
    const [datosUser, setDatosUser] = useState({})
    const [show, setShow] = useState(false) // SHOW INFO
    const [allPost, setAllPost]=useState([])
    const [lPost, setLPost] = useState([]) //LIST POST
    const [lTags, setLTags] = useState([]) // LIST TAGS
    const [showModal, setShowModal] = useState(false)
    const [infoModal, setInfoModal] = useState("") //MODAL COMMNETS
    const [showModalUser, setShowModalUser] = useState(false) //MODAL INFO USER
    const [detalleUser , setDetalleUser] = useState("")
    const [tagSelected, setTagSelected] = useState("todos")
    const [showLoad, setShowLoad] = useState(false)

    useEffect(()=>{
        if( localStorage.getItem('authInfo')){
           let b= JSON.parse(localStorage.getItem('authInfo'))    
           setDatosUser(b)  
           listPost()   
           setShow(true) 
        }else{
            window.location.href='/login'
        }
        
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    
    const listPost = async()=>{
        setShowLoad(true)
        const res = await Call('GET', '/post', true, null, false)
        if(res.data.data.length>0){
            let t =[]
            
            for(let i =0; i<res.data.data.length; i++){
                for(let j=0; j<res.data.data[i].tags.length; j++){
                   let b= t.filter(element => element === res.data.data[i].tags[j])
                   if(b.length === 0){
                    t.push(res.data.data[i].tags[j])
                   }
                }
                
            }
            setLTags(t)
        }
        setLPost(res.data.data)
        setAllPost(res.data.data)
        setShowLoad(false)
    }
    const listComents = async (id)=>{
        setShowLoad(true)
        const res = await Call('GET', `/post/${id}/comment`, true, null, false)
        console.log(res.data.data, 'get info user')
        setInfoModal(res.data.data)
        setShowModal(true)
        setShowLoad(false)
        
        
    }
    const getInfoUser= async (id)=>{
        setShowLoad(true)
        const res = await Call('GET', `/user/${id}`, true, null, false)
        setDetalleUser(res.data)
        setShowModalUser(true)
        setShowLoad(false)
    }
    const filtrarTag=(tag)=>{
        setShowLoad(true)
        if(tag !== 'todos'){
            let nuevo=[]
            for(let i=0; i<allPost.length; i++){
                for(let j=0; j<allPost[i].tags.length; j++){
                    if(allPost[i].tags[j] === tag){
                        nuevo.push(allPost[i])
                    }
                }
            }
        setLPost(nuevo)
        setShowLoad(false)
        }else{
            setLPost(allPost)
            setShowLoad(false)
        }
        
    }
    const Modal=()=>{
            return(
                <div className='modal'>
                    <div className='header-modal'>
                        <div className='fw-500'>   
                            Comentarios
                        </div>
                        <div className='cursor-pointer' onClick={()=>{setShowModal(false); setInfoModal("")}}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <div className='body-modal'>
                        {
                            infoModal && infoModal.length > 0 ?
                                <div className='comments-modal'>
                                    {
                                        infoModal.map((i, indexi)=>(
                                            <div key={indexi} className="my-1">
                                               <div className='info'>
                                                <div className='w-100 fs-12 text-left mb-1'>
                                                    Fecha: {moment(i.publishDate).format("DD-MM-YYYY hh:mm:ss")}
                                                </div>
                                                <div className='w-100 user-comments'>
                                                    <div className='mr-1'>
                                                        <img src={i.owner.picture} alt="" width={50} className='img-circle'/>
                                                    </div>
                                                    <div className='text-capitalize text-left'>
                                                       <span className='fw-500'> {i.owner.title+". " +i.owner.firstName+" "+ i.owner.lastName}</span>
                                                        <div>
                                                            {i.message}
                                                        </div>
                                                    </div>
                                                </div> 
                                                </div>    
                                            </div>
                                        ))
                                    }
                                </div>
                            :
                                <div>
                                    <div className='m-auto empty'>
                                        <i className="fas fa-box-open fs-30"></i>
                                    </div>
                                    No hay comentarios para mostrar
                                </div>
                        }
                    </div>
                </div>
            
        )
}

const ModalUser=()=>{
    return(
        <div className='modal'>
            <div className='header-modal'>
                <div className='fw-500 text-capitalize'>   
                    {detalleUser && detalleUser.title+". "+ detalleUser.firstName+" "+ detalleUser.lastName}
                </div>
                <div className='cursor-pointer' onClick={()=>{setShowModalUser(false); setDetalleUser("")}}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className='body-modal'>
                <div className='text-left d-flex align-center'>
                    <img src={detalleUser.picture} alt="" width={100} className="img-circle" />
                     <div className='fw-500 text-capitalize name-user'> 
                        {detalleUser && detalleUser.title+". "+ detalleUser.firstName+" "+ detalleUser.lastName}
                        <div className='fs-12 c-lgray'><i className="far fa-envelope"></i> {detalleUser.email}</div>
                     </div>
                </div>
                <hr />
                <h2>Información personal </h2>
                <div className='text-left fs-13'>
                    <div className='my-1'>
                        <span className='fw-500'><i className="fas fa-transgender-alt"></i> Género:</span> <span className='text-capitalize'>{detalleUser.gender}</span>
                    </div>
                    <div className='my-1'>
                        <span className='fw-500'><i className="fas fa-calendar"></i> Fecha nacimiento:</span> <span className='text-capitalize'>{moment(detalleUser.dateOfBirth).format("DD/MM/YYYY") }</span>
                    </div>
                    <div className='my-1'>
                        <span className='fw-500'><i className="fas fa-phone rotate90"></i> Teléfono:</span> <span className='text-capitalize'>{detalleUser.phone}</span>
                    </div>
                    <div className='my-1'>
                        <span className='fw-500'><i className="fas fa-map-marker-alt"></i> País:</span> <span className='text-capitalize'>{detalleUser.location.country}</span>
                        <div  className='my-1'>
                            <span className='fw-500'>Ciudad:</span> <span className='text-capitalize'>{detalleUser.location.city}</span>
                        </div>
                        <div  className='my-1'>
                            <span className='fw-500'>Estado:</span> <span className='text-capitalize'>{detalleUser.location.state}</span>
                        </div>
                        <div className='my-1'>
                            <span className='fw-500'>Dirección:</span> <span className='text-capitalize'>{detalleUser.location.street}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
)
}
    return (
        <div className='container'>
            {showLoad && <Spiner />}
        {showModal &&  <Modal />}
        { showModalUser && <ModalUser/> }
            {show && <>
                <div className='mt-3'><h1>Hola! {datosUser.name}</h1></div>
                    <div className='post-container'> 
                        {/* INIT TAGS */}
                        <div className='fs-25 fw-900 w-100'>
                            Categorias
                            <hr />
                        </div>
                        {/* <hr/> */}
                        <div  className='list-tags'>
                            <div onClick={()=>{setTagSelected('todos'); filtrarTag('todos')}} className={`tag ${tagSelected === 'todos' ? 'selected': ''}`}>Todos</div>
                            {
                                lTags && lTags.map((lt, indexlt)=>(
                                    <div key={indexlt} className={`tag ${tagSelected === lt ? 'selected': ''}`} onClick={()=>{setTagSelected(lt); filtrarTag(lt)}}>
                                        {lt}
                                    </div>
                                ))
                            }
                        </div>
                        {/* INIT POST */}
                        {
                            lPost && lPost.map((p, indexp)=>(
                                <div className="post" key={indexp}>
                                    <div className='d-img'>
                                        <img src={p.image} alt="" />
                                    </div>
                                    <hr />
                                    <div className='d-flex mt-2 align-center cursor-pointer' onClick={()=>getInfoUser(p.owner.id) }>
                                        <div >
                                            <img src={p.owner.picture} className="img-user" alt="" />
                                        </div>
                                        <div className='text-capitalize mx-2'>
                                            {p.owner.title +". "+ p.owner.firstName + " " +p.owner.lastName}
                                        </div>
                                    </div>
                                    <div className='text-post'>
                                        {p.text.charAt(0).toUpperCase() + p.text.slice(1)}
                                    </div>
                                    <div className='text-left my-1 w-90'>
                                        {
                                            p.tags && p.tags.map((t, indext)=>(
                                                <span key={indext} className="tags" >
                                                    {t.charAt(0).toUpperCase()+ t.slice(1)}
                                                </span>
                                            ))
                                        }
                                    </div>
                                    <div className='text-left'>
                                        <span className='mx-1 c-primary'>
                                            <i className="fas fa-thumbs-up"></i> {p.likes}
                                        </span>
                                        <span className='mx-1 c-sec cursor-pointer' onClick={()=>{listComents(p.id) }}>
                                            <i className="fas fa-comment"></i> 
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}
export default Post;