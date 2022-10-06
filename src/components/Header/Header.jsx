import React from "react";
import "./Header.styles.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <img src="/img/goscrum.png" alt="logo" />
      <span>Go Scrum</span>
      <div onClick={handleLogout}>X</div>
    </header>
  );
};

export default Header;
