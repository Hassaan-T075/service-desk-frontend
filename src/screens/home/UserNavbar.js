import { Link } from "react-router-dom";

const UserNavbar = () => {
    return ( 
        <nav className="navbar">
            <h1> vServe </h1>
            <div className="links">
                <Link to="/home">Home</Link>
                {/* <Link to="/create">Create</Link> */}
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
     );
}
 
export default UserNavbar;