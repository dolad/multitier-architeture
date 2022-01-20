import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Painter from "../assets/images/painter.png";
import ImageOne from "../assets/images/image1.png";
import ImageTwo from "../assets/images/image2.png";
import ImageThree from "../assets/images/image3.png";
import Pointing from "../assets/images/pointing.png";
import Testimonial from "../assets/images/testimonial.png";
import Footer from "../layouts/Footer";
import { getCategories } from "../services/categoryservice";
import { getArtisan , getArtisanByLocation, getArtisanBySkills} from "../services/artisanservice";


const Index = () => {

  const [categories, setCategories] = React.useState(null);
  const [artisans, setArtisans] = React.useState(null);
  const [searchBySkillValue, setSearchBySkillValue] = React.useState(null);
  
  const loadCategories = async () => {
    const result = await getCategories();
    console.log(result);
    setCategories(result);
  }


  const loadArtisans = async () => {
    const result =await getArtisan()
    console.log(result);
    setArtisans(result);
  }

  
  

  const CategoryComponent = () => {
    return (
        <>
        {
          categories && categories.map(item => (
            <Link to="/hire" key={`categories${item.id+1}`}>
                <div className="card">
                  <div className="container">
                    <h4>
                      <b>{item.title}</b>
                    </h4>
                    <p>
                    {item.description}
                    </p>
                  
                  </div>
              </div>
            </Link>
          ))
        }
        
        </>
        
    )
  }


  const searchBySkill = async (event) => {
      if(event.charCode === 13){
        setSearchBySkillValue(event.target.value);
        const payload = {
          skill: event.target.value,
          
        }
       const result = await getArtisanBySkills(payload);
       if(result.artisans && result.artisans.length){
         setArtisans(result.artisans);
       }
      }
      return;
      
  }

  const searchByLocation = async (event) => {
    if(event.charCode === 13){
      console.log("i am pressing");
      setSearchBySkillValue(event.target.value);
      const payload = {
        location: event.target.value,
      }
     const result = await getArtisanByLocation(payload);
     console.log(result);
     if(result.artisans && result.artisans.length){
       setArtisans(result.artisans);
       return;
     }
     if(result){
       setArtisans(result);
     }
    }
    return;
    
}
   
  const ArtisanComponent = () => {
    return (
        <>
        {
          artisans && artisans.map(item => (
            <Link to={{ 
              pathname: '/hire',
              state: item.id
             }} key={`artisan${item.id+1}`} >
            <div className="card">
              <img src={ImageOne} alt="Avatar" />
              <div className="container">
                <h4>
                  <b>{item.user.userName && item.user.userName}</b>
                </h4>
                <h6>{item.skills.title && item.skills.title}</h6>
                <p>
                  {item.description && item.description}
                </p>
                <p>
                  Total Jobs : 
                  {item.job ? item.job.length : 0}
                </p>
                <p>
                  locations: <b />
                   {item.location && item.location.toUpperCase()}
                </p>
                <p className="card__star">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </p>
              </div>
            </div>
          </Link>
          ))
        }
        
        </>
        
    )
  }


  React.useEffect(() => {
    loadCategories()
    loadArtisans()
  }, []);


  return (
    <div>
      <Navbar />
      <main>
        <div className="main__container">
          <section className="main__container__bg">
            <div className="main__container__bg__image">
              <img src={Painter} alt="" />
            </div>

            <aside className="main__container__bg__aside">
              <h4>HIRE a top Artisan!</h4>
              <p>
                Vertisan is an online market place that connect users to nearby
                verified artisans
              </p>

              <div className="input-section d-none d-md-flex justify-between mt-5">
                    <input type="text" placeholder="Search by skills" className="form-control w-50 mr-3" onKeyPress={searchBySkill}/>
                    <input type="text" placeholder="Search by location" className="form-control w-50" onKeyPress={searchByLocation}  />
              </div>
            </aside>
          </section>

          <section className="main__container__feature">
            <h4> Categories</h4>
            <div className="main__container__feature__content">
            <CategoryComponent />              
            </div>
          </section>

          <section className="main__container__feature">
            <h4>Featured Artisans</h4>
            <div className="main__container__feature__content">
             
            <ArtisanComponent />
            <ArtisanComponent />
            <ArtisanComponent />
              
            </div>
          </section>

          <section className="main__container__how-it-works">
            <small>How it works</small>
            <div className="main__container__how-it-works__header">
              <div className="instruction">
                <h4>Follow our steps, We Will Help You</h4>
                <p>
                  Follow the steps below to become a verified artisan and to
                  become user
                </p>
              </div>
              <div className="main__container__how-it-works__mthd">
                <svg
                  width="45"
                  height="30"
                  viewBox="0 0 45 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 21.6667L23.3333 15L15 8.33337V13.3334H0V16.6667H15V21.6667Z"
                    fill="white"
                  />
                  <path
                    d="M41.6667 0H26.6667C24.8284 0 23.3334 1.495 23.3334 3.33333V10H26.6667V3.33333H41.6667V26.6667H26.6667V20H23.3334V26.6667C23.3334 28.505 24.8284 30 26.6667 30H41.6667C43.505 30 45 28.505 45 26.6667V3.33333C45 1.495 43.505 0 41.6667 0Z"
                    fill="white"
                  />
                </svg>

                <div className="register__section">
                  <div>
                    <h5>Register</h5>
                    <p>
                      if you do not have your account,please register first so
                      you can become a verifed artisan
                    </p>
                  </div>
                  <div>
                    <h5>Documentation</h5>
                    <p>
                      You need to buid a profile so that users can believe in
                      your abilities
                    </p>
                  </div>
                  <div>
                    <h5>Find Artisan</h5>
                    <p>
                      You can find an artisan that is nearby that suit your job
                      request
                    </p>
                  </div>
                </div>
              </div>

              <div className="mini__about__container">
                <div>
                  <img src={Pointing} alt="" />
                </div>
                <div className="mini__about__content">
                  <small>About Us</small>
                  <h5>We provide a Place to Find Trusted Artisans</h5>
                  <p>
                    We will help you find an artisan that is nearby and suit
                    your job interest
                  </p>
                </div>
              </div>

              <div className="mini__testimonial__container">
                <div className="mini__testimonial__contentOne">
                  <small>Testimonial</small>
                  <h5>What Our Client Say About Us</h5>
                  <p>
                    Vertisan is the best. I have used this website for my work
                    and the artisans have been reliable and excellent.
                  </p>
                  <div className="testimonial">
                    <img src={Testimonial} alt="" />
                    <div>
                      <p className="title">Tamara Clonde</p>
                      <p>CEO ClonInteriors</p>
                    </div>
                  </div>
                </div>
                <div className="mini__testimonial__contentTwo">
                  <img src={Testimonial} alt="" />
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;
