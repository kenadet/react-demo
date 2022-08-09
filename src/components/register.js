import React, {useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from '../models/user';
import { setCurrentUser} from '../redux/actions/user';
import {register} from '../services/authService';

const RegisterForm = () => {

    const [user, setUser] = useState(new User('', '', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch()

    // const currentUser= useSelector(state => state.user);

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

        setLoading(false);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSubmitted(true);
  
        if (!user.email || !user.password ||!user.firstName|| !user.lastName) {
            return;
        }  
        setLoading(true);
  
        register(user.firstName, user.lastName, user.email, user.password).then(response => {
            //set user in session.
            dispatch(setCurrentUser(response.data));
            navigate('/notes');
        }).catch(err => {
              setErrorMessage(err.response.data.error.message);
        });
      };

    return(
        <React.Fragment>
            <h1>New User?</h1>
            <h4>Create an account</h4>
            <br/>
            <form noValidate onSubmit={(e) => handleRegister(e)} className={submitted ? 'was-validated' : ''}>
                <div className='mb-3'>
                    <label htmlFor="Firstname" className="form-label">Firstname</label>
                    <input noValidate id="firstName" type="firstName" name="firstName" value={user.firstName}
                    placeholder="FirstName"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required/>
                    <div className="invalid-feedback">
                            Firstname is required.
                     </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="Lastname" className="form-label">Lastname</label>
                    <input noValidate id="lastName" type="lastName" name="lastName" value={user.lastName}
                    placeholder="LastName"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required/>
                    <div className="invalid-feedback">
                            Lastname is required.
                     </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email1" className="form-label">Email Address</label>
                    <input noValidate id="email1" type="email" name="email" value={user.email}
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required/>
                    <div className="invalid-feedback">
                            Email is required.
                     </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input noValidate id="password1" type="password" name="password" value={user.password}
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                    className="form-control" required/>
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
                    Register | <i className="fas fa-user-plus"></i>
                </button>
            </form>
        </React.Fragment>
    )
}

export default RegisterForm;