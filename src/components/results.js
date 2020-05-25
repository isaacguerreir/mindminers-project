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
        <>
            <div style={styles.pieChart}>
                <PieChart data={listStocks.stocks} />
            </div>
            <div style={styles.description.paragraph}>
                Clique em cada <b>tipo de Ação</b> adicionada para conferir os detalhes (Lucro Total¹, Prejuízo Total² e Total Líquido³) e o IR calculado,
                os quais estarão dividos por mês.
            </div>
            <div style={styles.description.tip}>
                <div>¹ <i>Lucro Total</i> é calculado pelo somatório do valor de todas as operações em que o <i>Resultado Aferido</i> é maior que 0.</div>
                <div>² <i>Prejuízo Total</i> é calculado pelo somatório do valor de todas as operações em que o <i>Resultado Aferido</i> é menor que 0.</div>
                <div>³ <i>Total Líquido</i> é calculado pelo <i>Lucro Total</i> menos o <i>Prejuízo Total</i> menos o <i>Imposto de Renda Total</i>.</div>
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
                                <div style={styles.expansion.stockId}>{stockId}</div>
                            </ExpansionPanelSummary>
                            
                            <ExpansionPanelDetails>
                                <div style={styles.expansion.details.box}>
                                    <div style={styles.expansion.details.columnChart}>
                                        <ColumnChart data={IRcalc[index]}/>
                                    </div>
                                    {
                                        IRcalc[index].map((obj) => {
                                            return( <Month
                                                        key={stockId}
                                                        data={obj}
                                                        monthName={returnMonthByNumber(obj.month)}
                                                        profit={totalProfit(obj.result).toFixed(2)}
                                                        loss={totalLoss(obj.result).toFixed(2)}
                                                        ir={totalIR(obj.result).toFixed(2)}
                                                        total={totalLiquid(obj.result).toFixed(2)}
                                                    />
                                            )
                                        })
                                    }
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </>
        
        
    )
}

function Month(props) {
    const obj = props.data;
    const { profit, loss, ir, total, monthName} = props;
    return(
        <React.Fragment key={obj.month}>
            <ExpansionPanel key={obj.month}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div style={styles.expansion.details.month.box}>
                        {monthName}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div style={styles.expansion.details.month.result}>
                    <TableResult
                        data={obj.operations}
                        results={obj.result}
                    />
                    <TotalDetails
                        profit={profit}
                        loss={loss}
                        ir={ir}
                        total={total}
                    />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>
    )
}

const styles = {
    pieChart: {
        marginBottom: '2rem'
    },
    description: {
        paragraph: {
            fontFamily: 'Rubik',
            textAlign: `justify`,
            textJustify: `inter-word`
        },
        tip: {
            fontFamily: 'Rubik',
            fontSize: '0.6rem',
            marginBottom: '1rem',
            paddingLeft: '1rem'
        }
    },
    expansion: {
        stockId: {
            fontFamily: 'Rubik',
            margin: 0,
            fontWeight: '700'
        },
        details: {
            box: {
                display: 'flex',
                flexDirection: 'column'
            },
            columnChart: {
                maxWidth: '100vhm'
            },
            month: {
                box: {
                    fontFamily: 'Rubik'
                },
                result: {
                    display: 'flex',
                    flexDirection: 'column'
                }
            }
        }
    }
}



export default Results;