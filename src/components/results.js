import React from "react"
import { calculateIR } from '../service/calculator';
import TableResult from '../components/table';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Results = ({ listStocks }) => {

    const IRcalc = listStocks.stocks.map((stock) => {
        return calculateIR(stock.batch);
    });

    const stockIds = listStocks.stocks.map((stock)=> {
        return stock.stockId;
    })

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

    console.log(IRcalc);
    
    return (
        <div>
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
                                    fontFamily: 'Rubik'
                                }}>
                                    {stockId}
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <TableResult
                                        data={listStocks.stocks[index].batch}
                                        results={IRcalc[index]}
                                    />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        margin: '1.3rem 0',
                                        paddingRight: '0.3rem',
                                        fontFamily: 'Karla',
                                        fontSize: '0.9rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '30%'
                                        }}>
                                             <div>Lucro acumulado</div>
                                             <div>{totalProfit(IRcalc[index]).toFixed(2) }</div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '30%'
                                        }}>
                                             <div>Prejuízo acumulado</div>
                                             <div>{totalLoss(IRcalc[index]).toFixed(2) }</div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '30%'
                                        }}>
                                             <div>IR acumulado</div>
                                             <div>{totalIR(IRcalc[index]).toFixed(2) }</div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '30%'
                                        }}>
                                            <div></div><div></div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '30%',
                                            marginTop: '0.8rem'
                                        }}>
                                             <div>Total Líquido</div>
                                             <div>{ totalLiquid(IRcalc[index]).toFixed(2) }</div>
                                        </div>
                                    </div>
                                
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