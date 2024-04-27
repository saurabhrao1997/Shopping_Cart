import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { addToken } from '../Slice/TokenSlice'
interface FromProps {

  email:string,
  password:string,


}
export default function Login() {
 const navigate = useNavigate()

 const dispatch = useAppDispatch()
  const [Form,setForm] = useState<FromProps>({
   
    email:"",
    password:"",
    
})

const OnSubmit:(e:any)=>void = async(e:any)=>{
e.preventDefault();
try{

    let response =  await fetch("http://localhost:4000/api/v1/login",{
        method:"POST",
          headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(Form),
  

    })
    if(response?.status == 200){
    let result = await response.json()
    
    localStorage.setItem("user", JSON.stringify(result?.data?.data))
    localStorage.setItem("token",result?.data?.token)
    dispatch( addToken( result?.data?.token))
    console.log("token at login ",result?.data?.token)
    navigate("/home")
      // console.log("response",result?.data?.data,result?.data?.token,response?.status == 200)
    }

    

    

}catch(err){
  console.log("err",err)
}


}
const onChange:(e:any)=>void = (e)=>{
const {name,value} = e.target
setForm({...Form,[name]:value})
}
  return (
    <> 
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <img className="mx-auto " src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={OnSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={onChange}/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={onChange}/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>

    
    
    </>
  )
}
