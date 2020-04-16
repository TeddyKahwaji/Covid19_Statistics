import axios from "axios";
const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const { confirmed, recovered, deaths, lastUpdate } = await fetch(
      changeableUrl
    ).then((info) => info.json());
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await await axios.get(`${url}/daily`);
    const temp = data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
    return temp;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.error(error);
  }
};
