import  Axios  from 'axios';
import Joi from 'joi';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
let navigata = useNavigate();
const [isLodding, setIsLodding] = useState(false);
const [errorList, setErrorList] = useState([]);
const [error, setError] = useState('');
const [user, setUser] = useState({
  first_name:'',
  last_name:'',
  email:'',
  age:'',
  password:''
});

function getUserData(e) {
  let myUser = {...user};
  myUser[e.target.name] = e.target.value;
  setUser(myUser);
};

async function submitRegisterForm(e) {
    e.preventDefault();
    setIsLodding(true);
    let validationResult = validateRegisterForm();
    if(validationResult.error)
    {
      setErrorList(validationResult.error.details);
      setIsLodding(false); 
    }
    else
    {
    let {data} = await Axios.post(`https://route-egypt-api.herokuapp.com/signup`,user);
    if(data.message === "success") 
    {
      setIsLodding(false); 
        navigata('/signin');
    }
    else{
      setIsLodding(false); 
      setError(data.message);
    }
    }

};

  function validateRegisterForm() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required()
    })
    
    return schema.validate(user , {abortEarly:false});
    };




  return (<>
<div className='mx-auto form-p'>
  <div className='col-md-6 mx-auto'>
  {errorList.map((error ,i)=> i===4? <div key={i} className='alert p-2 alert-danger'> <div>
    <p className='m-0'>Password is required</p>
    <ul>
      <li>password must contain at least eight characters</li>
      <li>at least one number</li>
      <li>and both lower and uppercase letters</li>
      <li>and special characters</li>
    </ul>
    </div></div>  :<div key={i} className='alert p-2 alert-danger'>{error.message}</div> )}
    {error? <div className='alert alert-danger'>{error}</div> :''}
</div>

    <form onSubmit={submitRegisterForm} >
        <div className="row justify-content-center">
            <div className="col-md-3 ">
              <input onChange={getUserData} className='form-control mb-3' id='first_name' name='first_name' placeholder='Enter First Name'/>
            </div>

            <div className="col-md-3 ">
              <input onChange={getUserData} className='form-control mb-3' id='last_name' name='last_name' placeholder='Enter Last Name'/>
            </div>
        </div>

          <div className='col-md-6 mx-auto'>
            <input onChange={getUserData} type="email" className='form-control mb-3' id='email' name='email' placeholder='Enter Your Email'/>
          </div>

          <div className='col-md-6 mx-auto'>
            <input onChange={getUserData} type="number" className='form-control mb-3' id='age' name='age' placeholder='Enter Your Age' />
          </div>

          <div className='col-md-6 mx-auto'>
            <input onChange={getUserData} type="password" className='form-control mb-3' id='password' name='password' placeholder='Enter Password'/>
          </div>
          <div className='col-md-6 mx-auto'>

            <button type="submit" className="btn btn-secondary w-100">
            {isLodding === true ? <i className='fas fa-spinner fa-spin'></i>:'Sign up'}
            </button>
          </div>
    </form>
</div>
  </>
  )
}
