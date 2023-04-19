import {
    Form,
    Link,
    useLocation,
    useActionData,
    useNavigation,
  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { json, redirect } from 'react-router-dom';
import classes from './AuthForm.module.css';
  
function AuthForm() {

    const [isLogin, setIsLogin] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmployer, setIsEmployer] = useState(false);
    const [message, setMessage] = useState('');

    useEffect((e) => {
        e?.preventDefault();
    }, []);

    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const location = useLocation();
    const { pathname, searchParams } = location;

    const handleSubmit = async () => {

        const authData = {
            email: email,
            password: password,
            isEmployer: isEmployer
        };

        let url;

        if(isLogin ==='login') url = 'http://localhost:8080/auth/login';
        else url = 'http://localhost:8080/auth/signup';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData),
        });

        try {
            if (isLogin !== 'login' && response.status === 409) {
                setMessage('The email address you entered is already taken. Please enter a different email.');
                throw json({ message: 'The email address you entered is already taken. Please enter a different email.'}, {status: 409});
            }

            if (!response.ok) {
                setMessage('Log in or registration failed');
                throw json({ message: 'Could not authenticate user.' }, { status: 500 });
            }
        } catch(err) {
            return;
        }

        const resData = await response.json();
        const token = resData.token;

        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        setMessage('Log in or sign up was successful');

        return redirect('/');
    };

    const handleEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const handleToggleMode = () => {
        if(isLogin==='login') setIsLogin('signup');
        else setIsLogin('login');
    }

    const handleUserRole = () => {
        setIsEmployer(false);
        //console.log('role is: JOB SEEKER')
    }

    const handleEmployerRole = () => {
        setIsEmployer(true);
        //console.log('role is: EMPLOYER')
    }

    const handleEmployerSelect = () => {
    }
  
    return (
        <>
            <Form className={classes.form}>
                <h1>{isLogin === 'login' ? 'Log in' : 'Create a new user'}</h1>
                <p>{message}</p>
                {data && data['errors'] && (
                    <ul>
                        {Object.values(data['errors']).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data['message'] && <p>{data['message']}</p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required onChange={handleEmailChanged} />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required onChange={handlePasswordChanged} />
                </p>
                <div className={classes.actions}>
                    <Link to={'/auth'} onClick={handleToggleMode}>
                        {isLogin === 'login' ? 'Create new user' : 'Login'}
                    </Link>
                    <button disabled={isSubmitting} onClick={handleSubmit}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
                {isLogin === 'signup' && (
                    <div>
                        <label htmlFor="user">Job Seeker</label>
                        <input type="radio" id="user" name="usertype" value="user" onClick={handleUserRole}/><br />
                        <label htmlFor="employer">Employer</label>
                        <input type="radio" id="employer" name="usertype" value="employer" onClick={handleEmployerRole}/>
                    </div>
                )}
                {isEmployer === true && (
                    <div>
                        <label htmlFor="employerSelect">Select Employer Name</label>
                        <select name="employerSelect" id="employerSelect">
                            <option value="Jills Bakery">Jills Bakery</option>
                            <option value="City Bank">City Bank</option>
                        </select>
                    </div>
                )}
            </Form>
        </>
    );
}
  
export default AuthForm;
