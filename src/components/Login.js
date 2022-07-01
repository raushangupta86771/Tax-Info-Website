import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://second-deploy-taxcalc.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json.authToken);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            console.log("logged in..")
            history.push("/"); //redirecting to "/" endpoint
        }
        else {
            alert("Invalid Credintials")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return <>
        {/* <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="emaill" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="passwordl" className="form-control" id="email" name='password' placeholder="Password" value={credentials.password} onChange={onchange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form> */}


        <form className='loginlabel' onSubmit={handleSubmit} autoComplete="off">
            <h3>Login to Calculate Taxable Income</h3>
            <label className='loginlabel'>
                <input type="email" id="email" required name='email' value={credentials.email} onChange={onchange} autoComplete="off" htmlFor="exampleInputEmail1" className='loginInput' />
                <div className="label-text">Email</div>
            </label>
            <label className='loginlabel'>
                <input htmlFor="exampleInputPassword1" type="password" id="email" required name='password' placeholder="Password" value={credentials.password} onChange={onchange} autoComplete="off" className='loginInput' />
                <div className="label-text">Password</div>
            </label>
            <button type="submit" value="Submit" className="glow-on-hover loginsubmit" ><p>Login</p></button>
        </form>
    </>;
};

export default Login;
