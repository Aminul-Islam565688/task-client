import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);
  
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const handleChange = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    };
    if(e.target.name === 'password'){
      const isPasswordValid = (e.target.value.length) > 6;
      const passWordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passWordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      }
  }

//   const handleSubmit = (e) => {
//     if(newUser && user.email && user.password){
//       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         setLoggedInUser(newUserInfo)
//         updateUserInfo(user.email)
//         history.replace(from);
//       })
//       .catch((error) => {
//         const newUserInfo = {...user};
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//       });
//     }
  
//   console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit}>
        {newUser ? <h6>Create New User</h6> : <h6>Log In</h6>}
        {
          newUser && <input onBlur={handleChange} className='main-input' type="text" name="username" placeholder='User Name' id="" />
        }
        <br />
        {
          newUser && <input onBlur={handleChange} className='main-input' type="text" name="name" placeholder='Name' id="" />
        }
        <br />
        <input onBlur={handleChange} className='main-input' type="email" name="email" placeholder='Email' id=""/>
        <br />
        <input onBlur={handleChange} className='main-input' type="password" name="password" placeholder='Password' id=""/>
        <br />
        {
          newUser && <input  onBlur={handleChange} className='main-input' type="password" name="confirmPassword" placeholder='Confirm Password' id=""/>
        }
        <br />
        <input className='submit-input' type="submit" value={newUser ? "Create an Account" : "Login"} />
        <br />
        <span className='have-account'>Don't Have an Account?<a onClick={() => setNewUser(!newUser)} className='create-account' href="#">{newUser ? 'Log In' : 'Create an Account'}</a></span>
      </form>
    )
}

export default Login;