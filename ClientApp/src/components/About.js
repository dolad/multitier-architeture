import React from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Painter from "../assets/images/painter.png";

const About = () => {
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
              <h4>About US</h4>
            </aside>
          </section>

          <section className="about__content">
            <h4>We provide a Place to Find Trusted Artisans</h4>
            <p>
              Vertisan.com is an online business directory for artisans and
              small and medium scale enterprises (“SMEs”).
              <br />
              <br />
              The portal provides an avenue for small businesses to increase
              their market coverage by opening up new markets segments for their
              services via the internet.
              <br />
              <br />
              The main objective of the portal is to provide users with
              information on where they can secure artisan services. The portal
              is also meant to open up the potential market space for artisans
              operating in urban centers and to basically provide a platform for
              them to “advertise” their services to a much wider audience than
              they would normally have access to. In addition, it also serves as
              a search engine for individuals who desire information on where
              they can access artisan/home services around their neighborhood.
            </p>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default About;
