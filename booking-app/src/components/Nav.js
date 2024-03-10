import { NavLink } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* <div className="logo">
          <Brand />
        </div> */}
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Strona główna</NavLink>
            </li>
            <li>
              <NavLink to="/oferta">Oferta</NavLink>
            </li>
            <li>
              <NavLink to="/galeria">Galeria</NavLink>
            </li>
            <li>
              <NavLink to="/cennik">Cennik</NavLink>
            </li>
            <li>
              <NavLink to="/onas">O nas</NavLink>
            </li>
            <li>
              <NavLink to="/zarezerwuj">Zarezerwuj</NavLink>
            </li>
            <li>
              <NavLink to="/login">Zaloguj się</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
