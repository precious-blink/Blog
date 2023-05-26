import { Link } from "react-router-dom"
function Login(){

    

    return <>
           <div className="container">
                <header class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="#">MoviesBase</a>
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
                <div className="row mt-5" >
                    
                    <div className="col-md-6 mt-5 mx-auto">
                    <form>
                        <h5>Create Account</h5>
                        <hr></hr>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-md btn-primary">Create Account</button>
                    </div>
            </form>
                    </div>
                </div>
           </div>
            </>



}

export default Login