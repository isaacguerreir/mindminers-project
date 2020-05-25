import React from 'react';
import MaterialTable from 'material-table'
import { TableIcons, Localization } from '../service/utils';

const TableResult = ({data, results}) => {
    const dataMergeResults = data.map((obj, index) => {
        return {
            date: obj.date,
            stockId: obj.stockId,
            type: obj.type,
            price: obj.price,
            quantity: obj.quantity,
            tax: obj.tax,
            ir: results[index].ir
        }
    })

    return (
        <MaterialTable
            icons={TableIcons}
            columns={[
                { title: 'Nome da ação', field: 'stockId', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle },
                { title: 'Tipo de operação', field: 'type', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle, lookup: { BUY: 'Compra', SELL: 'Venda' } },
                { title: 'Data da operação', field: 'date', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle, type: 'date' },
                { title: 'Preço unitário', field: 'price', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle },
                { title: 'Quantidade de papéis', field: 'quantity', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle },
                { title: 'Taxa de corretagem', field: 'tax', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle },
                { title: 'Imposto de Renda', field: 'ir', headerStyle: styles.headerStyle, cellStyle: styles.cellStyle }
            ]}
            data={dataMergeResults}
            title=""
            options={{
                exportButton: true,
                searchFieldStyle: styles.searchFieldStyle,
            }}
            localization={Localization}
        />
    )
}

const styles = {
    headerStyle: {
        fontSize: '0.7rem',
        padding: '1rem',
        fontFamily: 'Karla'
    },
    cellStyle: {
        padding: '1rem',
        fontFamily: 'Karla'
    },
    searchFieldStyle: {
        fontFamily: 'Karla'
    }
}

export default TableResult;