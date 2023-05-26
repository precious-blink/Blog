import axios from 'axios'
import React, { useState } from 'react'

const Modal = ({modal, closeModal}) => {

    const [info, setInfo] = useState({
        title: "",
        content : ""
    })

    const titleHandler = (e) =>{
        setInfo({
            ...info,
            title: e.target.value
        })
    }
    const contentHandler = (e) =>{
        setInfo({
            ...info,
            content: e.target.value
        })
    }
    const saveBlog = async () =>{
        console.log(info.title);
        const feedback = await axios.post('http://localhost:8181/create-blog', {
            title : info.title,
            content : info.content
        })
        if(feedback){
            
            console.log(feedback);
        }
        console.log(feedback)

    }
  return (
    <div className={modal ? 'openModal bg-secondary mx-auto col-md-6 pl-5 pr-5 py-3 mt-2 rounded' : 'modal'}>
        <div className=''>
            <h5 className=' text-dark mb-0'>Create new blog-note</h5>
        </div>
        <hr></hr>
        <form className='form-group'>
            <div className='mb-3'>
            <input className='form-control' value={info.title} onChange={titleHandler} placeholder='Enter blog-title'/>

            </div>
            <div className=''>
            <textarea className='form-control' value={info.content} onChange={contentHandler} cols='30' rows='10' placeholder='Enter blog-content'></textarea>

            </div>

        </form>
        <div className='d-flex justify-content-between'>

        <button onClick={()=>saveBlog()} className='btn btn-md btn-primary'>Create</button>

        <button className='btn btn-md btn-danger' onClick={()=>closeModal()}>Close</button>
        </div>
    </div>
  )
}

export default Modal