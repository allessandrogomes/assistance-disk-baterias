import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, FormControl, Typography } from '@mui/material';
import { useState } from 'react';
import { addNewData } from '../../store/reducers/requests';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

export default function FieldAddNewData({ requestRegisteredSuccessfully }) {

    const requests = useSelector(state => state.requests)

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        request: '',
        clientName: '',
        cpf: '',
        phoneNumber: '',
        entryDate: '',
        returnDate: '',
        batteryModel: '',
        batteryCode: '',
        loanBatteryModel: '',
        loanBatteryCode: '',
        deadlineDays: 0,
        numberOfDaysPassed: 0,
        daysOfDelay: 0,
        numberOfTimesReturned: 0,
        status: 'PENDENTE'
    })

    const formatsForNumbersOnly = (value) => {
        const valueWithJustNumbers = value.replace(/[^\d]+/g, "")
        return valueWithJustNumbers
    }

    const formatsForLettersOnly = (value) => {
        const valueWithJustLetters = value.replace(/[^\p{L}\s]+/gu, "")
        return valueWithJustLetters
    }


    const updateFormData = (event) => {

        let { name, value } = event.target

        const numericFields = ["id", "cpf", "phoneNumber"]

        numericFields.includes(name) ? value = formatsForNumbersOnly(value) : name.includes("clientName") ? value = formatsForLettersOnly(value) : ''

        setFormData({
            ...formData,
            [name]: value.toUpperCase()
        })
    }

    const setsTheDeadlineDays = (entryDate, returnDate) => {
        const entryDateInDateFormat = new Date(entryDate)
        const returnDateInDateFormat = new Date(returnDate)

        const differenceInMilliseconds = Math.abs(returnDateInDateFormat - entryDateInDateFormat)

        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24))

        return differenceInDays
    }

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');

        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        return format(date, 'dd/MM/yyyy');
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const formattedFormData = {
            ...formData,
            entryDate: formatDate(formData.entryDate),
            returnDate: formatDate(formData.returnDate),
            deadlineDays: setsTheDeadlineDays(formData.entryDate, formData.returnDate)
        };

        if (requests.some(item => item.batteryCode === formData.batteryCode)) {
            requestRegisteredSuccessfully(false)
        } else {
            requestRegisteredSuccessfully(true)
            dispatch(addNewData(formattedFormData))
        }
    }

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10)

    return (
        <form onSubmit={handleSubmit}>
            <Typography component="h2" variant="h6" textAlign="center">Adicionar nova requisição</Typography>
            <FormControl sx={{ borderRadius: '10px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', bgcolor: '#EEEEEE', p: '20px 0', width: '500px' }}>
                    <TextField
                        onChange={updateFormData}
                        inputProps={{ maxLength: 4 }}
                        id="request"
                        name="request"
                        size="small"
                        label="N° REQUISIÇÃO"
                        value={formData.request}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        id="clientName"
                        name="clientName"
                        size="small"
                        label="Nome do cliente"
                        value={formData.clientName}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        inputProps={{ maxLength: 11 }}
                        id="cpf"
                        name="cpf"
                        size="small"
                        label="CPF"
                        value={formData.cpf}
                        variant="filled"
                    />
                    <TextField
                        onChange={updateFormData}
                        inputProps={{ maxLength: 11 }}
                        id="phoneNumber"
                        name="phoneNumber"
                        size="small"
                        label="Telefone"
                        value={formData.phoneNumber}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        inputProps={{ max: maxDate.toISOString().split("T")[0] }}
                        sx={{ width: '206px' }}
                        id="entryDate"
                        name="entryDate"
                        type="date"
                        size="small"
                        label="Data de entrada"
                        value={formData.entryDate}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        inputProps={{ max: maxDate.toISOString().split("T")[0] }}
                        sx={{ width: '206px' }}
                        id="returnDate"
                        name="returnDate"
                        type="date"
                        size="small"
                        label="Data de retorno"
                        value={formData.returnDate}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        id="batteryModel"
                        name="batteryModel"
                        size="small"
                        label="Modelo da bateria"
                        value={formData.batteryModel}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        id="batteryCode"
                        name="batteryCode"
                        size="small"
                        label="Código da bateria"
                        value={formData.batteryCode}
                        variant="filled"
                        required
                    />
                    <TextField
                        onChange={updateFormData}
                        id="loanBatteryModel"
                        name="loanBatteryModel"
                        size="small"
                        label="Modelo bateria empréstimo"
                        value={formData.loanBatteryModel}
                        variant="filled"
                    />
                    <TextField
                        onChange={updateFormData}
                        id="loanBatteryCode"
                        name="loanBatteryCode"
                        size="small"
                        label="Código bateria empréstimo"
                        value={formData.loanBatteryCode}
                        variant="filled"
                    />
                    <Button type='submit' variant="contained">Adicionar</Button>
            </FormControl>
        </form>

    )
}