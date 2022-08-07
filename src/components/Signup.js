import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import NoteContext from '../context/NoteContext';
import "../login.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const context = useContext(NoteContext)

    const handleSignup = (e) => {
        e.preventDefault();
        const elementUserName = document.getElementById("userName");
        const elementEmail = document.getElementById("email");
        const elementPassword = document.getElementById("password");
        const elementConfirmPassword = document.getElementById("cpassword");

        const userName = elementUserName.value;
        const email = elementEmail.value;
        const password = elementPassword.value;

        // elementUserName.value = elementEmail.value = elementPassword.value = elementConfirmPassword.value = "";

        const userData = {
            name: userName,
            email: email,
            password: password
        }
        context.addUser(userData,elementUserName,elementEmail,elementPassword,elementConfirmPassword);
        // document.getElementById('mainBox').classList.remove('mainBox1');
        // document.getElementById('mainBox').classList.add('mainBox');
        // console.log(document.getElementById('mainBox'));

    }

    return (
        <div className='login'>
            <div className='container setPaddingSignUp'>
                <form action="http://localhost:5000/api/user/signup" method='post' onSubmit={handleSignup}>
                    {/* <h2>Add Note</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" />
                    </div> */}

                    <div className="loginBox boxColor">
                        <h2 className='text-center my-3 mb-4'>Sign up</h2>
                        <div className="my-3 px-3">
                            <input type="text" className="form-control2" placeholder="Name" id="userName" name="userName" />
                        </div>
                        <div className="my-3 px-3">
                            <input type="email" className="form-control2" placeholder="Email" id="email" name="email" />
                        </div>
                        <div className='my-3 px-3'>
                            <input type="password" className="form-control2" placeholder="Password" id="password" name="password" />
                        </div>
                        <div className='my-3 px-3'>
                            <input type="password" className="form-control2" placeholder="Confirm password" id="cpassword" name="cpassword" />
                        </div>
                        <div className='my-4 px-2 pe-4'>
                            <button style={{ height: "50px", width: "100%", fontSize: "18px" }} type="submit" className="btn btn-dark mx-2">Sign up</button>
                        </div>
                        <div className='text-center'>
                            <p>Already have an account? <Link style={{ cursor: "pointer" }} to="/login">Log in</Link></p>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer limit={1} toastStyle={{backgroundColor:"black",color:"white"}} icon={false} hideProgressBar closeButton={false} />
        </div>
    )
}
