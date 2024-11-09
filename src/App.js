import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import { useSelector } from 'react-redux';
import { componentMap } from './components/HandleStack/HandleStack';
import Register from './Pages/Register/Register';

function App() {
  const stack = useSelector((state) => state.stack.components);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/:reference_Id/directories" element={<Main />} />
          <Route path="/:reference_Id/directories/:directoryId" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        
        {/* Render components from the stack */}
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
