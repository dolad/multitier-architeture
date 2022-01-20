import React from "react";
import Navbar from "../layouts/Navbar";
import ImageOne from "../assets/images/image1.png";
import { Link, useLocation } from "react-router-dom";
import { getSingleArtisan } from "../services/artisanservice";


const Hire = () => {
  const location = useLocation();
  const [artisan, setArtisan] = React.useState(null);
  console.log(location);

  const loadArtisanDetail = async () => {
    const singleArtisan = await getSingleArtisan(location.state);
    console.log(singleArtisan);
    setArtisan(singleArtisan);
  }

  React.useEffect(() => {
    loadArtisanDetail();
  }, []);


  return (
    <div>
      <Navbar />
      <main className="hire__container">
        {artisan && <section>
          <div className="hire__container__content">
            <div className="hire__container__img">
              <img src={ artisan.profileUrl ? artisan.profileUrl : ImageOne  } alt="" />
            </div>

            <div className="hire__container__details">
              <h4>{artisan.user && artisan.user.userName}</h4>
              <p className="hire__container__job-title">
                <b>{artisan.skills.title && artisan.skills.title}</b>
              </p>
              <p>{artisan.description && artisan.description}</p>
              <p className="card__star">Total Job : {artisan.jobs ? artisan.jobs.length : 0}</p>
              <button>
                <Link to= {{ 
                pathname: '/start-job',
                state: artisan.id
               }}>
              Hire me
              </Link></button>
            </div>
          </div>

          <div className="hire__container__description">
            <div>
              <p>Location: {artisan.location && artisan.location}</p>
              <p>Members since: {artisan.dateJoined ? new Date(artisan.dateJoined).toDateString() : null}</p>
              <p>Email: {artisan.user.email}</p>
              <p>Licenced Organisation: {artisan.licencedOrganization && artisan.licencedOrganization}</p>
            </div>

            <div className="hire__container__description--extra-info">
              <p>
               
               {artisan.description && artisan.description}
              </p>
            </div>
          </div>
        </section>
        }
        
      </main>
    </div>
  );
};

export default Hire;
