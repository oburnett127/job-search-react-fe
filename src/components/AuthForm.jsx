import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import classes from './AuthForm.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useForm } from 'react-hook-form';
  
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function AuthForm() {
    const { setUser, setIsLoggedIn } = useContext(UserContext);
    const [isLogin, setIsLogin] = useState('login');
    const [isEmployer, setIsEmployer] = useState(false);
    const [message, setMessage] = useState('');
    const [employerName, setEmployerName] = useState(localStorage.getItem('employerName') || '');

    const {register, handleSubmit, formState: {errors}} = useForm();

    const { data: empList } = useQuery('employerList',
        () => { return axios.get(process.env.REACT_APP_SERVER_URL + '/employer/list')});

    const options = empList?.data?.map((employer) => (
        <option key={employer.id} value={JSON.stringify(employer)}>
            {employer.name}
        </option>
    ));

    // useEffect(() => {
    //     fetch('http://localhost:8080/csrf-token', {
    //             method: 'GET',
    //             credentials: 'include'
    //         }).then(() => {
    //             const csrfToken = getCookie('XSRF-TOKEN');
    //             sessionStorage.setItem('csrfToken', csrfToken);
    //         });
    // }, []);

    useEffect(() => {
        localStorage.setItem('employerName', employerName);
    }, [employerName]);

    const onSubmit = async (data) => {
        try {
            setMessage('');
            //console.log("line 1");

            await fetch('http://localhost:8080/csrf-token', {
                method: 'GET',
                credentials: 'include'
            }).then(() => {
                const csrfToken = getCookie('XSRF-TOKEN');
                sessionStorage.setItem('csrfToken', csrfToken);
            });

            let authData = {
                email: data.email,
                password: data.password
            };

            let url = '';

            if(isLogin === 'login') {
                url = process.env.REACT_APP_SERVER_URL + '/auth/login';
            } else {
                url = process.env.REACT_APP_SERVER_URL + '/auth/signup';

                console.log("line 2");

                if(isEmployer) {
                    let empJson = '';
                    //console.log("employerName: " + employerName);

                    if(data.compName === '' && data.employerSelect === '' ) {
                        setMessage('You must either select an employer name or enter a new employer name.');
                        throw new Error('The user must enter an employer name.');
                    }

                    if(data.employerSelect !== '') {
                        empJson = JSON.parse(data.employerSelect);
                        //console.log("selectedOptionName: " + empJson['name']);

                        if(data.compName === '') {
                            setEmployerName(empJson['name']);
                        } else {
                            setEmployerName(data.compName);
                        }
                    }

                    authData = {
                        email: data.email,
                        password: data.password,
                        isEmployer: true,
                        employerName: data.compName === '' ? empJson['name'] : employerName
                    };
                   
                    //console.log("employer name: " + employerName);
                } else {
                    authData = {
                        email: data.email,
                        password: data.password,
                        isEmployer: false
                    };
                }
            }
                    
            const csrfToken = sessionStorage.getItem('csrfToken');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(authData),
                credentials: 'include'
            });
            
            //console.log(response);
            
            if (isLogin !== 'login' && response.status === 409) {
                setMessage('The email address you entered is already taken. Please enter a different email.');
                throw new Error('The email address you entered is already taken. Please enter a different email.');
            }
            
            if (!response.ok) {
                setMessage('Log in or registration failed');
                throw new Error('Could not authenticate or register user.');
            }
            
            if(isLogin !== 'login') {
                setMessage('Registration successful');
                return;
            }

            const resData = await response.json();
            const jwtToken = resData.token;

            localStorage.setItem('jwtToken', jwtToken);
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 2);
            localStorage.setItem('expiration', expiration.toISOString());

            try {
                const response = await fetch(process.env.REACT_APP_SERVER_URL + `/auth/getuser/${data.email}`, {
                    method: 'GET',
                    headers: {
                        'X-XSRF-TOKEN': csrfToken,
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    setMessage('Something went wrong. Please attempt logging in again.');
                    throw new Error('Problem retrieving the user account data, user should try logging out and back in or attempt logging in again.');
                }
                
                const user = await response.json();
                setUser(user);

                console.log("userId is: " + user.id);

                setMessage('Log in successful');
                setIsLoggedIn(true);

            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            }
        } catch(err) {
            console.log(err);
        }
    };

    const handleToggleMode = () => {
        setMessage('');
        if(isLogin === 'login') setIsLogin('signup');
        else setIsLogin('login');
    }
 
    return (
            <form className={classes.form} errors={errors} onSubmit={handleSubmit(onSubmit)}>
                <h1>{isLogin === 'login' ? 'Log in' : 'Create a new user'}</h1>
                <p>{message}</p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("email", {required: true})} />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register("password", {required: true})} />
                </p>
                {isLogin === 'signup' && (
                    <div className="radio-container">
                        <label htmlFor="user" style={{ display: 'inline-block', padding: '0px 1em 0px 8px' }}>
                            Job Seeker<input type="radio"  {...register("user")} checked={!isEmployer}  value="user" onChange={() => setIsEmployer(false)} />
                        </label>
                        <label htmlFor="employer" style={{ display: 'inline-block', padding: '0px 1em 0px 8px' }}>
                            Employer<input type="radio" {...register("employer")} checked={isEmployer}  value="employer" onChange={() => setIsEmployer(true)} />
                        </label>
                    </div>
                )}
                {isLogin === 'signup' && isEmployer === true && (
                    <div>
                        <label htmlFor="employerSelect">Select Employer Name</label>
                        <select name="employerSel" {...register("employerSelect")}>{options}</select>
                        <p>If you do not see your company's name in the drop down list  
                            you can type it in the box below to have it added to the list.</p>
                        <div>
                            <label htmlFor="compName">Add employer name:</label>
                            <input type="text" {...register("compName")} onChange={(e) => setEmployerName(e.target.value)} />
                        </div>
                    </div>
                )}
                <div className={classes.actions}>
                    <Link to={'/auth'} onClick={handleToggleMode}>
                        {isLogin === 'login' ? 'Create new user' : 'Login'}
                    </Link>
                    <button type="submit">Submit</button>
                </div>
            </form>
    );
}
  
export default AuthForm;
