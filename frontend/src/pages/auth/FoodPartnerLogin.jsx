import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerLogin = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(e);
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login", {
            email,
            password,
        }, {
            withCredentials: true,
        })
        console.log(response.data);

        navigate("/create-foodpartner");

    }
    return (
        <>
            <div className="auth-shell">
                <div className="auth-card">
                    <div className="title"><h2>Partner sign in</h2></div>
                    <div className="subtitle">Sign in to manage your menu and orders.</div>

                    <div className="switch-links"><span className="small">Switch:</span><Link to="/user/register">User</Link><Link to="/foodpartner/register" className="inactive">Food partner</Link></div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label name='email'>Email</label>
                            <input name='email' type="email" placeholder="partner@example.com" />
                        </div>
                        <div>
                            <label name='password'>Password</label>
                            <input name='password' type="password" placeholder="Your password" />
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn cta">Sign in</button>
                        </div>

                        <div className="footer small">Don't have an account? <Link to="/foodpartner/register">Create one</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FoodPartnerLogin
