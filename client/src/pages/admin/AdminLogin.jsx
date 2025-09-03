import React from 'react'
import Login from '../Login';
import { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const [form, setForm]= useState({
    email:'',
    password:''
  });

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/admin/login',form);
    if(res.data.message=="Login Successfully"){
      alert("Login Successfully");
    
    localStorage.setItem('adminEmail', res.data.admin.email);
    localStorage.setItem('id',res.data.admin.id);
    localStorage.setItem('role',res.data.admin.role);
    window.location.href='/addash'
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
          background: 'rgba(240, 233, 233, 0.15)',
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
          Admin Login
          
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
                backgroundColor: '#rgba(8, 117, 171, 1)',
                border: 'none',
                color: 'white'
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
                backgroundColor: '#rgba(8, 117, 171, 1)',
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
            className="btn w-100"
            style={{
              backgroundColor: '#0d5072ff',
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
      </div>
    </div>
  );
};
  


export default AdminLogin
