


import React from 'react'
import { jwtDecode } from "jwt-decode";
import { useAppSelector } from '../../hooks';

export  function useAuth() {

   let token = useAppSelector((state)=> state.token)
console.log("token",token)

   
    let status = "Student";
    let isAdmin = false;
    let isManager = false;
  
    if(!token) return {isAdmin,isManager,status,isToken :false}
    const {newUser} =  jwtDecode(token)


 let {role} = newUser
 if(role) status = role;
 if(role == "Manager") isManager = true;
 if(role == "Admin") isAdmin  = true
    console.log("decolde",newUser)
    return {isAdmin,isManager,newUser,status,isToken:true}
}
