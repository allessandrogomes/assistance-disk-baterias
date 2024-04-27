import { Box, Button, FormControl, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextFieldForm from '../TextFieldForm';
import { updateData } from '../../store/reducers/requests';
import { setsTheDeadlineDays } from '../../utils/setsTheDeadlineDays';

export default function FormAddRequest({ requestRegisteredSuccessfully }) {

    const requests = useSelector(state => state.requests)

    const dispatch = useDispatch()

    const [borrowedRouteBattery, setBorrowedRouteBattery] = useState(false)

    const checksForDuplicationOfRequest = (request) => {
        const duplicateRequest = requests.some(item => item.batteryCode === request.batteryCode && item.status !== 'FINALIZADA')
        return duplicateRequest
    }

    const handleSubmit = async (values) => {
        let requestsClone = requests.map(request => ({ ...request }))

        const formattedFormData = {
            ...values,
            id: uuidv4(),
            clientName: values.clientName.toUpperCase(),
            batteryModel: values.batteryModel.toUpperCase(),
            batteryCode: values.batteryCode.toUpperCase(),
            loanBatteryModel: values.loanBatteryModel.toUpperCase(),
            loanBatteryCode: values.loanBatteryCode.toUpperCase(),
            request: parseInt(values.request, 10),
            deadlineDays: setsTheDeadlineDays(values.entryDate, values.returnDate)
        }

        //Verificar se o código da bateria que está adicionando já existe como pendente nas requisições

        if (checksForDuplicationOfRequest(formattedFormData)) {
            requestRegisteredSuccessfully(false)
        } else {
            //verifica se a bateria que foi emprestada é de requisição, e caso seja, altera o status para emprestada
            const aBatteryWasBorrowed = formattedFormData.loanBatteryCode.length > 0 ? true : false

            if (aBatteryWasBorrowed) {
                formattedFormData.itHasALoanerBattery = true

                const itIsAPendingRequestBattery = requestsClone.some(item => item.batteryCode === formattedFormData.loanBatteryCode && item.status === 'PENDENTE') ? true : false
                
                if (itIsAPendingRequestBattery) {
                    requestsClone.forEach(item => {
                        item.batteryCode === formattedFormData.loanBatteryCode ? item.status = 'EMPRESTADA' : ''
                    })
                }
            }
            requestRegisteredSuccessfully(true)
            requestsClone.push(formattedFormData)
            dispatch(updateData(requestsClone))
            window.bridgeRequests.saveDataRequests(requestsClone)
        }
    }


    const schema = Yup.object().shape({
        request: Yup.string().required('Campo obrigatório').matches(/^[0-9]+$/, 'Digite apenas números'),
        clientName: Yup.string().required('Campo obrigatório').matches(/^[A-Za-z]+(?: [A-Za-z]+)+$/, 'Digite um nome completo válido'),
        cpf: Yup.string().matches(/^\d{11}$/, 'CPF inválido'),
        phoneNumber: Yup.string().required('Campo obrigatório').matches(/^\d{11}$/, 'Número de telefone inválido'),
        entryDate: Yup.string().required('Campo obrigatório').matches(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, 'O formato deve ser dd/mm/aaaa'),
        returnDate: Yup.string().required('Campo obrigatório').matches(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, 'O formato deve ser dd/mm/aaaa'),
        batteryModel: Yup.string().required('Campo obrigatório'),
        batteryCode: Yup.string().required('Campo obrigatório').matches(/^\S+$/, 'Não é permitido espaços em branco'),
        loanBatteryModel: Yup.string(),
        loanBatteryCode: Yup.string().matches(/^\S+$/, 'Não é permitido espaços em branco'),
        loanedRouteBatteryRequestNumber: Yup.string().matches(/^[0-9]+$/, 'Digite apenas números')
    })

    const initialValuesForm = {
        id: 0,
        request: '',
        clientName: '',
        cpf: '',
        phoneNumber: '',
        entryDate: '',
        returnDate: '',
        outputDate: '',
        batteryModel: '',
        batteryCode: '',
        loanBatteryModel: '',
        loanBatteryCode: '',
        loanedRouteBatteryRequestNumber: '',
        deadlineDays: 0,
        numberOfDaysPassed: 0,
        daysOfDelay: 0,
        numberOfTimesReturned: 0,
        lastReturnDate: '',
        exchangeCanceled: false,
        status: 'PENDENTE',
        itHasALoanerBattery: false
    }

    return (
        <Formik
            initialValues={initialValuesForm}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    handleSubmit(values)
                    resetForm()
                    setSubmitting(false)
                }, 200)
            }}
        >

            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    <Typography component="h2" variant="h6" textAlign="center">Adicionar nova requisição</Typography>
                    <FormControl sx={{ borderRadius: '10px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', bgcolor: '#EEEEEE', p: '20px 0', width: '500px' }}>
                        <TextFieldForm
                            name="request"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Nº requisição"
                            type="text"
                            value={values.request}
                        />
                        <TextFieldForm
                            name="clientName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Nome cliente"
                            type="text"
                            value={values.clientName}
                        />
                        <TextFieldForm
                            inputProps={{maxLength: 11}}
                            name="cpf"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="CPF"
                            type="text"
                            value={values.cpf}
                        />
                        <TextFieldForm
                            inputProps={{maxLength: 11}}
                            name="phoneNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Telefone"
                            type="text"
                            value={values.phoneNumber}
                        />
                        <TextFieldForm
                            inputProps={{maxLength: 10}}
                            name="entryDate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            sx={{ width: '206px' }}
                            title="Data entrada"
                            type="text"
                            value={values.entryDate}
                        />
                        <TextFieldForm
                            inputProps={{maxLength: 10}}
                            name="returnDate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            sx={{ width: '206px' }}
                            title="Data retorno"
                            type="text"
                            value={values.returnDate}
                        />
                        <TextFieldForm
                            name="batteryModel"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Modelo bateria"
                            type="text"
                            value={values.batteryModel}
                        />
                        <TextFieldForm
                            name="batteryCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Código bateria"
                            type="text"
                            value={values.batteryCode}
                        />
                        <TextFieldForm
                            name="loanBatteryModel"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Bateria empréstimo"
                            type="text"
                            value={values.loanBatteryModel}
                        />
                        <TextFieldForm
                            name="loanBatteryCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            title="Código empréstimo"
                            type="text"
                            value={values.loanBatteryCode}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input onChange={() => setBorrowedRouteBattery(!borrowedRouteBattery)} type='checkbox' />
                            <Typography sx={{ color: '#000' }}>Bateria emprestada de rota</Typography>
                            {borrowedRouteBattery &&
                                <TextFieldForm
                                    name="loanedRouteBatteryRequestNumber"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    title="Nº requisição rota"
                                    type="text"
                                    value={values.loanedRouteBatteryRequestNumber}
                                />
                            }
                        </Box>
                        <Button disabled={isSubmitting} type='submit' variant="contained">Adicionar</Button>
                    </FormControl>
                </form>
            )}
        </Formik>
    )
}