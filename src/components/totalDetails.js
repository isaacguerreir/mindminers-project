import React from 'react';

const TotalDetails = ({ir, profit, loss, total}) => (
    <div style={styles.box}>
        <div style={styles.divisor}>
             <div>Lucro Total</div>
             <div>{ profit }</div>
        </div>
        <div style={styles.divisor}>
             <div>Prejuízo Total</div>
             <div>{ loss }</div>
        </div>
        <div style={styles.divisor}>
             <div>IR Total</div>
             <div>{ ir }</div>
        </div>
        <div style={{
            ...styles.divisor,
            marginTop: '0.8rem'
        }}>
             <div>Total Líquido</div>
             <div>{ total }</div>
        </div>
    </div>
)

const styles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin: '1.3rem 0',
        paddingRight: '0.3rem',
        fontFamily: 'Karla',
        fontSize: '0.9rem'
    },
    divisor: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '30%'
    }
}

export default TotalDetails;