import "bootstrap/dist/css/bootstrap.min.css"
import "./album.css"
import "bootstrap/dist/js/bootstrap.min.js"
import  {BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import AdminLogin from "./admins/AdminLogin"
import Home from "./Home"
import AdminHome from "./admins/Adminhome"
import axios from "axios"
import Cookies from "js-cookie"
import localforage from "localforage"

import { useNavigate } from "react-router-dom"

import { useState, useEffect } from "react"
import { AuthProvider } from "./utilities/auth"

function App(){


    //define the global state
    const [currentGlobalState, setGlobalState] = useState({
        is_admin_logged_in: checkCurrentAdminLoggedIn(),
        current_admin: getCurrentAdmin()
    });


    function checkCurrentAdminLoggedIn(){
        //check for session token returned from the backend

        const admin_token = Cookies.get("connect.sid");

        console.log(admin_token)
        

        if(!admin_token){
            return false;
        }

        return true;
    }

    function getCurrentAdmin(){
        //check current token and use that token to get current user
        const admin_token = Cookies.get("connect.sid");

        if(!admin_token){
            return null
        }

        //return await localforage.getItem("current-admin");
        return "Jerry Admin"
        
       
    }



    // const navigate = useNavigate()

    const checkAdminLoggedIn = () => {
        //look for the data in the cookie 
        

    }

   

    const loginAdmin = (admin) => {

        console.log("Admin data ", admin)

        //update the state
        setGlobalState({
            ...currentGlobalState,
            is_admin_logged_in: true,
            current_admin: admin
        })




    }


    const globalLogoutAdmin = () => {
        
        //send a request to the backen
        //delete the cookie
        Cookies.remove("connect.sid");


       //update the state
       setGlobalState({
            is_admin_logged_in: false,
            current_admin: null
       })


        

    }

    useEffect(() => {

        console.log(currentGlobalState)
        
        if(currentGlobalState.is_admin_logged_in === false){

            console.log("logged out")


        } 

    }, [currentGlobalState])

   
  return  <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/admin"  element={<AdminLogin loginAdmin={(admin) => loginAdmin(admin)} globalState={currentGlobalState}/>}></Route>
                  <Route path="/register" element={<Register/>}></Route>
                  <Route path="/admin/adminhome" element={<AdminHome current_admin={currentGlobalState.current_admin} logout_admin={globalLogoutAdmin} />}></Route>
              </Routes>
          </BrowserRouter>

}

export default App;
