import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const {currentCity, deleteCity} = useCities()
  const { cityName, date, emoji, id, position } = city;

  function handleDelete (e) {
    e.preventDefault()

    deleteCity(id)
  }

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
