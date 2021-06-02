import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [newUser, setNewUser] = useState(false);
  const onSubmit = data => {
      console.log(data);
     if(newUser){
        fetch("http://localhost:7000/newUser",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => console.log(data))
     }else{
        fetch("http://localhost:7000/isUser",{
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
        })
     }
  };



  console.log(watch("password")); // watch input value by passing the name of it
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                newUser?
                <div>
                    <input name="username" placeholder="Username" {...register("username")} />
                    <br />
                    <input name="name" placeholder="name" {...register("name")} />
                    <br />
                    <input name="email" placeholder="email" {...register("email")} />
                    <br />
                    <input placeholder="Password"{...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                    <br />
                    <input name="address" placeholder="Address" {...register("address")} />
                    <br />
                    <input name="mobile" placeholder="Mobile" {...register("mobile")} />
                </div>
                :
                <div>
                    <input name="username/email" placeholder="Username/Email" {...register("username_or_email")} />
                    <br />
                    <input name='password' placeholder="password" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                    <br />
                </div>
                }
                <input type="submit" value={newUser?"Sing Up":"Log In"}/>
                <br />
                <span onClick={() => setNewUser(!newUser)}>{newUser?"Already have an Account":"Create an Account"}</span>
            </form>
        </div>
    );
};

export default Login;