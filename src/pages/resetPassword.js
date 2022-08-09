import React, { useState } from 'react';
import {resetPassword} from '../services/authService';
import { useParams, Link } from 'react-router-dom'

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    const {token} = useParams()

     //<input name="x" value="y" onChange=(event) => handleChange(event)>
    const handleSubmit = (e) => {
            e.preventDefault();
      
            setSubmitted(true);
            setMessage('')
      
            if (!newPassword || !confirmPassword) {
                return;
            }

            if (newPassword !== confirmPassword) {
                setMessage('Password and Confirm password do not match,');
                return;
            }

        
            resetPassword(newPassword, token).then(response => {

                if(response.data.error === "invalid reset link")
                    setMessage("Invalid reset link,");
                
                if(response.data.message === "password updated successfully")
                    setMessage("Password updated successfully,");
            });
            
    };

    return(
        <React.Fragment>
        <div className="row d-flex justify-content-center">
            <div className="col-md-4" style={{color: 'blue'}}>{message} <Link to="/auth">Login</Link></div>
        </div>
        <div className="row d-flex justify-content-center" style={{height: '200px'}}>
            <div className="col-md-4">
            <form noValidate onSubmit={(e) => handleSubmit(e)} className={submitted ? 'was-validated' : ''}>
                <div className='forgotpassword-mt mb-3'>
                    <input noValidate id="newPassword" type="password" name="newPassword" value={newPassword}
                    placeholder="Password"
                    onChange={(e) => {setNewPassword(e.target.value); setMessage('');}}
                    className="form-control" required
                    maxLength="30"/>
                </div>
                <div className='mb-3'>
                <input noValidate id="confirmPassword" type="password" name="confirmPassword" value={confirmPassword}
                    placeholder="confirmPassword"
                    onChange={(e) => {setConfirmPassword(e.target.value); setMessage('');}}
                    className="form-control" required
                    maxLength="30"/>
               </div>
                <button type="submit" className="btn btn-primary" disabled={loading} id="button-addon2">
                    Submit
                </button>        
            </form>
            </div>
        </div>
        </React.Fragment>
    );
}

export default ResetPassword;