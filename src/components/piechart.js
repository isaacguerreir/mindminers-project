import React from 'react';
import Chart from './chart';

const PieChart = ({data}) => {

    const totalInvested = (list) => {
        const values = list.map((obj) => {
            if (obj.type === 'BUY') {
                return obj.quantity * obj.price;
            }
            return obj.quantity * obj.price * -1;
        })

        return values.reduce((acc, val) => {
            return acc += val;
        })
    }

    const result = data.map((operationList) => {
        return {
            name: operationList.stockId,
            y: Math.abs(totalInvested(operationList.batch))
        }
    })
    
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Composição atual da carteira'
        },
        tooltip: {
            pointFormat: 'Investido: <b>R${point.y:.2f}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: result
        }]
    }
    return(
        <Chart options={options} />
    )
}

export default PieChart;