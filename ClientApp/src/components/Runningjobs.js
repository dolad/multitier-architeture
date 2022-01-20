import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { loadUserJob, markJobAsComplete } from "../services/jobservice";
import { isAuth } from "../util/helper";

const RunningJobs = () => {
    const {id:userId} = isAuth();
    const [jobs, setJobs] = React.useState(null)

    const loadUsers = async() => {
        const payload = {
            userId
        }
        const result = await loadUserJob(payload);
        setJobs(result);
    }

    const markAsComplete =   (id) => async (event)  => {
        event.preventDefault();
        const payload = {
            id,
            usersId:userId,
            status:"completed",
            customerfeedback:"welldone job",
            rating: 5
        }
        console.log(payload);
        const result = await markJobAsComplete(payload);
        console.log(result);


    }
    
    React.useEffect(() => {
        loadUsers()   
    }, []);

 
    const JobContainer = () => (
        <>
        {
            jobs && jobs.map(item => (
                <Link to="/hire" style={{ "text-decoration":"none" }} className="ml-3" key={`jobs${item.id + 1}`} >
                    <div className="card">
                        <div className="container">
                        <h4 className="mt-2 p-3">
                            <b style={{ "color":"white" }}>{item && item.title}</b>
                        </h4>
                        <h6 className="p-3" style={{ "color":"white" }} >{item && item.description}</h6>
                        <p className="p-3" style={{ "color":"white" }}>
                            status : {item.status}
                        </p>
                            <div className="register__form-group register__form-group--btn">
                            <button type="Submit" onClick={markAsComplete(item.id)}>Complete job </button>
                            </div>

                        </div>
                    </div>
                </Link>
            ))
        }
        </>
    )

 
  return (
    <div>
      <Navbar />
      <main className="hire__container">
         <section>
            <div className="hire__container__details">
                    <h4 className="Jobs">Jobs as Artisan</h4>
            </div>
          <div className="hire__container__content">
               <JobContainer />
               
          </div>

          <div className="hire__container__details">
                    <h4 className="Jobs">Jobs as a User</h4>
            </div>
          <div className="hire__container__content">
               <JobContainer />
               
          </div>
        </section>
        
        
      </main>
    </div>
  );
};

export default RunningJobs;
