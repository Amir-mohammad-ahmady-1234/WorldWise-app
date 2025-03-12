import { Link } from "react-router-dom";
import AppNav from "../components/AppNav";
import PageNav from "../components/PageNav";

function HomePage() {
  return (
    <div>
      <PageNav />
      <AppNav />


      <h1>WorldWise</h1>

      <Link to='/app'>go to App</Link>
    </div>
  );
}

export default HomePage;
