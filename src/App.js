import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import './App.css';
import Admin from "./Pages/Admin";
import Createcourse from "./Pages/Createcourse";
import InstructorPanel from "./Pages/InstructorPanel";
import Lecture from "./Pages/Lecture";

function App() {
  return (
<Router>
      <div className="App">
        <Routes>
        <Route path="/lecture-add/:courseId" element={<Lecture/>} /> 

          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/create" element={<Createcourse/>}/>
          <Route path="/panel" element={<InstructorPanel/>}/>
          </Routes>
          </div>
          </Router>
      );
}

export default App;
