import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState } from "react"
import axios from "axios"

function AdminLogin(props){

    const navigate = useNavigate()

    useEffect(()=>{
        if(props.globalState.is_admin_logged_in == true){
            navigate("/admin/adminhome")
        }

    }, [props.globalState.is_admin_logged_in])

   const [currentState, changeState] = useState({
        username: "",
        password: "",
        signinerrors: "",
        loadSpinner: false
   })



   const handleUsername = event => {
        changeState({
            ...currentState,
            username: event.target.value
        })
   }


   const handlePassword = event => {
        changeState({
            ...currentState,
            password: event.target.value
        })
   }

   const startSpinner = () => {

        changeState({
            ...currentState,
            loadSpinner: true
        })

   }

   const stopSpinner = () => {

        changeState({
            ...currentState,
            loadSpinner: false
        })

    }

   

   const SignInAdmin = async (event) => {
            event.preventDefault()

            console.log(currentState)
           
            const username = currentState.username.trim().length > 0 ? currentState.username.trim() : null;
            const password = currentState.password.trim().length > 0 ? currentState.password.trim() : null;

            if(username != null && password != null){
                //clear the signin error
                changeState({
                    ...currentState,
                    signinerrors: ""
                })

                //use axios
                //introduce a spinner
                startSpinner()
                const feedback = await axios.post("http://localhost:8181/adminlogin", {username, password},  {
                    withCredentials: true
                })

                const data = feedback.data
                // const token = data.data.token
                
                if(data.code === "success"){
                    //logged in
                    //save the token as cookie
                    stopSpinner()
                    props.loginAdmin(data.data.current_admin);
                    console.log(feedback);




                }else{

                    console.log(feedback);    

                }




            }else{
                changeState({
                    ...currentState,
                    signinerrors: <div className="alert alert-danger">Please enter both username and password</div>
                })

                
            }


   }

    return <>
    <header class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="#">MoviesBase | Admin</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#">Features</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#">Pricing</a>
    </li>
    </ul>
    <span class="navbar-text">
    <Link to="/login" className="nav-link">Sign In</Link>
    </span>
    </div>
    </nav>        
    </header>
    
    <main role="main">
    
    <section class="jumbotron text-center">
    <div class="container">
    <h1>Movies Base | Administrators</h1>
    <p class="lead text-muted">Control your platform from here</p>
    </div>
       <div>
            {
                currentState.loadSpinner == true ? <> 
                                    <div className="spinner-border mt-5" role="status">
                                        <span className="sr-only">Loading...</span>
                        
                                    </div>
                <div>Logging you in. Please wait ...</div></>: 
                ""
            }
       </div>

    </section>
    
    <div>
    <div className="row mt-2" >
                    
                    <div className="col-md-6 mx-auto">
                    <form onSubmit={SignInAdmin} method="POST">
                        <h5>Sign in</h5>
                        <hr></hr>

                        {currentState.signinerrors}

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={currentState.username} name='username' className="form-control" onChange={handleUsername}></input>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={currentState.password} name='password' className="form-control" onChange={handlePassword}></input>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-md btn-primary">Sign in</button>
                    </div>
            </form>
                    </div>
                </div>
    </div>
    
    </main>
    
    
    </>

}

export default AdminLogin