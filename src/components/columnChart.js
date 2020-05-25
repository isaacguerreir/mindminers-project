import React from 'react';
import Chart from './chart';
import { totalIR, totalLoss, totalProfit, totalLiquid } from '../service/calculator';

const ColumnChart = ({data}) => {

    const returnMonthByNumber = (number) => {
        var months = {
            0: 'Janeiro',
            1: 'Fevereiro',
            2: 'Março',
            3: 'Abril',
            4: 'Maio',
            5: 'Junho',
            6: 'Julho',
            7: 'Agosto',
            8: 'Setembro',
            9: 'Outubro',
            10: 'Novembro',
            11: 'Dezembro',
        }
        return months[number];
    }

    const createCategories = (data) => {
        const categories = data.map((obj) => {
            return returnMonthByNumber(obj.month);
        });
        console.log(categories);
        return ["Maio"];
    }

    const createSeries = (data) => {
        const ir = data.map((obj) => {
            return totalIR(obj.result)
        });

        const loss = data.map((obj) => {
            return totalLoss(obj.result)
        });

        const profit = data.map((obj) => {
            return totalProfit(obj.result)
        });

        const total = data.map((obj) => {
            return totalLiquid(obj.result)
        });

        const series = [
            {
                name: 'IR Total',
                data: ir
            },
            {
                name: 'Lucro Total',
                data: profit
            },
            {
                name: 'Prejuízo Total',
                data: loss
            },
            {
                name: 'Total Líquido',
                data: total
            },
        ]
        console.log(series);
        return series;
    }

    

    console.log(data);
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Composição atual de ações'
        },
        tooltip: {
            formatter: function() {
                var s;
                if (this.point.name) { // the pie chart
                    s = this.point.name +' R$'+ this.y.toFixed(2);
                } else {
                    s = this.series.name + ': R$' + this.y.toFixed(2);
                }
                return s;
            }
        },
        xAxis: {
            categories: createCategories(data)
        },
        credits: {
            enabled: false
        },
        series: createSeries(data)
    }
    
    return (
        <Chart options={options} />
    )
}

export default ColumnChart;