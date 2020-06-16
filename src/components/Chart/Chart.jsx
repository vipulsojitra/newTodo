import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css'



const Chart = ({ data }) => {
    let { country } = data
    console.log(data);

    let userChartData = data;
    let confirmed
    let recovered
    let deaths
    if (country) {

        if (country !== "global") {
            confirmed = userChartData.data.confirmed
            recovered = userChartData.data.recovered
            deaths = userChartData.data.deaths
        } else {
            userChartData = data.chartData
        }
    }
    // useEffect(() => {
    //     store.dispatch(fetchData());
    // }, []);
    // useEffect(() => {
    //     store.dispatch(fetchDailyData());
    // }, []);
    // console.log("chart", data);

    const lineChart = (

        userChartData && userChartData.length ? (<Line
            data={{
                labels: userChartData.map(({ reportDate }) => reportDate),
                datasets: [{
                    data: userChartData.map(({ totalConfirmed }) => totalConfirmed),
                    label: "Infected",
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: userChartData.map(({ deaths }) => deaths.total),
                    label: "Deaths",
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: [
                            ' rgba(0, 0, 255, 0.5)',
                            ' rgba(0, 255, 0, 0.5)',
                            ' rgba(255, 0, 0, 0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `current state in ${country}` }
                }} />
        ) : null
    )
    //     var chart
    // if (country === "global") {
    //     chart=lineChart
    // }else{
    //     chart=barChart
    // }
    return (
        <div className={styles.container}>
            {/* {country ? barChart : lineChart} */}
            {country !== "global" ? barChart : lineChart}
            {/* {lineChart} */}
        </div>
    )
}



export default Chart;