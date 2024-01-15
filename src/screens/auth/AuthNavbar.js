import { Link } from "react-router-dom";

const AuthNavbar = () => {
    return ( 
        <nav className="navbar">
            <h1> vServe <p>A service desk solution</p></h1>
            <div className="links">
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
     );
}
 
export default AuthNavbar;