import React, { useState } from "react"
import MaterialTable from 'material-table'
import Layout from "../components/layout";
import Results from "../components/results";
import Operation from "../domain/Operation";
import ListStocks from "../domain/ListStocks";
import { TableIcons, Localization } from '../service/utils';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function OperationsPage() {
    const [values, setValues] = useState({
        stockId: 'PETR4',
        type: 'BUY',
        date: new Date(),
        price: '10',
        quantity: '10',
        tax: '10',
        operationList: [],
        open: false,
        results: false
    })

    const [stocks, setStocks] = useState(new ListStocks());
    const [alert, setAlert] = useState(false);

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
    };

    const isValid = (inputOp) => {
        if (inputOp.date === "Invalid Date" |
            inputOp.stockId === "" |
            inputOp.type === "" |
            parseFloat(inputOp.price) === 0 |
            parseFloat(inputOp.quantity) === 0) {
            return false;
        }
        return true; 
    }

    const addOperation = () => {
        const inputOp = {
            date: values.date,
            stockId: values.stockId,
            type: values.type,
            price: values.price,
            quantity: values.quantity,
            tax: values.tax
        }

        if (isValid(inputOp)) {
            const operation = new Operation(
                inputOp.date,
                inputOp.stockId,
                inputOp.type,
                parseFloat(inputOp.price).toFixed(2),
                parseFloat(inputOp.quantity).toFixed(2),
                parseFloat(inputOp.tax).toFixed(2)
            );

            let operationListUpdated = values.operationList;
            operationListUpdated.push(operation);
            
            handleOperationListChange(operationListUpdated);
            const copy = stocks;
            copy.addOperationByStockId(operation);

            setStocks(copy);
            handleClose();
        } else {
            handleAlertClick();
        }
    }

    const goToResults = () => {
        handleChange({
            target: {
                name: 'results',
                value: true
            }
        })
    }

    const returnToResults = () => {
        handleChange({
            target: {
                name: 'results',
                value: false
            }
        })
    }

    const updateBeforeDelete = (list) => {
        handleOperationListChange(list);
        const copy = stocks;
        copy.stocks = [];

        list.forEach(function(operation) {
            copy.addOperationByStockId(operation);
        })

        setStocks(copy);
        handleDateChange(new Date());
    }

    const handleOperationListChange = (value) => {
        handleChange({ 
            target: {
                name: 'operationList',
                value: value
            }
        });
    }

    const handleAlertClick = () => {
        setAlert(true);
      };
    
      const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert(false);
      };

    const handleDateChange = (value) => {
        handleChange({ 
            target: {
                name: 'date',
                value: value
            }
        });
    }


    const handleClickOpen = () => {
        handleChange({ 
            target: {
                name: 'open',
                value: true
            }
        });
    };
    
    const handleClose = () => {
        handleChange({ 
            target: {
                name: 'open',
                value: false
            }
        });
    };

    const headerStyle = {
        fontSize: '0.7rem',
        padding: '1rem',
        fontFamily: 'Karla'
    }

    const cellStyle = {
        padding: '1rem',
        fontFamily: 'Karla'
    }

    if (!values.results) {
        return (
            <Layout>
                <div style={styles.descriptionText}>
                    O IRCalc realiza o cálculo das suas operações na Bolsa dividas por mês e por ação.
                    Adicione as operações na bolsa clicando no botão <b>ADICIONAR OPERAÇÃO</b>.
                    Preencha os dados com cuidado, revise e por fim, aperte em <b>CALCULAR IMPOSTO DE RENDA</b>.
                </div>
                
                <div style={styles.addOperation.box}>      
                    <Button style={styles.addOperation.button} size="large" variant="outlined" onClick={handleClickOpen}>
                        Adicionar Operação
                    </Button>
                </div>
    
                <div style={styles.table.box}>
                    <MaterialTable
                        icons={TableIcons}
                        columns={[
                            { title: 'Nome da ação', headerStyle: headerStyle, cellStyle: cellStyle, field: 'stockId' },
                            { title: 'Tipo de operação', headerStyle: headerStyle, cellStyle: cellStyle, field: 'type', lookup: { BUY: 'Compra', SELL: 'Venda' } },
                            { title: 'Data da operação', headerStyle: headerStyle, cellStyle: cellStyle, field: 'date', type: 'date' },
                            { title: 'Preço unitário', headerStyle: headerStyle, cellStyle: cellStyle, field: 'price'},
                            { title: 'Quantidade de papéis', headerStyle: headerStyle, cellStyle: cellStyle, field: 'quantity'},
                            { title: 'Taxa de corretagem', headerStyle: headerStyle, cellStyle: cellStyle, field: 'tax'}
                        ]}
                        data={values.operationList}
                        editable={{
                            onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                {
                                    let data = values.operationList;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    updateBeforeDelete(data, () => resolve());
                                }
                                resolve()
                                }, 1000)
                            }),
                        }}
                        title="Lista de operações"
                        localization={Localization}
                        option={styles.table.options}
                    />
                </div>
                
                <div style={styles.calculateIR.box}>
                    <Button style={styles.calculateIR.button} size="large" variant="outlined" onClick={goToResults}>
                        Calcular Imposto de Renda
                    </Button>
                </div>

                <Card style={styles.card.box} variant="outlined">
                    <CardContent style={styles.card.content}>
                        Dicas para adicionar operações:
                        <ul>
                            <li>Aplique ponto (.) como separador decimal;</li>
                            <li>Caso queira deletar a operação adicionada, aperte no botão com o ícone de lixeira;</li>
                            <li>Por padrão, ficarão em exibição as cinco (5) PRIMEIRAS adições de operação. Caso queira ver mais que cinco (5), aperte em "5 linhas" e escolha a quantidade de sua preferência;</li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Dialog open={values.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Adicionar Operação</DialogTitle>
                    <DialogContent style={styles.dialog.box}>
                        <TextField
                            fullWidth
                            required
                            id="stockId"
                            name="stockId"
                            label="Nome da ação. Ex: PETR4, VALE5"
                            type="text"
                            value={values.stockId}
                            onChange={handleChange}
                        />
                        <FormControl style={styles.dialog.selectType} fullWidth required>
                            <InputLabel id="operation-type">Tipo de operação</InputLabel>
                            <Select
                                fullWidth
                                name="type"
                                labelId="operation-type"
                                value={values.type}
                                onChange={handleChange}
                            >
                                <MenuItem value={`BUY`}>Compra</MenuItem>
                                <MenuItem value={`SELL`}>Venda</MenuItem>
                            </Select>
                        </FormControl>
    
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={styles.dialog.date}
                                required
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                label="Data da operação"
                                helperText=""
                                name="date"
                                value={values.date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <TextField
                            fullWidth
                            required
                            label="Preço da operação"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
    
                        <TextField
                            style={styles.dialog.quantity}
                            fullWidth
                            required
                            label="Quantidade"
                            name="quantity"
                            type="number"
                            value={values.quantity}
                            onChange={handleChange}
                        />
    
                        <TextField
                            style={styles.dialog.tax}
                            fullWidth
                            required
                            label="Taxa de corretagem"
                            name="tax"
                            value={values.tax}
                            onChange={handleChange}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                    </DialogContent>
    
                    <DialogActions style={styles.dialog.actions}>
                        <Button onClick={handleClose} color="primary">Voltar</Button>
                        <Button onClick={addOperation} color="primary">Adicionar</Button>
                    </DialogActions>
                </Dialog>

                <Snackbar 
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="error">
                        Erro no formulário! Todos os campos devem ser preenchidos e nenhum pode ser zero.
                    </Alert>
                </Snackbar>
            </Layout>
        )
    }
    return (
        <Layout>
            <IconButton onClick={returnToResults}>
                <ArrowBackIcon />
            </IconButton>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <h1>Visão Geral das Operações</h1>
            </div>
            
            <Results listStocks={stocks}/>
        </Layout>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="R$"
      />
    );
  }

