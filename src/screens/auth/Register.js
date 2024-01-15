import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import AuthNavbar from "./AuthNavbar";

const Register = () => {

    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = { username, password, role }

        setIsLoading(true)

        //make post request here
        fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Request-Method': 'POST'
            },
            body: JSON.stringify(user)
        }).then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                console.log(data)
                if (data.message === "User added") {
                    navigate('/auth/login');
                }
                else if (data.message === "user already exists") {
                    setError("User Already Exists");
                }
                else {
                    setError("Error Occured, Please Register Again")
                }

            }).catch((err) => {
                //setError(err.message);
                console.log(err.message)
            })

    }

    return (
        <div className="content">
            <nav className="navbar">
                <h1> vServe <p>A service desk solution</p></h1>
            </nav>
            <br />
            <h2>Register</h2>
            <form
                onSubmit={handleSubmit}
            >
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Role:</label>
                <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <label>{error}</label>
                {(error !== "") && <br />}
                {!isLoading && <button>Register</button>}
                {isLoading && <button disabled>Registering</button>}
            </form>
        </div>
    );
}

export default Register;