import { useReducer, useEffect } from "react";
import Button from "./Button";
import BackButton from "./BackButton";

import styles from "./Form.module.css";
import { useUrlSearchParam } from "../hooks/useUrlSearchParam";
import Spinner from "./Spinner";
import Message from "./Message";

const BASE_GETCITYDATA_API_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

// Action Types
const ACTIONS = {
  SET_FIELD: "setField",
  SET_LOADING: "setLoading",
  SET_ERROR: "setError",
};

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoadingGeoCoding: action.value,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errorLoc: action.value,
      };
    default:
      return state;
  }
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
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

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          dispatch({ type: ACTIONS.SET_ERROR, value: "" });
          dispatch({ type: ACTIONS.SET_LOADING, value: true });

          const res = await fetch(
            `${BASE_GETCITYDATA_API_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "You cannot access this location! Please choose another location."
            );

          dispatch({ type: ACTIONS.SET_FIELD, field: "cityName", value: data.city || data.locality || "" });
          dispatch({ type: ACTIONS.SET_FIELD, field: "country", value: data.countryName });
          dispatch({ type: ACTIONS.SET_FIELD, field: "emoji", value: convertToEmoji(data.countryCode) });
        } catch (err) {
          dispatch({ type: ACTIONS.SET_ERROR, value: err.message });
        } finally {
          dispatch({ type: ACTIONS.SET_LOADING, value: false });
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (state.errorLoc) return <Message message={state.errorLoc} />;

  if (state.isLoadingGeoCoding) return <Spinner />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: ACTIONS.SET_FIELD, field: "cityName", value: e.target.value })
          }
          value={state.cityName}
        />
        <span className={styles.flag}>{state.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {state.cityName}?</label>
        <input
          id="date"
          onChange={(e) =>
            dispatch({ type: ACTIONS.SET_FIELD, field: "date", value: e.target.value })
          }
          value={state.date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: ACTIONS.SET_FIELD, field: "notes", value: e.target.value })
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
