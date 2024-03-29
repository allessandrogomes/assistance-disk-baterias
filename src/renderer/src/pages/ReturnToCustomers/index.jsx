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
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useEffect } from 'react';
import { updateData } from '../../store/reducers/requests';

export default function ReturnToCustomers() {

    const requests = useSelector(state => state.requests)

    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Retorno aos clientes</Typography>
            <TableContainer sx={{ width: "95vw" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>N° Requisição</TableCell>
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
                        {requests.map((request) => request.daysOfDelay > 0 ? <TableRow key={request.batteryCode}>
                            <TableCell>{request.request}</TableCell>
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
