import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import { useSelector } from 'react-redux';
import { componentMap } from './components/HandleStack/HandleStack';
import Register from './Pages/Register/Register';
import ParticlesComponent from './components/particles/Particles';

function App() {
  const stack = useSelector((state) => state.stack.components);
  return (
    <Router>
     <ParticlesComponent/>
      <div>
        <Routes>
          <Route path="/:reference_Id/directories" element={<Main />} />
          <Route path="/:reference_Id/directories/:directoryId" element={<Main />} />
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
        </Routes>
        
        <div>
        {stack.map((item) => (
                <div key={item.id}>
                    {componentMap[item.component]}
                </div>
            ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
