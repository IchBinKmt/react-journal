import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithUserData } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);
    
    
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();    
        if(isFormValid()) {
            dispatch(startRegisterWithUserData(name, email, password));   
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('password should be at lest 6 characters and match');
            dispatch(setError('Password should be at lest 6 characters and match'));
            return false;
        }
        dispatch(removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError && (
                        <div className="auth__alert-error">
                            {
                                msgError
                            }
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
            
            
        </>
    )
}
