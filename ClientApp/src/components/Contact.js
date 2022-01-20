import React from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const Contact = () => {
  return (
    <div>
      <Navbar />

      <main>
        <div className="contact__container">
          <section className="contact__container__header">
            <h4>GET IN TOUCH</h4>
            <p>
              <svg
                width="15"
                height="20"
                viewBox="0 0 15 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.77189 0.439054L3.84789 0.0950539C4.85789 -0.226946 5.93489 0.294054 6.36789 1.31205L7.22689 3.34005C7.60089 4.22305 7.39389 5.26205 6.71289 5.90805L4.81889 7.70605C4.93489 8.78205 5.29689 9.84105 5.90289 10.8831C6.47867 11.8913 7.25091 12.7737 8.17389 13.4781L10.4489 12.7181C11.3119 12.4311 12.2509 12.7621 12.7789 13.5391L14.0119 15.3491C14.6269 16.2531 14.5169 17.4991 13.7539 18.2651L12.9359 19.0861C12.1219 19.9031 10.9589 20.2001 9.88389 19.8641C7.34489 19.0721 5.01089 16.7211 2.88089 12.8111C0.747887 8.89505 -0.00511295 5.57105 0.622887 2.84305C0.886887 1.69505 1.70389 0.780054 2.77189 0.439054Z"
                  fill="black"
                />
              </svg>
              Phone: +765 4534 80984 87
            </p>
            <p>
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H26C26.5304 20 27.0391 19.7893 27.4142 19.4142C27.7893 19.0391 28 18.5304 28 18V2C28 1.46957 27.7893 0.960859 27.4142 0.585786C27.0391 0.210714 26.5304 0 26 0ZM23.8 2L14 8.78L4.2 2H23.8ZM2 18V2.91L13.43 10.82C13.5974 10.9361 13.7963 10.9984 14 10.9984C14.2037 10.9984 14.4026 10.9361 14.57 10.82L26 2.91V18H2Z"
                  fill="black"
                />
              </svg>
              Email: Vertisan@rocketmail.com
            </p>
          </section>
          <section className="contact__container__form">
            <form>
              <div className="form">
                <div className="contact__container__form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                  />

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Your Phone"
                  />
                </div>
                <div className="contact__container__textarea">
                  <textarea
                    id="w3review"
                    name="w3review"
                    rows="12"
                    cols="45"
                    placeholder="Your Message"
                  ></textarea>
                </div>
              </div>

              <div className="contact__container__form-btn">
                <button
                  type="submit"
                  className="contact__container__form-btn--colored"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
          <Footer/>
        </div>
      </main>
    </div>
  );
};

export default Contact;
