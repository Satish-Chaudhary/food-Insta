import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'

const UserLogin = () => {
    return (
        <>
            <div className="auth-shell">
                <div className="auth-card">
                    <div className="title"><h2>Welcome back</h2></div>
                    <div className="subtitle">Sign in to continue.</div>

                    <div className="switch-links"><span className="small">Switch:</span><Link to="/user/register" className="inactive">User</Link><Link to="/foodpartner/register">Food partner</Link></div>

                    <form>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="Your password" />
                        </div>

                        <div className="actions">
                            <button type="button" className="btn cta">Sign in</button>
                        </div>

                        <div className="footer small">Don't have an account? <Link to="/user/register">Create one</Link></div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default UserLogin
