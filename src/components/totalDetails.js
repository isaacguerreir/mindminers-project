import React from 'react';

const TotalDetails = ({ir, profit, loss, total}) => (
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
             <div>Lucro Total</div>
             <div>{ profit }</div>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '30%'
        }}>
             <div>Prejuízo Total</div>
             <div>{ loss }</div>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '30%'
        }}>
             <div>IR Total</div>
             <div>{ ir }</div>
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
             <div>{ total }</div>
        </div>
    </div>
)

export default TotalDetails;