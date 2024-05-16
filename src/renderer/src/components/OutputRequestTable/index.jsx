import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateData } from "../../store/reducers/requests"
import ModalConfirmAction from "../ModalConfirmAction"

export default function OutputRequestTable({ data }) {

    const requests = useSelector(state => state.requests)
    const dispatch = useDispatch()

    const [requestsToOutput, setRequestsToOutput] = useState([])
    const [exitButtonDisabled, setExitButtonDisabled] = useState(true)
    const [openModalConfirmExit, setOpenModalConfirmExit] = useState(false)

    const handleOpenModalConfirmExit = () => {
        setOpenModalConfirmExit(true)
    }

    const checksIfTheRequestIsSelected = (request) => {
        let checkValue = false

        requestsToOutput.forEach(item => {
            item.id === request.id ? checkValue = true : ''
        })

        return checkValue
    }

    const updateRequestsToOutput = (request) => {

        let alreadyExists = false

        requestsToOutput.forEach(item => {
            item.batteryCode === request.batteryCode ? alreadyExists = true : ''
        })

        alreadyExists ? setRequestsToOutput(requestsToOutput.filter(item => item.batteryCode !== request.batteryCode)) : setRequestsToOutput([...requestsToOutput, request])
    }

    const makeExits = () => {

        const requestsClone = requests.map(request => ({ ...request }))
        const todayDate = new Date().toLocaleDateString('pt-BR')

        requestsClone.forEach(requestClone => {
            requestsToOutput.forEach(requestToOutput => {
                if (requestClone.batteryCode === requestToOutput.batteryCode) {
                    requestClone.status = 'FINALIZADA'
                    requestClone.outputDate = todayDate
                }
                //caso a requisição finalizada tenha como empréstimo uma bateria de outra requisição, esta retorna para seus status de 'PENDENTE'
                if (requestClone.batteryCode === requestToOutput.loanBatteryCode) {
                    requestClone.status = 'PENDENTE'
                }
            })
        })

        dispatch(updateData(requestsClone))
        window.bridgeRequests.saveDataRequests(requestsClone)

        setRequestsToOutput([])

        setOpenModalConfirmExit(false)
    }

    useEffect(() => {
        requestsToOutput.length > 0 ? setExitButtonDisabled(false) : setExitButtonDisabled(true)
    }, [requestsToOutput])

    return (
        <>
            <TableContainer component={Paper} sx={{ backgroundColor: '#FFF' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nº requisição</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Bateria</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell>Bateria emprestada</TableCell>
                            <TableCell>Código bateria emprestada</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Realizar saída</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(request => {
                            if (request.status === 'PENDENTE') {
                                return (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.request}</TableCell>
                                        <TableCell>{request.clientName}</TableCell>
                                        <TableCell>{request.batteryModel}</TableCell>
                                        <TableCell>{request.batteryCode}</TableCell>
                                        <TableCell>{request.loanBatteryModel}</TableCell>
                                        <TableCell>{request.loanBatteryCode}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                        <TableCell align="center"><input checked={checksIfTheRequestIsSelected(request)} onChange={() => updateRequestsToOutput(request)} type="checkbox" /></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={exitButtonDisabled} onClick={handleOpenModalConfirmExit} color="success" sx={{ width: '200px' }} variant="contained">Realizar saídas</Button>
            {openModalConfirmExit &&
                <ModalConfirmAction
                    alertDialogTitle="Confime as requisições para realizar a saída"
                    alertDialogDescription={requestsToOutput.map(item => <li key={item.id}>{item.request}</li>)}
                    onClickConfirm={makeExits}
                    onClickCancel={() => setOpenModalConfirmExit(false)}
                />
            }
        </>
    )
}