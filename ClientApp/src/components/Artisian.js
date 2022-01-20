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
import { useHistory } from "react-router-dom";




const Artisian = () => {
  const history = useHistory();
   const [file, setFile] = React.useState(null);
   const [skillOption, setSkillOption] = React.useState(null);
   const {id:userId} = isAuth();
   
   const [formData, setFormData] = React.useState({
    LicenceNumber: "",
    Description: "",
    location: "",
    licencedOrganization: "",
    userId,
    identityType:"",
    skillId:"",
    profileUrl:"",
  });

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const {LicenceNumber,Description,location, licencedOrganization, identityType, skillId} = formData;
  const validate = () => {
    if(!LicenceNumber || LicenceNumber === ""){
      toast.error("Licenced cant be empty")
      return false;
    }
    if(!Description || Description === ""){
      toast.error("Description cant be empty");
      return false;
    }
    if(!licencedOrganization || licencedOrganization === ""){
      toast.error("licencedOrganization cant be empty");
      return false;
    }
    if(!location || location === ""){
      toast.error("location cant be empty");
      return false;
    }
    return true
  }
  const loadSkills = async() => {
    const result = await getSkills();
    setSkillOption(result);
    
  }

  React.useEffect(() => {
      loadSkills();
  }, []);

  
  const handleClick = async(e) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    console.log('About to send formData...');
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(firebase);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (getDownloadURL) => {
            console.log("downloadUrl",getDownloadURL);
            setFormData({...formData, profileUrl:getDownloadURL, skillId:parseInt(skillId)});
            console.log("datas",formData);
            const result = await createArtisan(formData);
            if(result.success){
              toast.success("success created")
            }
            history.push('/');
          });
        }
      );
      
    } else {
      toast.error("Please add an images"); 
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <main>
        <div className="register__container">
          <div className="register__container__content">
            <h4>Artisan Documentation Page</h4>
            <p>Provide the Following details</p>
            <form>
              <div className="register__form-group">
                <div>
                  <label for="number">Licensed Number</label>
                  <br />
                  <input type="email" className="form-control" placeholder="" onChange={handleChange("LicenceNumber")}/>
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="organization">Licensed Organisation</label>
                  <br />
                  <input type="email" className="form-control" placeholder="" onChange={handleChange("licencedOrganization")} />
                </div>
              </div>


              <div className="register__form-group">
                <div>
                  <label for="location">Location</label>
                  <br />
                  <input type="text" className="form-control" placeholder="" onChange={handleChange("location")}/>
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="description">Describe yourself</label>
                  <br />
                  <input type="text" className="form-control" placeholder="" onChange={handleChange("Description")} />
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="description">Identity Card Type</label>
                  <br />
                  <input type="text" className="form-control" placeholder="" onChange={handleChange("identityType")} />
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="description">Skill</label>
                  <br />
                  <select value={skillId} className="form-control" onChange={handleChange("skillId")}>
                    {
                      skillOption && skillOption.map(item => (
                        <option value={item.id} key={`skill${item.id + 1}`} >{item.title}</option>
                      ))
                    }
                    
                  </select>
                
                </div>
              </div>

              <div className="register__form-group">
                <div>
                  <label for="description">Profile Image</label>
                  <br />
                  <input type="file" className="form-control" placeholder="" onChange={(e) => setFile(e.target.files[0])} />
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

export default Artisian;
