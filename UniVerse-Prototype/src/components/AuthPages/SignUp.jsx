import { useState } from "react";
import './AuthPages.css'

function SignUp({ FaUserGraduate, FaLock, FormHandle }) {
    
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    function handleSignup(e) {
        e.preventDefault();

        if(!User || !Password || !ConfirmPassword) return;
        console.log(User, Password, ConfirmPassword);
        setUser("");
        setPassword("");
        setConfirmPassword("");
    }
    
    return <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
            <div className="form-control">
                <FaUserGraduate className="icon user"/>
                <input 
                    type="text" 
                    placeholder="Enter school email"
                    onChange={(e)=>setUser(e.target.value)}
                    value={User}
                />
            </div>
            <div className="form-control">
                <FaLock className="icon password"/>
                <input 
                    type="password" 
                    placeholder="Enter password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={Password}
                />
            </div>
            <div className="form-control">
                <FaLock className="icon password"/>
                <input 
                    type="password" 
                    placeholder="Confirm password"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    value={ConfirmPassword}
                />
            </div>
            <button onClick={handleSignup}>Sign Up</button>
        </form>
        <p className="link" onClick={()=> FormHandle('login')}>Already have an account? Log In</p>
    </div>
}

export default SignUp