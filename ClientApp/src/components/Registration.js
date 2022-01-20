import React from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../layouts/Navbar";
import { registerUser } from "../services/authservice";
import { authenticate, isAuth } from "../util/helper";
const Registration = () => {
  const history = useHistory();

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    buttonText: "Register",
  });

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const { username, email, password, buttonText } = formData;

  const  validateEmail = (emailAdress) =>
    {
      const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (emailAdress.match(emailRegex)) {
        return true; 
      } else {
        toast.error("invalid email");
        return; 
      }
    }

  
  const clickSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: "Submitting" });
    const isEmailCorrect = validateEmail(email);
    if(isEmailCorrect){
      const payload = {
        email,
        password,
        username
      }
      const response = await registerUser(payload);
      console.log(response);
      authenticate( response, () => {
        setFormData({
          ...formData,
          email: "",
          password: "",
          username:"",
          buttonText: "Register",
        });
       
        if(isAuth){
          history.push('/')
          return ;
        }
      });
    }
    
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <main>
        <div className="register__container">
          <div className="register__container__content">
            <h4>Register Here</h4>
            <p>Provide the Following details</p>
            <form>
              
              <div className="register__form-group">
                <div>
                  <label for="email">Username</label>
                  <br />
                  <input type="email" className="form-control" placeholder="" onChange={handleChange("username")} required />
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="email">Email</label>
                  <br />
                  <input type="email" className="form-control" placeholder="" onChange={handleChange("email")}   required/>
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="email">Password</label>
                  <br />
                  <input type="password" className="form-control" placeholder="" onChange={handleChange("password")} required />
                </div>
              </div>
              <div className="register__form-group register__form-group--btn">
                <button type="submit" onClick={clickSubmit}>{buttonText}</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
