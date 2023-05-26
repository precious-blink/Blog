import { Link } from "react-router-dom"
function Home(){

    return <>
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
    
    <main role="main">
    
    <section class="jumbotron text-center">
    <div class="container">
    <h1>Movies Base</h1>
    <p class="lead text-muted">Access all the movies that you love in one place...</p>
    <p>
  
    <Link to="/login" className="btn btn-primary my-2">Get Started</Link>
    </p>
    </div>
    </section>
    
    <div class="album py-5 bg-light">
    <div class="container">
    
    <div class="row">
    
    </div>
    </div>
    </div>
    
    </main>
    
    
    </>

}

export default Home