import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FoodPartnerRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const businessName = e.target.businessName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const address = e.target.address.value;
        const contactName = e.target.contactName.value;
        const contactNo = e.target.contactNo.valu;

        const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
            businessName,
            email,
            password,
            address,
            contactName,
            contactNo

        }, {
            withCredentials: true,
        })
        console.log(response.data);
        navigate("/create-foodpartner")

    }
    return (
        <>
            <div className="auth-shell">
                <div className="auth-card">
                    <div className="title"><h2>Partner sign up</h2></div>
                    <div className="subtitle">Grow your business with our platform.</div>

                    <div className="switch-links"><span className="small">Switch:</span><Link to="/user/register">User</Link><Link to="/foodpartner/register" className="inactive">Food partner</Link></div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label name='businessName'>Business Name</label>
                            <input name='businessName' type="text" placeholder="Tasty Bites" />
                        </div>

                        <div className="row-2">
                            <div className="col">
                                <label name='contactName'>Contact Name</label>
                                <input name='contactName' type="text" placeholder="Jane Doe" />
                            </div>
                            <div className="col">
                                <label name='contactNo'>Phone</label>
                                <input name='contactNo' type="text" placeholder="+1 555 123 4567" />
                            </div>
                        </div>

                        <div>
                            <label name='email'>Email</label>
                            <input name='email' type="email" placeholder="business@example.com" />
                        </div>

                        <div>
                            <label name='password'>Password</label>
                            <input name='password' type="password" placeholder="Create password" />
                        </div>

                        <div>
                            <label name='address'>Address</label>
                            <input name='address' type="text" placeholder="123 Market Street" />
                            <div className="helper">Full address helps customers find you faster.</div>
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn cta">Create Partner Account</button>
                        </div>

                        <div className="footer small">Already a partner? <Link to="/foodpartner/login">Sign in</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FoodPartnerRegister
