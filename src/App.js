import { useState } from 'react';
import './App.css';

function App() {

  const initialValues = {
    username: "",
    mailAddress: "",
    password: ""
  }
  const [ formValues, setFormValues ] = useState(initialValues);
  const [ formErrors, setFormErros ] = useState({});
  const [ isSubmit, setIsSubmit ] = useState(false);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErros(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors =  {};
    const regex = 
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!values.username) {
      errors.username = "Please put your username";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "Please put your email address";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "Did you put mail address right way?"
    }
    if (!values.password) {
      errors.password = "Please check your password";
    } else if (values.password.length < 4) {
      errors.password = "Password should be more than 4 letters.";
    } else if (values.password.length > 15) {
      errors.password = "Password should be less than 15 letters.";
    } 
    return errors;
  }

  return (
    <div className="formContainer">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Log in</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>User name</label>
            <input 
              type="text" 
              placeholder='Username' 
              name="username" 
              onChange={(event)=>handleChange(event)}
             />
          </div>
          <p className='errorMessage'>{formErrors.username}</p>
          <div className="formField">
            <label>E-mail</label>
            <input 
              type="text" 
              placeholder='E-mail' 
              name="mailAddress"
              onChange={(event)=>handleChange(event)}
             />
          </div>
          <p className='errorMessage'>{formErrors.mailAddress}</p>
          <div className="formField">
            <label>Password</label>
            <input 
              type="text" 
              placeholder='Password' 
              name="password"
              onChange={(event)=>handleChange(event)}
             />
          </div>
          <p className='errorMessage'>{formErrors.password}</p>
          <button className='submitButton'>Login</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className='messageSuccess'>Log in success!</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
