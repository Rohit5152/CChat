// import logo from './logo.svg';
// import { Socket } from '../../server/node_modules/socket.io/dist';
import socketIO from 'socket.io-client';
// import { Socket } from '../../server/node_modules/socket.io/dist';
import {BrowserRouter as Router,Route} from "react-router-dom"
import Join from './component/Join/Join';
import Chat from "./component/chat/Chat"
import './App.css';

// const ENDPOINT="http://localhost:4500/";
// const socket=socketIO(ENDPOINT,{transports:['websocket']})

function App() {
 
  return (
    <div className="App">
    <Router>
      <Route  exact path="/" component={Join}/>
      <Route path="/chat" component={Chat}/>
    </Router>
    </div>
  );
}

export default App;
