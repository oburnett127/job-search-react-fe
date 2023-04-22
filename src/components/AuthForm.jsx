import {
    Form,
    Link,
    useActionData,
    useNavigation,
    json, 
    redirect
  } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import classes from './AuthForm.module.css';
import { UserContext } from './UserContext';
import { useQuery } from 'react-query';
import axios from 'axios';
  
function AuthForm() {
    const { email, setEmail } = useContext(UserContext);
    const [isLogin, setIsLogin] = useState('login');
    const [password, setPassword] = useState('');
    const [isEmployer, setIsEmployer] = useState(false);
    const [message, setMessage] = useState('');
    const [employerName, setEmployerName] = useState('');

    useEffect((e) => {
        e?.preventDefault();
    }, []);

    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const { data: empList } = useQuery('employerList',
      () => { return axios.get('http://localhost:8080/employer/list')});

    const options = empList?.data?.map((employer) => (
    <option key={employer.id} value={JSON.stringify(employer)}>
        {employer.name}
    </option>
    ));

    const handleSubmit = async () => {

        let authData = {
            email: email,
            password: password,
            isEmployer: isEmployer
        };

        let url = '';

        if(isLogin === 'login') {
            url = 'http://localhost:8080/auth/login';
        } else {
            url = 'http://localhost:8080/auth/signup';

            if(isEmployer) {
                authData = {
                    email: email,
                    password: password,
                    isEmployer: isEmployer,
                    employerName: employerName
                };
            }
        }

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

    const handleEmployerSelect = (e) => {
        setEmployerName(e.target.value);
    }

    const handleName = (e) => {
        setEmployerName(e.target.value);
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
                    <input id="email" type="email" name="email" value={email} required onChange={handleEmailChanged} />
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
                        <select name="employerSelect" id="employerSelect" onSelect={handleEmployerSelect}>{options}</select>
                        <p>If you do not see your company's name listed in the drop down list on the account creation/login page 
                            you can type it in the box below to have it added to the list.</p>
                        <div>
                            Add company name:
                            <input type="text" id="compName" name="compName" onChange={handleName} />
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}
  
export default AuthForm;
