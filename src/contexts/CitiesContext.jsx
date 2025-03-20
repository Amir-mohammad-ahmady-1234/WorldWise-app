import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";
const jsonFilePath = "../data/cities.json";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        // const res = await fetch(jsonFilePath);
        const data = await res.json();
        setCities(data);
        // setCities(data.cities);
      } catch {
        console.warn("can not loading data ....");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      // const res = await fetch(`${jsonFilePath}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      // setCities(data.cities);
    } catch {
      console.warn("can not loading data ....");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getCity, currentCity, isLoading }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used out of the CitiesProvider!");
  return context;
}

export { CitiesProvider, useCities };
