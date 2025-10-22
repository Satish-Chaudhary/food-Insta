import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

const FoodPartnerRegister = () => {
    return (
        <>
            <div className="auth-shell">
                <div className="auth-card">
                    <div className="title"><h2>Partner sign up</h2></div>
                    <div className="subtitle">Grow your business with our platform.</div>

                    <div className="switch-links"><span className="small">Switch:</span><Link to="/user/register">User</Link><Link to="/foodpartner/register" className="inactive">Food partner</Link></div>

                    <form>
                        <div>
                            <label>Business name</label>
                            <input type="text" placeholder="Tasty Bites" />
                        </div>

                        <div className="row-2">
                            <div className="col">
                                <label>Contact name</label>
                                <input type="text" placeholder="Jane Doe" />
                            </div>
                            <div className="col">
                                <label>Phone</label>
                                <input type="text" placeholder="+1 555 123 4567" />
                            </div>
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="business@example.com" />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="Create password" />
                        </div>

                        <div>
                            <label>Address</label>
                            <input type="text" placeholder="123 Market Street" />
                            <div className="helper">Full address helps customers find you faster.</div>
                        </div>

                        <div className="actions">
                            <button type="button" className="btn cta">Create Partner Account</button>
                        </div>

                        <div className="footer small">Already a partner? <Link to="/foodpartner/login">Sign in</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FoodPartnerRegister
