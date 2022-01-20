import React from "react";

import Navbar from "../layouts/Navbar";

import firebase from '../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { toast, ToastContainer } from "react-toastify";
import { getSkills } from "../services/skillsService";
import { isAuth } from "../util/helper";
import { async } from "@firebase/util";
import { createArtisan } from "../services/artisanservice";
import { useLocation, useHistory } from "react-router-dom";
import { createJob } from "../services/jobservice";



const StartJob = () => {
  
   const {id:userId} = isAuth();
   const locationHistory = useLocation();
    const history = useHistory();
   const [formData, setFormData] = React.useState({
    Title: "",
    Description: "",
    status: "ongoing",
    artisanId: locationHistory.state,
    userId,
    
  });

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const {Title, Description } = formData;
  const validate = () => {
    if(!Title || Title === ""){
      toast.error("Title cant be empty")
      return false;
    }
    if(!Description || Description === ""){
      toast.error("Description cant be empty");
      return false;
    }
    return true
  }
 

 
  const handleClick = async(e) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    console.log(formData);
    await createJob(formData);
    history.push('/running-jobs');
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <main>
        <div className="register__container">
          <div className="register__container__content">
            <h4>Provide some details addition detail of your jobs</h4>
            <p>Provide the Following details</p>
            <form>
              <div className="register__form-group">
                <div>
                  <label for="number">Title</label>
                  <br />
                  <input type="email" className="form-control" placeholder="" onChange={handleChange("Title")}/>
                </div>
              </div>
              <div className="register__form-group">
                <div>
                  <label for="organization">Description or Address</label>
                  <br />
                  <input type="email" className="form-control" placeholder="" onChange={handleChange("Description")} />
                </div>
              </div>
              <div className="register__form-group register__form-group--btn">
                <button type="submit" onClick={handleClick}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartJob;
