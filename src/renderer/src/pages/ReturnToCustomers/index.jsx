import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../store/reducers/requests';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function ReturnToCustomers() {

    const requests = useSelector(state => state.requests)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateTable = () => {
        const updatedRequests = requests.map(request => ({ ...request }))

        updatedRequests.forEach(request => {
            request.numberOfDaysPassed = definesNumberOfDaysPassed(request.entryDate)
            request.daysOfDelay = request.numberOfDaysPassed - request.deadlineDays
        })

        dispatch(updateData(updatedRequests))
    }

    const definesNumberOfDaysPassed = (entryDate) => {
        const todayDate = new Date()

        const [day, month, year] = entryDate.split('/')
        const entryDateInDateFormat = new Date(year, month - 1, day, 0, 0, 0)

        const differenceInMilliseconds = Math.abs(todayDate - entryDateInDateFormat)

        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24))

        return differenceInDays - 1
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Button onClick={() => navigate('/')}>Tela Inicial</Button>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Retorno aos clientes</Typography>
            <Button onClick={updateTable}>Atualizar<RefreshIcon /></Button>
            <TableContainer sx={{ width: "95vw" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Data entrada</TableCell>
                            <TableCell>Data retorno</TableCell>
                            <TableCell>Bateria</TableCell>
                            <TableCell>Código da bateria</TableCell>
                            <TableCell>Bateria de empréstimo</TableCell>
                            <TableCell>Código bateria de empréstimo</TableCell>
                            <TableCell>Dias de atraso</TableCell>
                            <TableCell>Número de retornos</TableCell>
                            <TableCell>Contatar</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => request.daysOfDelay > 0 ? <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>{request.clientName}</TableCell>
                            <TableCell>{request.phoneNumber}</TableCell>
                            <TableCell>{request.entryDate}</TableCell>
                            <TableCell>{request.returnDate}</TableCell>
                            <TableCell>{request.batteryModel}</TableCell>
                            <TableCell>{request.batteryCode}</TableCell>
                            <TableCell>{request.loanBatteryModel}</TableCell>
                            <TableCell>{request.loanBatteryCode}</TableCell>
                            <TableCell>{request.daysOfDelay}</TableCell>
                            <TableCell>{request.numberOfTimesReturned}</TableCell>
                            <TableCell><Button><WhatsAppIcon /></Button></TableCell>
                            <TableCell>{request.status}</TableCell>
                        </TableRow> : '')}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
