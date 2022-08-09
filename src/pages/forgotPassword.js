import React, { useState } from 'react';
import {forgotPassword} from '../services/authService';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isEmptyMail, setIsEmptyMail] = useState(false);
    const [message, setMessage] = useState('')

     //<input name="x" value="y" onChange=(event) => handleChange(event)>
    const handleSubmit = (e) => {
            e.preventDefault();
      
            setSubmitted(true);
            setMessage('')
      
            if (!email) {
                setIsEmptyMail(true);
                return;
            }

            forgotPassword(email).then(response => {
                setMessage('A password reset link has been sent to you email');
            });
            
    };

    return(
        <React.Fragment>
        <div className="row d-flex justify-content-center">
            <div className="col-md-4" style={{color: 'blue'}}>{message}</div>
        </div>
        <div className="row d-flex justify-content-center" style={{height: '200px'}}>
            <div className="col-md-4">
            <form noValidate onSubmit={(e) => handleSubmit(e)} className={submitted ? 'was-validated' : ''}>
                <div className='input-group forgotpassword-mt'>
                    <input noValidate id="email" type="email" name="email" value={email}
                    placeholder="Email"
                    onChange={(e) => {setEmail(e.target.value); setIsEmptyMail(false); setMessage('');}}
                    className="form-control" required
                    maxLength="50"/>
                 <button type="submit" className="btn btn-primary mx-3"  id="button-addon2">
                    Submit
                </button>
                </div>
                {
                    isEmptyMail &&
                    <div className="mt-2" style={{color: 'red'}}>
                         Email is required
                    </div>
                }   
                   
            </form>
            </div>
        </div>
        </React.Fragment>
    );
}

export default ForgotPassword;