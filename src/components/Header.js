import React, { useContext } from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import DataContext from "../context/DataContext";

const Header = ({ title }) => {
  let { width } = useContext(DataContext);
  return (
    <header className="Header">
      <h1>{title}</h1>
      <p>
        {width < 768 ? (
          <FaMobileAlt />
        ) : width < 992 ? (
          <FaTabletAlt />
        ) : (
          <FaLaptop />
        )}
      </p>
    </header>
  );
};

export default Header;
