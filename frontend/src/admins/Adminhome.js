import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import Modal from "../utilities/Modal";

function AdminHome({current_admin, logout_admin}){

    const navigate = useNavigate();

    const [modal, setModal] = useState(false)

    const admin_token = Cookies.get('connect.sid')

    useEffect(()=>{
        if (!admin_token) {
            navigate('/admin')
        }

    }, [admin_token])
    // console.log("CUrrent Admin from AdminHome: ", props)

    

    // if(props.current_admin == null){
    //     //redirect
    //     navigate("/admin")
    // }


    const logoutAdmin = async (event) => {
        //logout the admin
        event.preventDefault()
        // props.logout_admin()

        //send a request to the backend to logout the user
        const logout_feedback = await axios.post("/adminlogout")

        if(logout_feedback.data.code === "logout-success"){
            logout_admin()
        }else{
            //
        }

       
    }

    const openModal = () =>{
        setModal(true)
    }

    const closeModal = () =>{
        setModal(false)
    }

    return <>
                <div className="container">
                    <Modal modal ={modal} closeModal={()=> closeModal()}/>
                        <div className="row mt-5">
                               <div className="col-md-8 mx-auto">
                                    <div className="card bg-dark text-white">
                                            <div className="card-header">
                                                <h5>Admin Dashboard | <small>Welcome {current_admin}</small></h5>
                                                <hr></hr>
                                                <h6><a href="" className="text-light">Update Profile</a></h6>
                                            </div>

                                            <div className="card-body">
                                            <ul class="nav">
                                                <li class="nav-item">
                                                    <a class="nav-link text-white active" href="#" onClick={() => openModal()}>Create Article</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#">Create Category</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#">Add Admin</a>
                                                </li>
                                                <li class="nav-item m-auto">
                                                    <a href="#" class="nav-link text-danger font-weight-bold" onClick={logoutAdmin}>Log out</a>
                                                </li>
                                            </ul>



                                            </div>

                                    </div>

                               </div>
                        </div>
                </div>



            </>


}

export default AdminHome