import React from "react";

const Footer = () => {
  let date = new Date();
  return (
    <footer className="Footer">Copyright &copy; {date.getFullYear()}</footer>
  );
};

export default Footer;
