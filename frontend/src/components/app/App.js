import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Planner from '../planner/Planner';
import NavigationBar from '../navigation/navigationBar'

import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <div>
      <NavigationBar /> { NavigationBar }
        <Routes>
          <Route path='/planner' element={<Planner navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
      </div>
    );
}

export default App;
