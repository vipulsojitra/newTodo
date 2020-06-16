// import axios from 'axios'

// export const fetchData = async (country) => {
//     let changableURL = url;
//     if (country) {
//         changableURL = `${url}/countries/${country}`
//     }
//     try {
//         const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableURL);
//                 return {
//             confirmed,
//             recovered,
//             deaths,
//             lastUpdate
//         };

//     } catch (error) {
//         console.log(error);

//     }
// }

// export const fetchDailyData = async () => {
//     try {
//         const { data } = await axios.get(`${url}/daily`)
// const modifiedData = data.map((dailyData) => ({
//     confirmed: dailyData.confirmed.total,
//     deaths: dailyData.deaths.total,
//     date: dailyData.reportDate,
// }))
//         return modifiedData;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const fetchCountries = async () => {
//     try {
//         const { data: { countries } } = await axios.get(`${url}/countries`)

//         return countries.map((country) => country.name)
//     } catch (error) {
//         console.log(error);
//     }
// }

const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const url = "https://covid19.mathdro.id/api";

const initialState = {
  loading: false,
  cardData: {},
  chartData: {},
  countryData: [],
  historyData: [],
  error: "",
};
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_CARD_SUCCESS = "FETCH_USERS_CARD_SUCCESS";
const FETCH_USERS_CHART_SUCCESS = "FETCH_USERS_CHART_SUCCESS";
const FETCH_USERS_COUNTRY_SUCCESS = "FETCH_USERS_COUNTRY_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUserCardSuccess = (data) => {
  return {
    type: FETCH_USERS_CARD_SUCCESS,
    payload: data,
  };
};
const fetchUserChartSuccess = (data) => {
  return {
    type: FETCH_USERS_CHART_SUCCESS,
    payload: data,
  };
};
const fetchUserCountrySuccess = (data) => {
  return {
    type: FETCH_USERS_COUNTRY_SUCCESS,
    payload: data,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
const reducer = (state = initialState, action) => {
  // console.log(state);

  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_CARD_SUCCESS:
      console.log(action.payload);

      if (state.historyData.length === 10) {
        state.historyData.splice(0, 1);
      }
      if (!action.payload.country) {
        return {
          ...state,
          loading: false,
          cardData: {},
          error: "",
        };
      }
      return {
        ...state,
        loading: false,
        cardData: {
          data: action.payload.data,
          country: action.payload.country,
        },
        historyData: [...state.historyData, action.payload],
        error: "",
      };

    // return {
    //   ...state,
    //   loading: false,
    //   cardData: action.payload,
    //   // chartData: action.payload,
    //   error: "",
    // };
    case FETCH_USERS_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        chartData: action.payload,
        error: "",
      };
    case FETCH_USERS_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        countryData: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        cardData: {},
        error: action.payload,
      };
    default:
  }
};

// export const fetchData = (country) => {
//   console.log(country);

//   let changableURL = url;
//   if (country) {
//     // var data
//     changableURL = `${url}/countries/${country}`;
//   }
//   return function (dispatch) {
//     dispatch(fetchUserRequest);
//     axios
//     .get(changableURL)
//     .then((response) => {
//         let data = {  country: country, data: response.data };
//          dispatch(fetchUserCardSuccess(data));
//       })
//       .catch((error) => {
//         dispatch(fetchUserFailure(error.message));
//       });
//   };
// };
export const fetchData = (country) => {
  console.log(country);
  let dailyUrl = `${url}/daily`;

  let changableURL = url;
  if (country !== "global") {
    // var data
    changableURL = `${url}/countries/${country}`;
  } else {
    changableURL = `${url}`;
  }
  let cardData;
  let chartData;
  // let data
  return async function (dispatch) {
    dispatch(fetchUserRequest);
    if (country === "global") {
      await axios
        .get(dailyUrl)
        .then((response) => {
          chartData = { data: response.data };
          // console.log(data);
        })
        .catch((error) => {
          dispatch(fetchUserFailure(error.message));
        });
      dispatch(fetchUserChartSuccess(chartData));
    }
    await axios
      .get(changableURL)
      .then((response) => {
        if (country === "global") {
          cardData = {
            country: country,
            data: response.data,
            chartData: chartData.data,
          };
        } else {
          cardData = { country: country, data: response.data };
        }
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
    dispatch(fetchUserCardSuccess(cardData));
  };
};
// export const fetchDailyData = () => {
//   return function (dispatch) {
//     dispatch(fetchUserRequest);
//     axios
//       .get(`${url}/daily`)
//       .then((response) => {
//         const data = response.data;
//         //    console.log(data);
//         const modifiedData = data.map((dailyData) => ({
//           confirmed: dailyData.confirmed.total,
//           deaths: dailyData.deaths.total,
//           date: dailyData.reportDate,
//         }));
//         // console.log(modifiedData);

//         dispatch(fetchUserChartSuccess(modifiedData));
//       })
//       .catch((error) => {
//         dispatch(fetchUserFailure(error.message));
//       });
//   };
// };

export const fetchCountries = () => {
  //   try {
  //     const {
  //       data: { countries },
  //     } =  axios.get(`${url}/countries`);

  //     return countries.map((country) => country.name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  return function (dispatch) {
    dispatch(fetchUserRequest);
    axios
      .get(`${url}/countries`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        const data1 = data.countries.map((country) => country.name);
        //   console.log(data1);

        dispatch(fetchUserCountrySuccess(data1));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

// export const fetchUser = () => {
//     return function (dispatch) {
//         dispatch(fetchUserRequest())
//         axios.get('https://covid19.mathdro.id/api')
//             .then(response => {
//                 const data = response.data
//                 dispatch(fetchUserSuccess(data))
//             })
//             .catch(error => {
//                 dispatch(fetchUserFailure(error.message))
//             })
//     }
// }
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;

// export const fetchDate = async (country) => {
//     try {
//         let changableURL = `${url}/daily`;
//         console.log(country);

//         if (country) {
//             changableURL = `${url}/countries/${country}/confirmed`
//         }
//         const { data } = await axios.get(changableURL)

//         console.log(data);

//         let totalConfirm = [];
//         totalConfirm.push({
//             date: data[0].reportDate,
//             newCase: data[0].totalConfirmed
//         })
//         for (let i = 0; i < data.length; i++) {
//             if (i + 1 !== data.length) {

//                 totalConfirm.push({
//                     date: data[i + 1].reportDate,
//                     newCase: data[i + 1].totalConfirmed - data[i].totalConfirmed
//                 })
//             }
//         }
//         console.log(totalConfirm);

//         return totalConfirm;
//     } catch (error) {
//         console.log(error);
//     }
// }
