import './App.css'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Login from './pages/Login';
import AdminLogin from './pages/admin/AdminLogin';
import Ragistration from './pages/Registration';
import AdminDashboard from './pages/admin/AdminDashboard'
import Session from './pages/admin/Session'
import Subject from './pages/admin/Subject'
import Examinee from './pages/admin/Examinee'
import Examination from './pages/admin/Examination'
import UserDashboard from './pages/user/UserDashboard';
import QuestionBank from './pages/admin/Question';
import Myexams from './pages/user/Myexams';
import Myresult from './pages/user/Myresult';
import Getexams from './pages/user/Getexams';
import Message from './pages/user/Message';
import ChangePassword from './pages/user/ChangePassword';
import ReportGeneration from './pages/admin/ReportGeneration';
import DashboardHome from './pages/user/DashboardHome';
import AdminChangepassword from './pages/admin/AdminChangepassword';
import MessageReply from './pages/admin/MessageReply';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';

function App() {
  

  return (
    <>
     <Router>
       
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/adlogin' element={<AdminLogin/>}></Route>
        <Route path='/ragistration' element={<Ragistration/>}></Route>
        {/* admin dashboard started */}
         <Route path='/addash' element={<AdminDashboard/>}>
         <Route index element={<AdminDashboardHome/>}></Route>
         <Route path='session'element={<Session/>}></Route>
          <Route path='subject' element={<Subject/>}></Route>
           <Route path='examinee' element={<Examinee/>}></Route>
          <Route path='examination' element={<Examination/>}></Route>
           <Route path='question' element={<QuestionBank/>}></Route>
           <Route path='reportgeneration' element={<ReportGeneration/>}></Route>
           <Route path='changepassword' element={<AdminChangepassword/>}></Route>
            <Route path='messagereply' element={<MessageReply/>}></Route>
         </Route>
{/* admin dashboard ended */}
       
       {/* user dashboard started */}
        <Route path='/userDashboard' element={<UserDashboard/>}>
        <Route index element ={<DashboardHome/>}></Route>
        <Route path='myexam' element={<Myexams/>}></Route>
        <Route path='myresult' element={<Myresult/>}></Route>
        <Route path='getexam/:id'element={<Getexams/>} ></Route>
        <Route path='message' element={<Message/>}></Route>
        <Route path='changepassword' element={<ChangePassword/>}></Route>
       
        
        </Route>
        {/* <Route path='/myexam' element={<Myexams/>}></Route> */}
        
        
         {/* user dashboard ended */}
      </Routes>
     </Router>
    </>
  )
}

export default App