const styles = {
    descriptionText: {
        fontFamily: `Rubik`,
        fontSize: `0.92rem`,
        textAlign: `justify`,
        textJustify: `inter-word`
    },
    addOperation: {
        box: { 
            display: `flex`,
            flexDirection: `row-reverse`,
            marginTop: `0.9rem`,
        },
        button: {
            fontFamily: `Rubik`
        }
    },
    table: {
        box: {
            marginTop: '1rem'
        },
        options: {
            headerStyle: {
                fontSize: '0.7rem',
                padding: '1rem',
                fontFamily: 'Karla'
            },
            rowStyle: {
                padding: '1rem',
                fontFamily: 'Karla'
            }
        }
    },
    calculateIR: {
        box: { 
            display: `flex`,
            flexDirection: `row-reverse`,
            marginTop: `0.9rem`,
            width: '100%'
        },
        button: {
            fontFamily: `Rubik`
        }
    },
    card: {
        box: {
            marginTop: '1rem'
        },
        content: {
            fontFamily: 'Rubik',
            fontSize: '0.7rem',
            paddingBottom: 0
        }
    },
    dialog: {
        box: {
            padding: '0px 24px'
        },
        selectType: { 
            marginTop: '0.5rem'
        },
        date: {
            width: `100%`
        },
        quantity: {
            marginTop: `0.5rem`
        },
        tax: {
            marginTop: `0.5rem`
        },
        actions: {
            padding: '24px 8px'
        }
    }
}