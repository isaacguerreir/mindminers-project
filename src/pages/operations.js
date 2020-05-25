import React, { useState, forwardRef } from "react"
import MaterialTable from 'material-table'
import Layout from "../components/layout";
import Results from "../components/results";
import Operation from "../domain/Operation";
import ListStocks from "../domain/ListStocks";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
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
        listStocks: new ListStocks(),
        open: false,
        results: false
    })

    const [errors, setErrors] = useState({
        stockId: false,
        date: false,
        type: false,
        price: false,
        quantity: false,
        tax: false
    })

    const errorChange = (update) => {
        setErrors(update);
    }

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
            inputOp.price === "0" |
            inputOp.quantity === "0" |
            inputOp.tax === "0") {
            return false;
        }
        return true; 
    }

    const validateForm = (inputOp) => {
        const updateErrors = errors;
        const params = ['stockId', 'type', 'price', 'quantity', 'tax', 'date'];
        
        if (inputOp[params[0]] === "") {
            updateErrors[params[0]] = true;
        }
        if (inputOp[params[1]] === "") {
            updateErrors[params[1]] = true;
        }
        if (inputOp[params[2]] === 0) {
            updateErrors[params[2]] = true;
        }
        if (inputOp[params[3]] === 0) {
            updateErrors[params[3]] = true;
        }
        if (inputOp[params[4]] === 0) {
            updateErrors[params[4]] = true;
        }
        if (inputOp[params[5]] === "Invalid Date") {
            updateErrors[params[5]] = true;
        }
        
        errorChange(updateErrors);
    }

    const addOperation = () => {
        const inputOp = {
            date: values.date,
            stockId: values.stockId,
            type: values.type,
            price: parseFloat(values.price),
            quantity: parseFloat(values.quantity),
            tax: parseFloat(values.tax)
        }

        if (isValid(inputOp)) {
            const operation = new Operation(
                inputOp.date,
                inputOp.stockId,
                inputOp.type,
                inputOp.price,
                inputOp.quantity,
                inputOp.tax
            );

            let operationListUpdated = values.operationList;
            operationListUpdated.push(operation);
            
            handleOperationListChange(operationListUpdated);
            handleListStockChange(values.listStocks.addOperationByStockId(operation));
            cleanForms();
            handleClose();
        } else {
            validateForm(inputOp);
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

    const cleanForms = () => {
        handleChange({ 
            target: {
                name: 'stockList',
                value: ''
            }
        });
        handleChange({ 
            target: {
                name: 'date',
                value: new Date()
            }
        });
        handleChange({ 
            target: {
                name: 'type',
                value: 'BUY'
            }
        });
        handleChange({ 
            target: {
                name: 'price',
                value: '0'
            }
        });
        handleChange({ 
            target: {
                name: 'quantity',
                value: '0'
            }
        });
        handleChange({ 
            target: {
                name: 'tax',
                value: '0'
            }
        });
    }

    const handleOperationListChange = (value) => {
        handleChange({ 
            target: {
                name: 'operationList',
                value: value
            }
        });
    }

    const handleListStockChange = (value) => {
        handleChange({ 
            target: {
                name: 'listStock',
                value: value
            }
        });
    }

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
    if (!values.results) {
        return (
            <Layout>
                <div style={{
                    fontFamily: `Rubik`,
                    fontSize: `0.92rem`,
                    textAlign: `justify`,
                    textJustify: `inter-word`
                }}>
                    O IRCalc realiza o calculo das suas operações na bolsa dividas por mês e por ação.
                    Adicione as operações na bolsa clicando no botão <b>Adicionar Operação</b>.
                    Para calcular o Imposto de Renda das operações adicionadas clique no botão <b>Calcular Imposto de Renda</b> no final da lista.
                </div>
                
                <div style={{ 
                    display: `flex`,
                    flexDirection: `row-reverse`,
                    marginTop: `0.9rem`,
                }}>
                    
                    <Button style={{
                        fontFamily: `Rubik`
                    }}
                    size="large"
                    variant="outlined"
                    onClick={handleClickOpen}>
                        Adicionar Operação
                    </Button>
                </div>
    
                <div style={{
                    marginTop: '1rem'
                }}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                            { title: 'Nome da ação', field: 'stockId' },
                            { title: 'Tipo de operação', field: 'type', lookup: { BUY: 'Compra', SELL: 'Venda' } },
                            { title: 'Data da operação', field: 'date', type: 'date' },
                            { title: 'Preço unitário', field: 'price'},
                            { title: 'Quantidade de papéis', field: 'quantity'},
                            { title: 'Taxa de corretagem', field: 'tax'}
                        ]}
                        data={values.operationList}
                        title="Lista de operações"
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                {
                                    const data = values.operationList;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    handleOperationListChange(data, () => resolve());
                                    handleDateChange(new Date());
                                }
                                resolve()
                                }, 1000)
                            }),
                            onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                {
                                    let data = values.operationList;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    handleOperationListChange(data, () => resolve());
                                    handleDateChange(new Date());
                                }
                                resolve()
                                }, 1000)
                            }),
                        }}
                        localization={{
                            body: {
                                editTooltip: 'Editar',
                                deleteTooltip: 'Deletar'
                            },
                            header: {
                                actions: '          '
                            },
                            toolbar: {
                                searchTooltip: 'Busca',
                                searchPlaceholder: 'Busca'
                            },
                            pagination: {
                                labelDisplayedRows: '{from}-{to} de {count}',
                                labelRowsSelect: 'linhas',
                                labelRowsPerPage: 'Linhas por página',
                                firstAriaLabel: 'Primeira página',
                                firstTooltip: 'Primeira página',
                                previousAriaLabel: 'Página anterior',
                                previousTooltip: 'Página anterior',
                                nextAriaLabel: 'Próxima página',
                                nextTooltip: 'Próxima página',
                                lastAriaLabel: 'Última página',
                                lastTooltip: 'Última página'
                            },
                        }}
                        option={{
                            headerStyle: {
                                fontSize: '0.7rem',
                                padding: '1rem',
                                fontFamily: 'Karla'
                            },
                            rowStyle: {
                                padding: '1rem',
                                fontFamily: 'Karla'
                            }
                        }}
                    />
                </div>
                
                <div style={{ 
                    display: `flex`,
                    flexDirection: `row-reverse`,
                    marginTop: `0.9rem`,
                    width: '100%'
                }}>
                    
                    <Button 
                        style={{
                            fontFamily: `Rubik`
                        }}
                        size="large"
                        variant="outlined"
                        onClick={goToResults}
                    >
                        Calcular Imposto de Renda
                    </Button>
                    
                </div>
                
                <Dialog
                    open={values.open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Adicionar Operação</DialogTitle>
                    
                    <DialogContent style={{
                        padding: '0px 24px'
                    }}>
                    
                    <TextField
                        fullWidth
                        required
                        id="stockId"
                        name="stockId"
                        label="Nome da ação. Ex: PETR4, VALE5"
                        type="text"
                        value={values.stockId}
                        onChange={handleChange}
                        error={errors.stockId}
                    />
                    <FormControl style={{ marginTop: '0.5rem' }} error={errors.type} fullWidth required>
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
                            style={{
                                width: `100%`
                            }}
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
                        error={errors.price}
                    />
    
                    <TextField
                        style={{
                            marginTop: `0.5rem`
                        }}
                        fullWidth
                        required
                        label="Quantidade"
                        name="quantity"
                        type="number"
                        value={values.quantity}
                        onChange={handleChange}
                        error={errors.quantity}
                    />
    
                    <TextField
                        style={{
                            marginTop: `0.5rem`
                        }}
                        fullWidth
                        required
                        label="Taxa de corretagem"
                        name="tax"
                        value={values.tax}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        error={errors.tax}
                    />
                    </DialogContent>
    
                    <DialogActions style={{
                        padding: '24px 8px'
                    }}>
                        <Button onClick={handleClose} color="primary">
                            Voltar
                        </Button>
                        <Button onClick={addOperation} color="primary">
                            Adicionar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Layout>
        )
    }
    return (
        <Layout>
            <IconButton onClick={returnToResults}>
                <ArrowBackIcon />
            </IconButton>
            <Results listStocks={values.listStocks}/>
        </Layout>
    )
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

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };