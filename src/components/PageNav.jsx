import {  NavLink } from "react-router-dom";
import styles from './PageNav.module.css'

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">homePage</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
