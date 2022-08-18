import  Axios  from 'axios';
import Joi from 'joi';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin(props) {
let navigata = useNavigate();
const [isLodding, setIsLodding] = useState(false);
const [errorList, setErrorList] = useState([]);
const [error, setError] = useState('');
const [user, setUser] = useState({
  email:'',
  password:''
});
function getUserData(e) {
  let myUser = {...user};
  myUser[e.target.name] = e.target.value;
  setUser(myUser);
};

async function submitSigninForm(e) {
    e.preventDefault();
    setIsLodding(true);
    let validationResult = validateSigninForm();
    if(validationResult.error)
    {
      setErrorList(validationResult.error.details);
      setIsLodding(false); 
    }
    else
    { 
    let {data} = await Axios.post(`https://route-egypt-api.herokuapp.com/signin`,user);
    
    if(data.message === "success") 
    {
      setIsLodding(false); 
  localStorage.setItem('token', data.token);
  props.saveUserData();
      navigata('/notes');
    }
    else{
      setIsLodding(false); 
      setError(data.message);
    }
    }
};

  function validateSigninForm() {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required()
    });
    
    return schema.validate(user , {abortEarly:false});
    };




  return (<>
<div className=' form-p '>
  <div className='col-md-6 mx-auto'>
  {errorList.map((error ,i)=> i===1? <div key={i} className='alert p-2 alert-danger'>{error.message}</div> :<div key={i} className='alert p-2 alert-danger'>incorrect password</div>)}
  {error? <div className='alert alert-danger'>{error}</div> :''}

  </div>

    <form onSubmit={submitSigninForm} >
          <div className='col-md-6 mx-auto'>
            <input onChange={getUserData} type="email" className='form-control mb-3' id='email' name='email' placeholder='Enter Your Email'/>
          </div>

          <div className='col-md-6 mx-auto'>
            <input onChange={getUserData} type="password" className='form-control mb-3' id='password' name='password' placeholder='Enter Password'/>
          </div>
          <div className='col-md-6 mx-auto'>

            <button type="submit" className="btn btn-info w-100">
            {isLodding === true ? <i className='fas fa-spinner fa-spin'></i>:'Sign up'}
            </button>
          </div>
    </form>
</div>
  </>
  )
}
