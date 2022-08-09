import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate , Link} from 'react-router-dom';
import User from '../models/user';
import { setCurrentUser} from '../redux/actions/user';
import {login} from '../services/authService';

const LoginForm = () => {

    const [user, setUser] = useState(new User('', '', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch()

     //<input name="x" value="y" onChange=(event) => handleChange(event)>
     const handleChange = (e) => {
        const {name, value} = e.target;

        setUser((prevState => {
            //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
            return {
                ...prevState,
                [name]: value
            };
        }));

        setErrorMessage('');
        setLoading(false);
    };

        const handleLogin = (e) => {
            e.preventDefault();
      
            setSubmitted(true);
      
            if (!user.email || !user.password) {
                return;
            }
      
            setLoading(true);
      
            login(user.email, user.password).then(response => {
                //set user in session.
                dispatch(setCurrentUser(response.data));
                navigate('/notes');
            }).catch(error => {
               setErrorMessage('username or password is invalid.');
            });
          };

    return(
        <React.Fragment>
            <h1>Have an Account?</h1>
            <h4>Login here</h4>
            <br/>

            <form noValidate onSubmit={(e) => handleLogin(e)} className={submitted ? 'was-validated' : ''}>
                <div className='mb-3'>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input noValidate id="email" type="email" name="email" value={user.email}
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                    required/>
                    <div className="invalid-feedback">
                            Email is required.
                     </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input noValidate id="password" type="password" name="password" value={user.password}
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                    required/>
                    <div className="invalid-feedback">
                            Password is required.
                    </div>
                </div>
                {errorMessage &&
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
                }
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    Login | <i className="fas fa-sign-in-alt"></i>
                </button>
            </form>
            <div className="mt-3"><Link to="/forgotpassword" style={{ textDecoration: 'none', color: 'blue'}}>Forgot password? </Link></div>
        </React.Fragment>
    )
};

export default LoginForm;