import './App.css';
import Navbar from './Navbar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Notfound from './Notfound';
import Signin from './Signin';
import { useEffect, useState  } from 'react';
import jwtDecode from 'jwt-decode';
import Notes from './Notes';


function App() {
  let navigate = useNavigate();
const [userData, setUserData] = useState(null);


function saveUserData() {
  let encodedToken = localStorage.getItem('token'); 
  let decodedToken = jwtDecode(encodedToken); 
  setUserData(decodedToken);
};

useEffect(()=> {
  if(localStorage.getItem('token')){
    saveUserData();
  }
},[]);

function logOut() {
  setUserData(null);
  localStorage.removeItem('token');
  navigate('/register');
}

function ProtectedRoute(props) {
  if(localStorage.getItem('token') === null)
  {
    return <Navigate to='/signin' />
  }
  else
  {
    return props.children;
  }
};

  return ( <>
  <Navbar logOut={logOut} userData={userData} />
    <div className='container'>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Notes/></ProtectedRoute>} />
      <Route path='notes' element={<ProtectedRoute><Notes/></ProtectedRoute>} />
      <Route path='register' element={<Register/>} />
      <Route path='signin' element={<Signin saveUserData={saveUserData}/>} /> 
      <Route path='*' element={<Notfound/>} />
    </Routes>
    </div>

  
  </>
  );
}
export default App;
