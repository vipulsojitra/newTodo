import React from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
// import store from "../../api";
// import { fetchCountries } from '../../api'
import styles from './CountryPicker.module.css'
const ContryPicker = ({ handleCountryChange,data,country }) => {
    console.log(country);
    
    // const [fetchedCountries, setFetchedCountries] = useState([]);
    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         setFetchedCountries(await fetchCountries());

    //     }
    //     fetchAPI()
    // }, [setFetchedCountries]);
    // useEffect(() => {
    //     store.dispatch(fetchCountries());
    // }, []);
    // const  userCountryData  = data;
    // console.log("country", data);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue={country} onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">select</option>
                <option value="global">Global</option>
                {data.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default ContryPicker;