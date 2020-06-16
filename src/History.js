import React, { Component } from "react";
import Chart from "./components/Chart/Chart";
import { connect } from "react-redux";
class History extends Component {
  state = { data: [] };
  handleClick = (e) => {
    // console.log(e);
    const newCountryData = this.props.userData.historyData.filter(
      (data) => data.country === e
    );
    // console.log(newCountryData);
    // console.log(this.props);
    this.setState({ data: newCountryData[0] });
  };
  render() {
    const { userData } = this.props;
    const { historyData } = userData;
    // console.log(historyData);
    // console.log(userData);
    
    return (
      <div>
        {historyData.map((country, i) => {
          return (
            <div key={i}>
              <h6 key={i} value={country.country}>
                {country.country}
                <button
                
                  value={country.country}
                  onClick={(e) => this.handleClick(e.target.value)}
                >
                  display
                </button>
              </h6>
            </div>
          );
        })}
        <Chart data={this.state.data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userData: state };
};
//   export default History;
export default connect(mapStateToProps)(History);
