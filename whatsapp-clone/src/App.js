import './App.css';
import React from 'react'
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import {useStateValue} from './context/StateProvider';

function App() {
  // const [user, setUser] = useState(null);
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user 
        ? (<Login/>)
        : (
          <div className="app__body">
            <Router>
              {/* Swith for cases same functionality as in plain JS */}
              <Sidebar/>
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )
      }
    </div>
  );
}

export default App;
