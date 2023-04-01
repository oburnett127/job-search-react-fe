import React from 'react';
import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  console.log("test line 1");

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  // const authData = {
  //   firstname: "john",
  //   lastname: "smith",
  //   email: data.get('email'),
  //   password: data.get('password'),
  // };

  let response;

  console.log("test line 2");

  axios.post(`http://localhost:8080/auth/signup`, {
    "firstname":"john",
    "lastname":"smith",
    "email":"jsmith@fake.com",
    "password":"test123"
  }).then((res) => 
  {response = res.data;})

  console.log("test line 3");

  // const response = await fetch('http://localhost:8080/auth/' + mode, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(authData),
  // });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  console.log("test line 4");

  const resData = await response.json();
  const token = resData.token;

  console.log("test line 5");

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  console.log("test line 6");

  return redirect('/');
}
