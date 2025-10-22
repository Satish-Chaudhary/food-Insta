import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

const UserRegister = () => {
    return (
        <>
            <div className="auth-shell">
                <div className="auth-card">
                    <div className="title"><h2>Create your account</h2></div>
                    <div className="subtitle">Join to explore and enjoy delicious meals.</div>

                    <div className="switch-links"><span className="small">Switch:</span><Link to="/user/register" className="inactive">User</Link><Link to="/foodpartner/register">Food partner</Link></div>

                    <form>
                        <div className="row-2">
                            <div className="col">
                                <label>First name</label>
                                <input type="text" placeholder="Jane" />
                            </div>
                            <div className="col">
                                <label>Last name</label>
                                <input type="text" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="Create password" />
                        </div>

                        <div className="actions">
                            <button type="button" className="btn cta">Sign Up</button>
                        </div>

                        <div className="footer small">Already have an account? <Link to="/user/login">Sign in</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserRegister
