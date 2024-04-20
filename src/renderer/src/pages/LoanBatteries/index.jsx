import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateLoanBatteries } from "../../store/reducers/loanBatteries"


export default function LoanBatteries() {

    const dispatch = useDispatch()

    const loanBatteries = useSelector(state => state.loanBatteries)
    const requests = useSelector(state => state.requests)

    const [newLoanBatteryRegisteredSucessfully, setNewLoanBatteryRegisteredSucessfully] = useState(null)

    const [formData, setFormData] = useState({
        batteryModel: '',
        batteryCode: '',
        batteryIsAvailable: true,
        origin: 'SOS'
    })

    const updateFormData = (event) => {
        let { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value.trim().toUpperCase()
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const loanBatteriesUpdated = [...loanBatteries]

        if (loanBatteries.some(item => item.batteryCode === formData.batteryCode)) {
            setNewLoanBatteryRegisteredSucessfully(false)
        } else {
            setNewLoanBatteryRegisteredSucessfully(true)
            loanBatteriesUpdated.push(formData)
            dispatch(updateLoanBatteries(loanBatteriesUpdated))
            window.bridgeLoanBatteries.saveDataLoanBatteries(loanBatteriesUpdated)
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setNewLoanBatteryRegisteredSucessfully(null)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [newLoanBatteryRegisteredSucessfully])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Baterias de empréstimo</Typography>
            {
                newLoanBatteryRegisteredSucessfully === true ? (
                    <Alert severity="success">Bateria cadastrada com sucesso.</Alert>
                ) : newLoanBatteryRegisteredSucessfully === false ? (
                    <Alert severity="warning">Já existe uma bateria com esse código cadastrado, por favor tente novamente.</Alert>
                ) : null
            }
            <form onSubmit={handleSubmit}>
                <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: '10px', display: 'flex', gap: '20px', p: '10px' }}>
                    <TextField label="Modelo da bateria" onChange={updateFormData} name="batteryModel" value={formData.batteryModel} variant="outlined" required />
                    <TextField label="Código da bateria" onChange={updateFormData} name="batteryCode" value={formData.batteryCode} variant="outlined" required />
                    <Button variant="contained" type="submit">Adicionar nova bateria</Button>
                </Box>
            </form>
            <Typography variant="h5">Baterias disponíveis</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo da Bateria</TableCell>
                            <TableCell>Código da bateria</TableCell>
                            <TableCell>Origem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanBatteries.map(battery => {
                            if (battery.batteryIsAvailable) {
                                return (
                                    <TableRow key={battery.batteryCode}>
                                        <TableCell>{battery.batteryModel}</TableCell>
                                        <TableCell>{battery.batteryCode}</TableCell>
                                        <TableCell>{battery.origin}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h5">Sugestão de baterias atrasadas para empréstimo</Typography>
            <TableContainer component={Paper}>
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
                        {requests.map(request => {
                            if (request.daysOfDelay > 7 && request.status === 'PENDENTE' && request.itHasALoanerBattery) {
                                return (
                                    <TableRow key={request.batteryCode}>
                                        <TableCell>{request.batteryModel}</TableCell>
                                        <TableCell>{request.batteryCode}</TableCell>
                                        <TableCell>{request.daysOfDelay}</TableCell>
                                        <TableCell>{request.request}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h5">Baterias emprestadas</Typography>
            <TableContainer component={Paper}>
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
                        {loanBatteries.map(battery => {
                            if (!battery.batteryIsAvailable) {
                                return (
                                    <TableRow key={battery.batteryCode}>
                                        <TableCell>{battery.batteryModel}</TableCell>
                                        <TableCell>{battery.batteryCode}</TableCell>
                                        <TableCell>{battery.origin}</TableCell>
                                        <TableCell>{battery.origin}</TableCell>
                                        <TableCell>{battery.origin}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        {requests.map(battery => {
                            if (battery.status === 'EMPRESTADA') {
                                return (
                                    <TableRow key={battery.batteryCode}>
                                        <TableCell>{battery.batteryModel}</TableCell>
                                        <TableCell>{battery.batteryCode}</TableCell>
                                        <TableCell>REQUISIÇÃO</TableCell>
                                        <TableCell>{battery.daysOfDelay}</TableCell>
                                        <TableCell>{battery.request}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        {requests.map(battery => {
                            if (battery.loanedRouteBatteryRequestNumber.length > 0) {
                                return (
                                    <TableRow key={battery.loanBatteryCode}>
                                        <TableCell>{battery.loanBatteryModel}</TableCell>
                                        <TableCell>{battery.loanBatteryCode}</TableCell>
                                        <TableCell>ROTA</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{battery.loanedRouteBatteryRequestNumber}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}