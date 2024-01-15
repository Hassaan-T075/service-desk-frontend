import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import UserNavbar from "../UserNavbar";
import '../../../TicketDetails.css';
import { useState } from "react";
import axios from 'axios';

const TicketDetails = () => {
    const { id } = useParams();
    const { data: ticket, error, isPending } = useFetch(`http://localhost:5000/api/home/tickets/${id}`);

    const token = localStorage.getItem("token");

    const [showDialog, setShowDialog] = useState(false);
    const [reply, setReply] = useState('');

    const handleCloseDialog = () => setShowDialog(false);
    const handleOpenDialog = () => setShowDialog(true);


    const handleSubmitReply = async (event) => {
        event.preventDefault();
        const req = {
            id: ticket.ID,
            receiver: ticket.From,
            subject: "Re: " + ticket.Subject,
            text: reply
        }

        try {

            fetch('http://localhost:5000/api/home/tickets/send', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(req)
            });

            console.log(req);

            alert("Reply added")
            window.location.reload();

        } catch (error) {

            alert("Error adding added")

        }

        handleCloseDialog();
    };

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };


    return (
        <div className="ticket-details-container">
            <UserNavbar />
            <br></br>
            <div className="ticket-details-content">
                <br />
                {isPending && <div>Loading...</div>}
                {error && <div className="error-message">{error}</div>}
                {ticket && (
                    <>
                        <h2 className="ticket-title">{ticket.Subject}</h2>
                        <p className="ticket-info">{`From: ${ticket.From}`}</p>
                        <div className="ticket-body">{ticket.Body}</div>
                        <button className="reply-button" onClick={handleOpenDialog}>
                            Reply
                        </button>
                    </>
                )}
            </div>

            {showDialog && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <br></br>
                                <h5 className="modal-title">Add Reply</h5>
                            </div>
                            <div className="modal-body">
                                <br></br>
                                <textarea className="form-control" placeholder="Your reply" rows={5} cols={90} style={{ padding: '10px' }} value={reply} onChange={handleReplyChange}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmitReply}>
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default TicketDetails;