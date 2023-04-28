import { Form, Link, useActionData, useNavigation, json, redirect } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import classes from './AuthForm.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { UserContext } from './UserContext';
  
function AuthForm() {
    const { setEmail, setUserId, setIsLoggedIn } = useContext(UserContext);
    const [emailTemp, setEmailTemp] = useState('');
    const [isLogin, setIsLogin] = useState('login');
    const [password, setPassword] = useState('');
    const [isEmployer, setIsEmployer] = useState(false);
    const [message, setMessage] = useState('');
    const [employerName, setEmployerName] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let authData = {
            email: emailTemp,
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
                    email: emailTemp,
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
        expiration.setHours(expiration.getHours() + 2);
        localStorage.setItem('expiration', expiration.toISOString());

        setMessage('Log in or sign up was successful');
        setIsLoggedIn(true);
        setEmail(emailTemp);

        try {
            const response = await fetch(`http://localhost:8080/auth/getuserid/${emailTemp}`);
            const userId = await response.json();
            setUserId(userId);
            console.log("userId is: " + userId);
          } catch (error) {
            if (error.response) {
              console.log(error.response);
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
          }

        return redirect('/');
    };

    const handleToggleMode = () => {
        if(isLogin === 'login') setIsLogin('signup');
        else setIsLogin('login');
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
                    <input id="email" type="email" name="email" required onChange={(e) => setEmailTemp(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                </p>
                {isLogin === 'signup' && (
                <div className="radio-container">
                    <label htmlFor="user" style={{ display: 'inline-block', padding: '0px 1em 0px 8px' }}>
                        Job Seeker<input type="radio" id="user" name="usertype" className="radio" value="user" onClick={() => setIsEmployer(false)} style={{ display: 'inline-block', margin: '2px 0 0 2px' }} />
                    </label>
                    <label htmlFor="employer" style={{ display: 'inline-block', padding: '0px 1em 0px 8px' }}>
                        Employer<input type="radio" id="employer" name="usertype" className="radio" value="employer" onClick={() => setIsEmployer(true)} style={{ display: 'inline-block', margin: '2px 0 0 2px' }} />
                    </label>
                 </div>
                )}
                {isLogin === 'signup' && isEmployer === true && (
                    <div>
                        <label htmlFor="employerSelect">Select Employer Name</label>
                        <select name="employerSelect" id="employerSelect" onChange={(e) => setEmployerName(e.target.value)}>{options}</select>
                        <p>If you do not see your company's name in the drop down list  
                            you can type it in the box below to have it added to the list.</p>
                        <div>
                            Add company name:
                            <input type="text" id="compName" name="compName" onChange={(e) => setEmployerName(e.target.value)} />
                        </div>
                    </div>
                )}
                <div className={classes.actions}>
                    <Link to={'/auth'} onClick={handleToggleMode}>
                        {isLogin === 'login' ? 'Create new user' : 'Login'}
                    </Link>
                    <button disabled={isSubmitting} onClick={handleSubmit}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </Form>
        </>
    );
}
  
export default AuthForm;
