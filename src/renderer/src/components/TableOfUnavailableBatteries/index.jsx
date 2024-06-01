import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function TableOfUnavailableBatteries() {

    const requests = useSelector(state => state.requests)
    const loanBatteries = useSelector(state => state.loanBatteries)

    const [unavailableBatteries, setUnavailableBatteries] = useState([])

    function createBatteryObject(item, isRequest = false) {
        return {
            batteryModel: item.batteryModel,
            batteryCode: item.batteryCode,
            origin: isRequest ? 'REQUISIÇÃO' : item.origin,
            daysOfDelay: isRequest ? item.daysOfDelay : "",
            request: isRequest ? item.request : ""
        }
    }

    useEffect(() => {

        let batteries = []

        const filteredLoanBatteries = loanBatteries.filter(item => !item.batteryIsAvailable)
        const filteredRequests = requests.filter(item => item.status === 'EMPRESTADA' || item.loanedRouteBatteryRequestNumber.length)

        filteredLoanBatteries.forEach(item => {
            let objectModel = createBatteryObject(item)
            batteries.push(objectModel)
        })
        
        filteredRequests.forEach(item => {
            let objectModel = createBatteryObject(item, true)
            batteries.push(objectModel)
        })

        setUnavailableBatteries(batteries)
    }, [])

    return (
        <>
            <Typography variant="h5">Baterias emprestadas</Typography>
            <TableContainer sx={{ backgroundColor: "#FBB900" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo da Bateria</TableCell>
                            <TableCell>Código da bateria</TableCell>
                            <TableCell>Origem</TableCell>
                            <TableCell>Dias de atraso</TableCell>
                            <TableCell>Requisição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {unavailableBatteries.map(item => (
                            <TableRow key={item.batteryCode}>
                                <TableCell>{item.batteryModel}</TableCell>
                                <TableCell>{item.batteryCode}</TableCell>
                                <TableCell>{item.origin}</TableCell>
                                <TableCell>{item.daysOfDelay}</TableCell>
                                <TableCell>{item.request}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}