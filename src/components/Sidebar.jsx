// import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      {/* <AppNav /> */}

      <p>List of cities</p>

      <Footer />
    </div>
  );
}

export default SideBar;
