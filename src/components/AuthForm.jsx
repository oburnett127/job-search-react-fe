import {
    Form,
    Link,
    useLocation,
    useActionData,
    useNavigation,
  } from 'react-router-dom';
import React, { useEffect } from 'react';
import { json, redirect } from 'react-router-dom';
import axios from 'axios';
import classes from './AuthForm.module.css';
  
function AuthForm() {

    useEffect((e) => {
        e?.preventDefault();
    });

    const data = useActionData();
    const navigation = useNavigation();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';
    const location = useLocation();
    const { pathname, searchParams } = location;

    const handleSubmit = async () => {
        const mode = searchParams.get('mode') || 'login';

        console.log("test line 1");

        if (mode !== 'login' && mode !== 'signup') {
            throw json({ message: 'Unsupported mode.' }, { status: 422 });
        }

        const authData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        console.log("test line 2");

        const response = await fetch('http://localhost:8080/auth/' + mode, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authData),
        });

        if (response.status === 422 || response.status === 401) {
            return response;
        }

        if (!response.ok) {
            throw json({ message: 'Could not authenticate user.' }, { status: 500 });
        }

        console.log("test line 3");

        const resData = await response.json();
        const token = resData.token;

        console.log("test line 4");

        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        console.log("test line 5");

        return redirect('/');
    };
  
    return (
        <>
            <Form className={classes.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
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
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required />
                </p>
                <div className={classes.actions}>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Create new user' : 'Login'}
                    </Link>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </Form>
        </>
    );
}
  
export default AuthForm;
