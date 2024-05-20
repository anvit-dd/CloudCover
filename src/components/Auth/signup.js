import React, { useState } from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import {auth} from '../../firebaseinit'

const SignUp = () => {
    const [email, setmail] = useState("")
    const [password, setPass] = useState("")
    const [repassword, setrePass] = useState("")
    const [error, setError] = useState(null)
    const [passtype, setpasstype] = useState("password")

    const verifySignup = async()=>{ 
        try
        {
            if(password!==repassword){
                throw new Error("Passwords do not match")
            }
            auth.isSignInWithEmailLink(email)
            await auth.createUserWithEmailAndPassword(email, password)
            window.location = "/"
        }
        catch(error)
        {
            setError(error.message);
        }
        }

    return (
      <div className='bg-white w-[400px] p-4 m-auto mt-[25vh] text-lg rounded-xl shadow-xl'>
        <div>
          <h1 className='text-4xl font-semibold mb-3 text-sky-500 text-center'>SignUp</h1>
          <div className='font-semibold'>
              <label>Email</label><br/>
              <div className='flex items-center rounded p-1 mt-1 border shadow-md'>
                  <MailOutlineIcon className='text-slate-600'/>
                  <input id ="email-login" required onChange={(em)=>setmail(em.target.value)} className='w-full p-1 pl-2 font-medium outline-none' type='email' placeholder='Enter your email'></input>
              </div>
          </div>
          <div className='mt-4 font-semibold'>
              <label>Password</label><br/>
              <div className='flex items-center mt-1 p-1 border shadow-md rounded'>
                    <LockOutlinedIcon className='text-slate-600'/>
                    <input id ="pass" type={passtype} onChange={(em)=>setPass(em.target.value)} required className='w-full p-1 pl-2 font-medium outline-none' placeholder = "Enter your password"></input>
                    {
                            passtype === "password"?
                                (<button onClick={() => setpasstype("text")}><VisibilityOffIcon className='text-slate-600 mx-1' /></button>)
                                :
                                (<button onClick={() => setpasstype("password")}><VisibilityIcon className='text-slate-600 mx-1' /></button>)
                    }
              </div>
          </div>
          <div className='mt-4 font-semibold'>
              <label>Confirm Password</label><br/>
              <div className='flex items-center mt-1 p-1 border shadow-md rounded'>
                  <LockOutlinedIcon className='text-slate-600'/>
                  <input id ="repass" type='password' onChange={(em)=>setrePass(em.target.value)} required className='w-full p-1 pl-2 font-medium outline-none' placeholder = "Confirm your password"></input>
              </div>
          </div>
          <button onClick={verifySignup} className='w-full mt-4 p-1 bg-sky-500 text-white font-semibold rounded-md hover:drop-shadow-md'>Signup</button>
          {error && <p className='text-center text-red-600 font-thin'>{error}</p>}
          <div className='flex gap-2 mt-4 text-md text-center justify-center  '>
               <p>Already have an account?</p><Link to="/" className='underline font-thin'>Login</Link>
            </div>
        </div>
      </div>
    )
    }
    export default SignUp
