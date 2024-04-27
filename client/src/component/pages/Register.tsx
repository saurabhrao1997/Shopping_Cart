import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface FromProps {
    sname:string,
    lname:string,
    age:number,
    role:string,
    email:string,
    password:string,
    confirmPassword:string,

}


export default function Register() {
    const navigate = useNavigate()
    const [Form,setForm] = useState<FromProps>({
        sname:"",
        lname:"",
        age:20,
        role:"Admin",
        email:"",
        password:"",
        confirmPassword:"",
    })

const OnSubmit:(e:any)=>void = async(e:any)=>{
    e.preventDefault();
    try{

        let response =  await fetch("http://localhost:4000/api/v1/register",{
            method:"POST",
              headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(Form),
      

        })
        console.log("response",response)
        if(response.status == 200){
            alert("User successfully register ")
            navigate("/login")
        }

    }catch(err){
      console.log("err",err)
      alert(`Error : ${err}`)
    }
  

}
const onChange:(e:any)=>void = (e)=>{
 const {name,value} = e.target
 setForm({...Form,[name]:value})
}

console.log("Form",Form)

  return (
<>
<section className="w-full bg-gray-50 dark:bg-gray-900 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a>
      <div className="w-full   bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 max-h-[80vh] overflow-auto" >
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form onSubmit={OnSubmit} className="space-y-10 md:space-y-6" action="#">
              
              <div>
                      <label htmlFor="sname" className="block mb-2 text-sm font-medium text-white dark:text-white">Enter Your Name</label>
                      <input type="text" name="sname" id="sname" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...." onChange={onChange} />
                  </div>
              <div>
                      <label htmlFor="lname" className="block mb-2 text-sm font-medium text-white dark:text-white">Enter Your Last Name</label>
                      <input type="text" name="lname" id="lname" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." onChange={onChange} />
                  </div>
              <div>
                      <label htmlFor="age" className="block mb-2 text-sm font-medium text-white dark:text-white">Enter Your Age</label>
                      <input type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age"  onChange={onChange}  />
                  </div>
                  <div>
                      <label htmlFor="role" className="block mb-2 text-sm font-medium text-white dark:text-white">Select Your Role</label>
                      {/* <input type="text" name="role" id="role" onChange={onChange} /> */}
                      <select name="role" id="role" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChange}>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="student">student</option>
                      </select>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={onChange}  />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={onChange} />
                  </div>
                  <div>
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChange} />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all bg-blue-400 hover:bg-blue-600">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>



</>
  )
}
