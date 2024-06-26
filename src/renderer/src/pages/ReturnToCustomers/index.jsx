import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { updateData } from '../../store/reducers/requests';

export default function ReturnToCustomers() {

    const requests = useSelector(state => state.requests)

    const todayDate = new Date().toLocaleDateString('pt-BR')

    const dispatch = useDispatch()

    const sendMessageToCustomer = (request) => {

        const defaultMessage = `Olá ${request.clientName}, a Assistência Técnica Disk Baterias informa que o seu diagnóstico já está pronto para retirada, solicitamos que o(a) senhor(a) retorne à nossa loja para finalização do processo de assistência, estamos no aguardo. Lembre-se, outros consumidores também precisarão de uma bateria de empréstimo para realização do processo. Agradecemos a compreensão. *Caso o atraso ultrapasse os 30 dias, será realizada a permuta (troca) entre as baterias, ou seja, a Disk Baterias será proprietária da bateria deixada, e a bateria emprestada será de propriedade do cliente*.`
        const messageWithoutLoanBattery = `Olá ${request.clientName}, a Assistência Técnica Disk Baterias informa que o seu diagnóstico já está pronto para retirada, solicitamos que o(a) senhor(a) retorne à loja para finalização do processo de assistência, estamos no aguardo.`
        let message = defaultMessage

        request.loanBatteryCode.length === 0 ? message = messageWithoutLoanBattery : ''

        let requestsClone = requests.map(request => ({ ...request }))

        requestsClone.forEach(item => {
            if (item.id === request.id) {
                item.numberOfTimesReturned += 1
                item.lastReturnDate = todayDate
            }
        })

        window.open(`https://api.whatsapp.com/send?phone=55${request.phoneNumber}&text=${message}`, '_blank')

        dispatch(updateData(requestsClone))
        window.bridgeRequests.saveDataRequests(requestsClone)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Retorno aos clientes</Typography>
            <TableContainer sx={{ width: "95vw", backgroundColor: "#FBB900" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N° Requisição</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Bateria</TableCell>
                            <TableCell>Código bateria</TableCell>
                            <TableCell>Bateria empréstimo</TableCell>
                            <TableCell>Código empréstimo</TableCell>
                            <TableCell>Dias de atraso</TableCell>
                            <TableCell>Número de retornos</TableCell>
                            <TableCell>Último retorno</TableCell>
                            <TableCell>Contatar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => request.daysOfDelay > 0 && request.status === 'PENDENTE' ? <TableRow key={request.batteryCode}>
                            <TableCell>{request.request}</TableCell>
                            <TableCell>{request.clientName}</TableCell>
                            <TableCell>{request.batteryModel}</TableCell>
                            <TableCell>{request.batteryCode}</TableCell>
                            <TableCell>{request.loanBatteryModel}</TableCell>
                            <TableCell>{request.loanBatteryCode}</TableCell>
                            <TableCell>{request.daysOfDelay}</TableCell>
                            <TableCell>{request.numberOfTimesReturned}</TableCell>
                            <TableCell>{request.lastReturnDate}</TableCell>
                            <TableCell><Button sx={{ backgroundColor: "#FFF", '&:hover': { backgroundColor: "#000" } }} onClick={() => sendMessageToCustomer(request)}><WhatsAppIcon sx={{ color: '#25D366' }}/></Button></TableCell>
                        </TableRow> : '')}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
