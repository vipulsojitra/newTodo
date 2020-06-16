import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./app.module.css";
import coronaImage from "./image/image.png";
import { fetchCountries, fetchData } from "./api/index.js";
import store from "./api/index.js";
const Home = (props) => {
  const { userData } = props;
  const [state, setstate] = useState({});

  useEffect(() => {
    store.dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    setstate(userData);
  }, [userData]);

  const handleCountryChange = (country) => {
    // console.log(country);
    store.dispatch(fetchData(country));
  };

  // const { userData } = props;
  console.log(state);
  if (state && state.countryData) {
    let chartData = {
      country: state.cardData.country,
      chartData: state.chartData.data,
    };
    if (state.cardData.country !== "global") {
      chartData = state.cardData;
    }
    if (!state.cardData.data) {
      return (
        <div className={styles.container}>
          <img className={styles.image} src={coronaImage} alt="covid"></img>
          <CountryPicker
            data={state.countryData}
            handleCountryChange={handleCountryChange}
          />
          <h6>select country</h6>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <img className={styles.image} src={coronaImage} alt="covid"></img>
          <CountryPicker
            data={state.countryData}
            handleCountryChange={handleCountryChange}
            country={state.cardData.country}
          />
          <Cards data={state.cardData.data} />
          <Chart data={chartData} />
        </div>
      );
    }
  }
  return null;
  // }
};
const mapStateToProps = (state) => {
  return { userData: state };
};
export default connect(mapStateToProps)(Home);
