import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function TableOfSuggestionLoanBatteries() {

    const requests = useSelector(state => state.requests)

    const [loanBatteriesSuggestion, setLoanBatteriesSuggestion] = useState([])

    useEffect(() => {
        setLoanBatteriesSuggestion(requests.filter(request => request.daysOfDelay > 7 && request.status === 'PENDENTE' && request.itHasALoanerBattery))
    }, [])

    return (
        <>
            <Typography variant="h5">Sugestão de baterias atrasadas para empréstimo</Typography>
            <TableContainer sx={{ backgroundColor: "#FBB900" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo da Bateria</TableCell>
                            <TableCell>Código da bateria</TableCell>
                            <TableCell>Dias de atraso</TableCell>
                            <TableCell>N° Requisição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanBatteriesSuggestion.map(request => (
                            <TableRow key={request.batteryCode}>
                                <TableCell>{request.batteryModel}</TableCell>
                                <TableCell>{request.batteryCode}</TableCell>
                                <TableCell>{request.daysOfDelay}</TableCell>
                                <TableCell>{request.request}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}