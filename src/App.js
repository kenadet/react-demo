import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from './pages/authpage';
import Notes from './pages/notes';
import EditNote from './pages/editNote';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Header from './components/header'
import './assets/style.js'

const App = () =>{
  return (
    <React.Fragment>
      <div className="container">
      <Header/>
      <div className="container my-5">
        <Routes>
          <Route exact path="auth" element={<AuthPage/>}/>
          <Route exact path="notes" element={<Notes/>}/>
          <Route exact path="forgotpassword" element={<ForgotPassword/>}/>
          <Route exact path="resetpassword/:token" element={<ResetPassword/>}/>
          <Route exact path="note" element={<EditNote/>}/>
          <Route exact path="note/:nodeId" element={<EditNote/>}/>
          <Route path="*" element={ <Navigate to="/auth" /> }/>
        </Routes>
      </div>
      </div>
    </React.Fragment>  
  )
}

export default App;
