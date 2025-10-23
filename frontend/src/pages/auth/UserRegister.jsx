import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserRegister = () => {

    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(e);
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/register", {
            firstName: firstName + " " + lastName,
            email,
            password,
        }, {
            withCredentials: true,
        })
        console.log(response.data);

        navigate("/");

    }
    return (
        <>
            <div className="auth-shell">
                <div className="auth-card">
                    <div className="title"><h2>Create your account</h2></div>
                    <div className="subtitle">Join to explore and enjoy delicious meals.</div>

                    <div className="switch-links"><span className="small">Switch:</span><Link to="/user/register" className="inactive">User</Link><Link to="/foodpartner/register">Food partner</Link></div>

                    <form onSubmit={handleSubmit}>
                        <div className="row-2">
                            <div className="col">
                                <label name='firstName'>First name</label>
                                <input name='firstName' type="text" placeholder="Jane" />
                            </div>
                            <div className="col">
                                <label name='lastName'>Last name</label>
                                <input name='lastName' type="text" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label name='email'>Email</label>
                            <input name='email' type="email" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label name='password'>Password</label>
                            <input name='password' type="password" placeholder="Create password" />
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn cta">Sign Up</button>
                        </div>

                        <div className="footer small">Already have an account? <Link to="/user/login">Sign in</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserRegister
