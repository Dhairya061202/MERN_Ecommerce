import React, { useState } from 'react'
import '../Pages/CSS/LoginSignup.css'
import { baseUrl } from '../urls'

const LoginSignup = () => {


  const [state,setState]= useState("Login")
  const [fromData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const changeHandler = (e)=>{
    setFormData({...fromData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("login",fromData)
    let responseData;
    await fetch(`${baseUrl}/login`,{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }

  }


  const signup = async ()=>{
    console.log("signup",fromData)
    let responseData;
    await fetch(`${baseUrl}/signup`,{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" 
          ?
          <input name='name' type="text" value={fromData.name}  onChange={changeHandler} placeholder='Your Name'/> : <></>}
          <input name='email' value={FormData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
          <input name='password' value={FormData.password} onChange={changeHandler} type="text" placeholder='Password'/>
        </div>
        <button onClick={()=>{state === 'Login'?login():signup()}}>Continue</button>
        {state === "Sign Up"
        ?
        <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :
        <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
