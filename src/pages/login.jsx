import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEye, faEyeSlash, faCircleExclamation,faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {auth} from '../firebaseinit'

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
            setmail("")
        }).catch((error) => {
            setError("Invalid credentials!")
            setsubmit(false)
            return
          });
    }

    return (
        <div className='bg-white w-[400px] p-4 m-auto mt-[25vh] text-lg rounded-xl shadow-xl'>
          <div>
            <h1 className='text-4xl font-semibold mb-3 text-blue-500 text-center'>Login</h1>
            <div className='font-semibold'>
                <label>Email</label><br/>
                <div className='flex items-center rounded p-1 mt-1 border shadow-md'>
                    <FontAwesomeIcon icon={faUser} className='text-slate-600 m-1' />
                    <input id ="email-login" required onChange={(em)=>setmail(em.target.value)} className='w-full p-1 pl-2 font-medium outline-none' type='email' placeholder='Enter your email'></input>
                </div>
            </div>
            <div className='mt-4 font-semibold'>
                <label>Password</label><br/>
                <div className='flex items-center mt-1 p-1 border shadow-md'>
                    <FontAwesomeIcon icon={faKey} className='text-slate-600 m-1'/>
                    <input id ="pass" type='password' onChange={(em)=>setPass(em.target.value)} required className='w-full p-1 pl-2 font-medium outline-none' placeholder = "Enter your password"></input>
                </div>
            </div>
            </div>
            <button onClick={verifyPass} className='flex gap-1 items-center justify-center w-full mt-4 p-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600'>
                {isSubmit&&<FontAwesomeIcon icon={faCircleNotch} className='animate-spin'/>}
                <p>Login</p>
            </button>
            <div className='flex gap-2 mt-4 text-md text-center justify-center'>
               <p>Don't have an account?</p><Link to="/register" className='underline font-thin'> Register</Link>
            </div>
            {error?
                (
                <div className='flex gap-1 items-center justify-center mt-4'>
                    <FontAwesomeIcon icon={faCircleExclamation} className='text-red-600 pt-1'/>
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