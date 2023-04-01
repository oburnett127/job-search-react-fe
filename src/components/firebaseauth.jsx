// import { useState } from "react";
// import React from 'react';

// export const Auth = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

    // const registerUser = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const signInWithGoogle = async () => {
    //     try {
    //         await signInWithPopup(auth, googleProvider);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const logout = async () => {
    //     try {
    //         await signOut(auth);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

//     return (
//         <div>
//             <input
//                 placeholder="Email..."
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 placeholder="Password..."
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={registerUser}> Create Account </button>

//             {/* <button onClick={signInWithGoogle}> Sign In With Google </button> */}

//             <button onClick={logout}> Logout </button>
//         </div>
//     );
// };