import React, {useState, useEffect} from "react";

import { Link, useHistory } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import LoginImage from "../assets/images/login.png";
import { getArtisan } from "../services/artisanservice";
import { loginUser } from "../services/authservice";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuth } from "../util/helper";


const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  useEffect(() => {
    loadArtisan();
  }, []);
  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
   
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    const {email, password} = values;
    if(!email || !password) {
      toast.error("Email or password cant be empty");
      setValues({ ...values, buttonText: "Submit" });
      return
    }
    const loginPayload = {
      email,
      password
    }
    const result =  await login(loginPayload);
    console.log(result);
   
  }

  const login = async (loginPayload) => {
    try {
      const result = await loginUser(loginPayload);
      if(!result.success){
        setValues({ ...values, buttonText: "Submit" });
        toast.error(result.errors[0]);
        return;
      }
      authenticate( result, () => {
        setValues({
          ...values,
          email: "",
          password: "",
          buttonText: "LoggedIn",
        });
        if(isAuth){
          history.push('/')
          return ;
        }
      });
      return result
    } catch (error) {
     
    }
  }

  const loadArtisan = async () => {
    try {
      const result= await getArtisan();
      console.log(result);
    } catch (error) {
      
    }

  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <main>
        <div className="login__container">
          <div className="login__container__sideImg">
            <img src={LoginImage} alt="img" />
          </div>
          <div className="login__container__formInput">
            <form className="login__container__form">
              <h4>Login</h4>
              <div className="login__form-group">
                <label for="email">Email</label>
                <br />
                <input type="email" className="form-control" placeholder="" value={email} onChange={handleChange("email")} required />
              </div>
              <div className="login__form-group">
                <label for="email">Password</label>
                <br />
                <input type="password" className="form-control" placeholder="" value={password} onChange={handleChange("password")} required />
              </div>
              <div className="login__form-btn">
                <button type="submit" className="login__form-btn--colored" onClick={clickSubmit}>
                  {buttonText}
                </button>
                <p>
                  Not a member?{" "}
                  <span>
                    <Link to="/registration">Register</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
