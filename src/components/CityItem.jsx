import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { cityName, date, emoji, id } = city;

  const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
