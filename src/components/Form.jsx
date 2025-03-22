import { useReducer, useEffect } from "react";
import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import { useUrlSearchParam } from "../hooks/useUrlSearchParam";
import Spinner from "./Spinner";
import Message from "./Message";

// react-picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_GETCITYDATA_API_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, ...action.payload };

    case "SET_LOADING":
      return { ...state, isLoadingGeoCoding: action.payload };

    case "SET_ERROR":
      return { ...state, errorLoc: action.payload };

    default:
      return state;
  }
}

export function convertToEmoji(countryCode) {
  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt())
  );
}

function Form() {
  const [lat, lng] = useUrlSearchParam();

  const initialState = {
    cityName: "",
    country: "",
    date: new Date(),
    notes: "",
    isLoadingGeoCoding: false,
    errorLoc: "",
    emoji: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        dispatch({ type: "SET_ERROR", payload: "" });
        dispatch({ type: "SET_LOADING", payload: true });

        const res = await fetch(
          `${BASE_GETCITYDATA_API_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "You cannot access this location! Please choose another location."
          );

        dispatch({
          type: "SET_FIELD",
          payload: {
            cityName: data.city || data.locality || "",
            country: data.countryName,
            emoji: convertToEmoji(data.countryCode),
          },
        });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (state.isLoadingGeoCoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="please select a location on the map." />;
  if (state.errorLoc) return <Message message={state.errorLoc} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              payload: { cityName: e.target.value },
            })
          }
          value={state.cityName}
        />
        <span className={styles.flag}>{state.emoji}</span>
      </div>

      <div className={styles.row}>
        {/* jsx: htmlfor  html: for */}
        <label htmlFor="date">When did you go to {state.cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", payload: { date: e.target.value } })
          }
          value={state.date}
        /> */}
        <DatePicker
          onChange={(date) =>
            dispatch({
              type: "SET_FIELD",
              payload: { date: date },
            })
          }
          selected={state.date}
          dateFormat="dd-MM-yyyy"
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", payload: { notes: e.target.value } })
          }
          value={state.notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
