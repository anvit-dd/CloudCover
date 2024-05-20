import React, { useState } from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import { Link,useNavigate } from 'react-router-dom';
import ReplaySharpIcon from '@material-ui/icons/CachedRounded';
import {auth} from '../../firebaseinit'

const Login = () => {
    const navigate = useNavigate()
    const [email, setmail] = useState("")
    const [password, setPass] = useState("")
    const [isSubmit, setsubmit] = useState(false)
    const [error, setError] = useState(null)

    const verifyPass = async()=>{
        setsubmit(true)
        await auth.signInWithEmailAndPassword(email, password).then(()=>{
            navigate("/home", { state: { userEmail: email } })
        }).catch((error) => {
            setError("Invalid credentials!")
            setsubmit(false)
            return
          });
    }

    return (
        <div className='bg-white w-[400px] p-4 m-auto mt-[25vh] text-lg rounded-xl shadow-xl'>
          <div>
            <h1 className='text-4xl font-semibold mb-3 text-sky-500 text-center'>Login</h1>
            <div className='font-semibold'>
                <label>Email</label><br/>
                <div className='flex items-center rounded p-1 mt-1 border shadow-md'>
                    <MailOutlineIcon className='text-slate-600'/>
                    <input id ="email-login" required onChange={(em)=>setmail(em.target.value)} className='w-full p-1 pl-2 font-medium outline-none' type='email' placeholder='Enter your email'></input>
                </div>
            </div>
            <div className='mt-4 font-semibold shadow-md'>
                <label>Password</label><br/>
                <div className='flex items-center mt-1 p-1 border'>
                    <LockOutlinedIcon className='text-slate-600'/>
                    <input id ="pass" type='password' onChange={(em)=>setPass(em.target.value)} required className='w-full p-1 pl-2 font-medium outline-none' placeholder = "Enter your password"></input>
                </div>
            </div>
            </div>
            <button onClick={verifyPass} className='flex gap-1 justify-center w-full mt-4 p-1 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600'>
                {isSubmit&&<ReplaySharpIcon className='animate-spin'/>}
                <p>Login</p>
            </button>
            <div className='flex gap-2 mt-4 text-md text-center justify-center'>
               <p>Don't have an account?</p><Link to="/signup" className='underline font-thin'> SignUp</Link>
            </div>
            {error?
                (
                <div className='flex gap-1 justify-center mt-4'>
                    <ErrorIcon className='text-red-600 pt-1 scale-110'/>
                    <p className='text-justify text-red-600 font-thin'>{error}</p>
                </div>
                )
                :
                (<></>)
            }
        </div>
    )
    }
    export default Login
