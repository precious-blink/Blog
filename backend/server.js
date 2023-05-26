const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config()
const MongoSessionStore = require("connect-mongodb-session")(session)
const { MongoClient } = require("mongodb")

const client = new MongoClient(process.env.DB_URL)




//create server app
const server = express();


server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
server.use(cookieParser())



const store = new MongoSessionStore({
    uri: process.env.DB_URL,
    collection: process.env.SESSION_STORE
});



//set the session as middleware
server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        httpOnly: false
    }
}))


//set up the endpoints
server.get("/", (request, response) => {
    request.session.isLoggedIn = true
    request.session.current_user = {
        firstname: "James",
        lastname: "John"
    }

    console.log(request.session)
    response.send({
        message: "API working fine"
    })

})

server.post("/login", (request, response) => {
    //
    request.session.isLoggedIn = true
    console.log(request.session)
    response.send({})

})


server.post("/adminlogin", async (request, response) => {

    console.log("works")

    console.log(request.body)

    let username = request.body.username;
    let password = request.body.password;

   try{
        
        const result = await client.db(process.env.DB_NAME).collection("user_storage").findOne({"username": username, "password": password } );

        console.log(result)
        if(result){
        //login the user
        request.session.admin_logged_in = true;
        request.session.current_admin = result;

        response.status(200).send({
            message: 'Admin logged in',
            code: "success",
            data: {
                current_admin: username,
                token: request.sessionID
            }
        })
        
    }else{

        response.status(404).send({
            message: "Admin could not be found",
            code: "error",
            data: null
        })

    }


   }catch(error){
        console.log(error.message)

        response.status(500)
        response.send({
            message: "An error just occured: ",
            reason: error.message,
            code: "error",
            data: null
        })

   }

   

    



})



server.post("/adminlogout", (request, response) => {

    request.session.destroy(() => {

            console.log("Admin logged out")

            response.send({
                message: "Admin logged out",
                code: "logout-success",
                data: null
            })
    })


    

})

server.post('/create-blog', async(req, res)=>{
  let {title, content} = req.body

  if (!title || !content) {
    res.status(400).send({
        code: 'error',
        message: "All fields are required"
    })
  }

  console.log(req);
    if (req.session.current_admin) {
        const createBlog = await client.db(process.env.DB_NAME).collection("note-storage").insertOne({
            feedback : feedback,
            title : title,
            content : content
        })
        if (!createBlog) {
            res.status(500).send({
                code: 'error',
                message: 'something went wrong'
            })
        }
        res.status(200).send({
            code: 'success',
            message: 'blog created successfully',
            data: createBlog
        })
    }else{
        res.status(401).send({
            code: 'error',
            message: 'unauthorized'
        })

    }
})


//listening
server.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))



