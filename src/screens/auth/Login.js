import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "./AuthNavbar";
import { Link } from "react-router-dom";


const Login = () => {

    const [username, setName] = useState('imuser');
    const [password, setPassword] = useState('p1');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const logger = { username, password }

        setIsLoading(true)

        //make post request here
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Request-Method': 'POST'
            },
            body: JSON.stringify(logger)
        }).then((res) => res.json())
            .then((data) => {

                setIsLoading(false);

                if (data.message === 'Login Successful') {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    console.log("Logged In");
                    navigate('/home');
                }
                else {
                    setError(data.message);
                    console.log(error);
                }

            }).catch((err) => {
                console.log(err.message)
            })

    }

    return (
        <div className="content">
            {/* <AuthNavbar /> */}
            <nav className="navbar">
                <h1> vServe <p>A service desk solution</p></h1>
            </nav>
            <br />
            <h2>Login</h2>
            <form
                onSubmit={handleSubmit}
            >
                <label>Username: </label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <label>{error}</label> */}
                <br/>
                {!isLoading && <button>Login</button>}
                {isLoading && <button disabled>Logging in</button>}
            </form>
        </div>
    );
}

export default Login;