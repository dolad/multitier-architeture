import React from 'react';
import LogoTwo from '../assets/images/logo2.png';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer__container">
              <div className="logo__img__lg">
                <img src={LogoTwo} alt="" />
              </div>
              <div>
                <p>About Us</p>
                <p>features</p>
                <p>new</p>
              </div>
              <div>
                <p>Our team</p>
                <p>Partner with us</p>
                <p>FAQ</p>
              </div>
              <div>
                <p>Accounts</p>
                <p>Support Centre</p>
                <p>feed Back</p>
              </div>
              <div>
                <p>
                  Questions or Feedbacks?
                  <br /> We love to hear from you.
                </p>
                <button>Your email</button>
              </div>
            </div>
          </footer>
    );
};

export default Footer;