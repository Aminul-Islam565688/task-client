import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './Login.css';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [newUser, setNewUser] = useState(false);
    const [usernameUsed, setusernameUsed] = useState(true)
    const [emailUsed, setEmailUsed] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState([])

const onSubmit = data => {
      console.log(data);
     if(newUser){
         // to create new user
        fetch("http://localhost:7000/newUser",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const form = document.querySelector('.form');
            form.reset();
        })
     }else{
         // for log in 
        fetch("http://localhost:7000/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username_or_email:data.username_or_email,password:data.password})
        })
        .then(res => res.json())
        .then(data => {
            alert('you are logged In');
            console.log(data);
            setLoggedInUser(data)
            const form = document.querySelector('.form');
            form.reset();
        })
     }
  };
  
// to check same username or not
      useEffect(() => {
        fetch('http://localhost:7000/isUserNameOk',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username:watch("username")})
        })
        .then(res => res.json())
        .then(data => setusernameUsed(data))
      },[watch("username")])

// to check same email or not
      useEffect(() => {
        fetch('http://localhost:7000/isEmailOk',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email:watch("email")})
        })
        .then(res => res.json())
        .then(data => setEmailUsed(data))
      },[watch("email")])

  console.log(watch("username")); // watch input value by passing the name of it
    return (
        <div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                {
                newUser?
                // if new user then registration form will be in the UI otherwise Login form will be in the UI
                <div>
                    <input name="username" placeholder="Username" {...register("username",{ required: true })} />
                    {errors.username && <span>This field is required*</span>}
                    {usernameUsed && <span>This User name is already Taken*</span>}

                    <input name="name" placeholder="Name" {...register("name",{ required: true })} />
                    {errors.name && <span>This field is required*</span>}

                    <input name="email" placeholder="Email" {...register("email",{ required: true , pattern: /\S+@\S+\.\S+/ }) } />
                    {emailUsed && <span>This email is already Taken*</span>}
                    {errors?.email?.type === "required" && <p>This field is required*</p>}
                    {errors?.email?.type === "pattern" && <p>Please Write a Valid Email*</p>}

                    <input type='password' placeholder="Password"{...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/})} />
                    {errors?.password?.type === "required" && <p>This field is required*</p>}
                    {errors?.password?.type === "pattern" && <p>Pleaser write 8 to 15 Characters which contain at least one lowercase and uppercase letter one numberic degit and one special characters*</p>}
                    
                    <input name="address" type='text' placeholder="Address" {...register("address",{required: true})} />
                    {errors.address && <span>This field is required*</span>}

                    <input name="mobile" type='number' placeholder="Mobile" {...register("mobile",{required: true})} />
                    {errors.mobile && <span>This field is required*</span>}
                </div>
                :
                <div>
                    <input name="username/email" placeholder="Username/Email" {...register("username_or_email", { required: true })} />
                    {errors.username_or_email && <span>This field is required</span>}
                    <input type='password' name='password' placeholder="password" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>
                }
                <input className='form-btn' type="submit" disabled={usernameUsed || emailUsed } value={newUser?"Sing Up":"Log In"}/>
                <br />
                <span className='form-switcher' onClick={() => setNewUser(!newUser)}>{newUser?"Already have an Account?":"Create an Account!"}</span>
            </form>

            
            {loggedInUser.username && // Logged in User Information
            <div>
                <p>User Name : {loggedInUser.username}</p>
                <p>Name : {loggedInUser.name}</p>
                <p>Email : {loggedInUser.email}</p>
                <p>User : {loggedInUser.address}</p>
                <p>Phone : {loggedInUser.mobile}</p>
                <button onClick={() => setLoggedInUser([])}>Log Out</button>
            </div>}

        </div>
    );
};

export default Login;