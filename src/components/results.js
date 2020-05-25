import React from "react"
import { calculateIR } from '../service/calculator';
import TableResult from './table';
import PieChart from './piechart';
import ColumnChart from './columnChart';
import TotalDetails from './totalDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Results = ({ listStocks }) => {

    const existThisMonth = (el, list) => {
        return list.indexOf(el) === -1 ? true : false;
    }

    const stockDivideByMonth = (operationList) => {
        
        const dateList = operationList.map((operation) => {
            return operation.date
        });

        let months = [];
        dateList.forEach(function(date) {
            if (existThisMonth(date.getMonth(), months)) {
                months.push(date.getMonth());
            }
        })

        const opByMonth = months.map((month) => {
            const operationsByMonth = operationList.filter((operation) => {
                return operation.date.getMonth() === month;
            })
            return {
                month: month,
                operations: operationsByMonth,
                result: []
            }
        })

        return opByMonth;
    }

    const totalIR = (list) => {
        const IRList = list.map((obj) => { return obj.ir })
        return IRList.reduce((acc, val) => {
            return acc += val
        })
    }

    const totalProfit = (list) => {
        const profitList = list.map((obj) => { return obj.profit })
        return profitList.reduce((acc, val) => {
            return acc += val
        })
    }

    const totalLoss = (list) => {
        const lossList = list.map((obj) => { return obj.loss })
        return lossList.reduce((acc, val) => {
            return acc += val
        })
    }

    const totalLiquid = (list) => {
        const profit = totalProfit(list);
        const loss = totalLoss(list);
        const ir = totalIR(list);

        return profit - (loss + ir);
    }

    
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

    const IRcalc = listStocks.stocks.map((stock) => {
        const months = stockDivideByMonth(stock.batch);
        const result = months.map((obj) => {
            obj.result = calculateIR(obj.operations);
            return obj;
        })
        return result;
    });

    const stockIds = listStocks.stocks.map((stock)=> {
        return stock.stockId;
    })

    
    return (
        <div>
            <div style={{
                marginBottom: '2rem'
            }}>
                <PieChart
                    data={listStocks.stocks}
                />
            </div>
            <div style={{
                fontFamily: 'Rubik',

            }}>
                Esse é o texto que vai ficar aparecendo entre o chart e os dados detalhados
            </div>
            {
                stockIds.map((stockId, index) => {
                    return(
                        <ExpansionPanel key={stockId}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <div style={{
                                    fontFamily: 'Rubik',
                                    margin: 0,
                                    fontWeight: '700'
                                }}>
                                    {stockId}
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{
                                        maxWidth: '100vhm'
                                    }}>
                                        <ColumnChart data={IRcalc[index]}/>
                                    </div>
                                    {
                                        IRcalc[index].map((obj) => {
                                            return(
                                                <>
                                                    <ExpansionPanel key={stockId + obj.month}>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <div style={{
                                                                fontFamily: 'Rubik'
                                                            }}>
                                                                {returnMonthByNumber(obj.month)}
                                                            </div>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'column'
                                                            }}>
                                                            <TableResult
                                                                data={obj.operations}
                                                                results={obj.result}
                                                            />
                                                            <TotalDetails
                                                                profit={totalProfit(obj.result).toFixed(2)}
                                                                loss={totalLoss(obj.result).toFixed(2)}
                                                                ir={totalIR(obj.result).toFixed(2)}
                                                                total={totalLiquid(obj.result).toFixed(2)}
                                                            />
                                                            </div>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                    
                                                    
                                                </>
                                            );
                                        })
                                    }
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </div>
        
        
    )
}
 export default Results;