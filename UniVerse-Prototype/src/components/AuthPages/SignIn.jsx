import { useState } from "react";
import './AuthPages.css'


function SignIn({ FaUserGraduate, FaLock, FormHandle }) {
    
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();

        if(!User || !Password ) return;
        console.log(User, Password);
        setUser("");
        setPassword("");
    }

    return <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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

            <button onClick={handleLogin}>Sign In</button>
        </form>
        <p className="link" onClick={()=> FormHandle('signup')}>No Account? Create one</p> 
        <p className="link" onClick={()=>""}>Forgot Password?</p> 
    </div>
}

export default SignIn