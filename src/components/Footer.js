import React from 'react';

function Footer() {
  return (
    <footer className = "footer" >
      <div className = "footer-columns" >
        <div>
          <h4>Explore</h4>
          <p>Home<br />Questions<br />Articles<br />Tutorials</p>
        </div>
        <div>
          <h4>Support</h4>
          <p>FAQs<br />Help<br />Contact Us</p>
        </div>
        <div>
          <h4>Stay Connected</h4>
          <p>Facebook | Twitter | Instagram</p>
        </div>
      </div>
      <h2 id = "myp">DEV@Deakin 2024</h2>
      <p id = "myp">Privacy Policy | Terms | Code of Conduct</p>
    </footer>
  );
}

export default Footer;
