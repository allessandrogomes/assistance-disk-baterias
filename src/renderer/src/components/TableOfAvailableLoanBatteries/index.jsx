import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function TableOfAvailableLoanBatteries() {

    const loanBatteries = useSelector(state => state.loanBatteries)

    const [loanBatteriesAvailable, setLoanBatteriesAvailable] = useState([])

    useEffect(() => {
        setLoanBatteriesAvailable(loanBatteries.filter(item => item.batteryIsAvailable))
    }, [loanBatteries])

    return (
        <>
            <Typography variant="h5">Baterias disponíveis</Typography>
            <TableContainer sx={{ backgroundColor: "#FBB900" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo bateria</TableCell>
                            <TableCell>Código bateria</TableCell>
                            <TableCell>Origem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanBatteriesAvailable.map(battery => (
                            <TableRow key={battery.batteryCode}>
                                <TableCell>{battery.batteryModel}</TableCell>
                                <TableCell>{battery.batteryCode}</TableCell>
                                <TableCell>{battery.origin}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}