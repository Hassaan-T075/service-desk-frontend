import TicketList from './tickets/TicketList';
import useFetch from '../../hooks/useFetch';
// import React from 'react';
// import ReactDOM from 'react-dom';
import UserNavbar from './UserNavbar';

const Homepage = () => {
    const {data : tickets, isPending, error} = useFetch('http://localhost:5000/api/home/tickets')
    return (
        <div className="home">
            <UserNavbar/>
            {console.log(tickets)}
            {error && <div> {error} </div>}
            {isPending && <div>Loading...</div>}
            <br/>
            {/* Use ticket props */}
            {tickets && <TicketList tickets={tickets} title="All tickets" />}
        </div>
    );
}

export default Homepage;