import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router";
const Login = () => {
const [form, setform] = useState({
  email:'',
  password:''
});
const handleChange = (e)=>{
  setform({...form,[e.target.name]:e.target.value})
}
const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    const res = await axios.post('http://localhost:5000/api/examinee/login',form)
    if(res.data.message=="Login Successfully"){
      localStorage.setItem("userEmail", res.data.user.email)
      localStorage.setItem("userId",res.data.user.id)
      localStorage.setItem("userRole",res.data.user.role);
      window.location.href='/userDashboard'

    }
    
  }
  catch(er){
  console.log(er)
  alert("Sorry Try Again")
  }
}
  return (
    <div 
      style={{
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?semt=ais_hybrid&w=740&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px'
      }}
    >
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(11, 10, 10, 0.95)',
          color: 'white'
        }}
      >
        <h3 
          className="text-center mb-4"
          style={{ fontWeight: 'bold', letterSpacing: '1px' }}
        >
          LOGIN 
          
        </h3>
        <form method='POST' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email" 
              name='email'
              onChange={handleChange}
              className="form-control" 
              placeholder="Enter your email"
              style={{
                borderRadius: '12px',
                padding: '10px',
                backgroundColor: 'white',
                border: 'none',
                color: 'black'
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name='password'
              onChange={handleChange}
              className="form-control" 
              placeholder="Enter your password"
              style={{
                borderRadius: '12px',
                padding: '10px',
                backgroundColor: 'white',
                border: 'none',
                color: 'black'
              }}
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              
             
            </div>
           
          </div>
          <button 
            type="submit" 
            name='submit'
            className="btn w-100"
            style={{
              backgroundColor: '#3c5f82ff',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '12px',
              padding: '10px',
              border: 'none'
            }}
          >
            Login
          </button>
        
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#fff" }}>
          Don’t have an account?{" "}
          <Link to="/ragistration" style={{ color: "#e0e2e7ff", fontWeight: "700", textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;  