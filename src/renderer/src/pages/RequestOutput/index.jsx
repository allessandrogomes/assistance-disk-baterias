import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../store/reducers/requests";


export default function RequestOutput() {

    const requests = useSelector(state => state.requests)
    const dispatch = useDispatch()

    const [requestsToOutput, setRequestsToOutput] = useState([])

    const updateRequestsToOutput = (request) => {

        let alreadyExists = false

        requestsToOutput.forEach(item => {
            item.batteryCode === request.batteryCode ? alreadyExists = true : ''
        })

        alreadyExists ? setRequestsToOutput(requestsToOutput.filter(item => item.batteryCode !== request.batteryCode)) : setRequestsToOutput([...requestsToOutput, request])
    }

    const makeExits = () => {

        const requestsClone = requests.map(request => ({ ...request }))

        requestsClone.forEach(requestClone => {
            requestsToOutput.forEach(requestToOutput => {
                if (requestClone.batteryCode === requestToOutput.batteryCode) {
                    requestClone.status = 'FINALIZADA'
                    requestClone.loanBatteryModel = ''
                    requestClone.loanBatteryCode = ''
                    requestClone.loanedRouteBatteryRequestNumber = ''
                    requestClone.itHasALoanerBattery = false
                }
                if (requestClone.batteryCode === requestToOutput.loanBatteryCode) {
                    requestClone.status = 'PENDENTE'
                }
            })
        })

        dispatch(updateData(requestsClone))

        setRequestsToOutput([])
    }

    return (
        <Box sx={{ minHeight: '45vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
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
                        {requests.map(request => {
                            if (request.status === 'PENDENTE') {
                                return (
                                    <TableRow key={request.batteryCode}>
                                        <TableCell>{request.request}</TableCell>
                                        <TableCell>{request.clientName}</TableCell>
                                        <TableCell>{request.batteryModel}</TableCell>
                                        <TableCell>{request.batteryCode}</TableCell>
                                        <TableCell>{request.loanBatteryModel}</TableCell>
                                        <TableCell>{request.loanBatteryCode}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                        <TableCell align="center"><input onChange={() => updateRequestsToOutput(request)} type="checkbox" /></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={makeExits} color="success" sx={{ width: '200px' }} variant="contained">Realizar saídas</Button>
        </Box>
    )
}