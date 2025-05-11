import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/router';


function createUser(e,p){
    fetch('/api/auth/signup',{
        method:'POST',
        body:JSON.stringify({email:e,password:p}),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json()).then(d=>console.log(d));
}

function AuthForm() {
  const router=useRouter();
    const eref=useRef();
    const pref=useRef();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event){
    event.preventDefault();
    const email=eref.current.value;
    const pass=pref.current.value;
    if(isLogin)
    {
        //log user in
      const result= await signIn('credentials',{redirect:false,email:email,password:pass})
      console.log(result)
      if(!result.error)
      {
          router.replace('/profile')
      }
    }
    else
    {
        //send request to create a new user
        createUser(email,pass);
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={eref} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={pref} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;