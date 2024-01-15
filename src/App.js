//import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './screens/home/HomePage';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import TicketDetails from './screens/home/tickets/TicketDetails'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/auth/login" element={<Login />}></Route>
          <Route exact path="/auth/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Homepage />}></Route>
          <Route path="/tickets/:id" element={<TicketDetails />}></Route>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
