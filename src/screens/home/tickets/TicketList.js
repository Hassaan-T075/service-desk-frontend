import { Link, useNavigate } from 'react-router-dom';
import '../../../TicketList.css';
import TicketDetails from './TicketDetails';

const TicketList = ({ tickets, title }) => {

    const navigate = useNavigate();

    return (
        <div className="ticket-list-container">
            <h1 className="title">{title}</h1>
            <table className="table custom-table">
                <thead className="thead-dark">
                    <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((item, index) => (
                        <tr key={index} onClick={() => navigate(`/tickets/${item.ID}`)} style={{ cursor: 'pointer' }} className="table-row-hover">
                            <td>{item.From}</td>
                            <td>{item.Subject}</td>
                            <td>
                                <span className={`badge ${item.Status === 'pending' ? 'badge-danger' : 'badge-success'}`}>
                                    {item.Status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketList;