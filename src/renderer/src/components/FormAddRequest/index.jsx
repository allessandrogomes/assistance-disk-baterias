import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup';
import { updateData } from '../../store/reducers/requests';
import { setsTheDeadlineDays } from '../../utils/setsTheDeadlineDays';
import Form from '../Form';

export default function FormAddRequest({ requestRegisteredSuccessfully }) {

    const requests = useSelector(state => state.requests)

    const dispatch = useDispatch()

    const checksForDuplicationOfRequest = (request) => {
        const duplicateRequest = requests.some(item => item.batteryCode === request.batteryCode && item.status !== 'FINALIZADA')
        return duplicateRequest
    }

    const handleSubmit = (values) => {
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

    const initialValues = {
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

    const formFields = [
        {
            name: "request",
            title: "Nº requisição",
            type: "text"
        },
        {
            name: "clientName",
            title: "Nome cliente",
            type: "text"
        },
        {
            name: "cpf",
            title: "CPF",
            type: "text",
            inputProps: { maxLength: 11 }
        },
        {
            name: "phoneNumber",
            title: "Telefone",
            type: "text",
            inputProps: { maxLength: 11 }
        },
        {
            name: "entryDate",
            title: "Data entrada",
            type: "text"
        },
        {
            name: "returnDate",
            title: "Data retorno",
            type: "text"
        },
        {
            name: "batteryModel",
            title: "Modelo bateria",
            type: "text"
        },
        {
            name: "batteryCode",
            title: "Código bateria",
            type: "text"
        },
        {
            name: "loanBatteryModel",
            title: "Bateria empréstimo",
            type: "text"
        },
        {
            name: "loanBatteryCode",
            title: "Código empréstimo",
            type: "text"
        }

    ]

    const formStyle = {
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "start",
        gap: "10px",
        bgcolor: "#FBB900",
        p: "20px",
        width: "422px",
        position: "relative"
    }

    return (
        <Form
            initialValues={initialValues}
            schema={schema}
            formTitle="Adicionar nova requisição"
            formFields={formFields}
            formStyle={formStyle}
            formData={(values) => handleSubmit(values)}
        />
    )
}