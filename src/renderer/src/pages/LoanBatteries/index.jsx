import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addNewLoanBattery, updateLoanBatteries } from "../../store/reducers/loanBatteries"
import RefreshIcon from '@mui/icons-material/Refresh';


export default function LoanBatteries() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const loanBatteries = useSelector(state => state.loanBatteries)
    const requests = useSelector(state => state.requests)

    const [newLoanBatteryRegisteredSucessfully, setNewLoanBatteryRegisteredSucessfully] = useState(null)

    const [formData, setFormData] = useState({
        batteryModel: '',
        batteryCode: '',
        batteryIsAvailable: true
    })

    const updateTable = () => {
        const updatedLoanBatteries = loanBatteries.map(battery => ({ ...battery }))

        updatedLoanBatteries.forEach(battery => {
            let isBatteryLoaned = false

            requests.forEach(request => {
                if (battery.batteryCode === request.loanBatteryCode) {
                    isBatteryLoaned = true
                }
            })

            isBatteryLoaned ? battery.batteryIsAvailable = false : battery.batteryIsAvailable = true
        })

        dispatch(updateLoanBatteries(updatedLoanBatteries))
    }

    const updateFormData = (event) => {
        let { name, value } = event.target



        setFormData({
            ...formData,
            [name]: value.trim().toUpperCase()
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (loanBatteries.some(item => item.batteryCode === formData.batteryCode)) {
            setNewLoanBatteryRegisteredSucessfully(false)
        } else {
            setNewLoanBatteryRegisteredSucessfully(true)
            dispatch(addNewLoanBattery(formData))
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
            <Box>
                <Button onClick={() => navigate('/')}>Início</Button>
                <Button onClick={() => navigate('/retorno')}>Retorno ao cliente</Button>
            </Box>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Baterias de empréstimo</Typography>
            <Button onClick={updateTable}>Atualizar<RefreshIcon /></Button>
            {
                newLoanBatteryRegisteredSucessfully === true ? (
                    <Alert severity="success">Requisição cadastrada com sucesso.</Alert>
                ) : newLoanBatteryRegisteredSucessfully === false ? (
                    <Alert severity="warning">Já existe uma bateria com esse código cadastrado, por favor tente novamente.</Alert>
                ) : null
            }
            <form onSubmit={handleSubmit}>
                <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: '10px', display: 'flex', gap: '20px', p: '10px' }}>
                    <TextField label="Modelo da bateria" onChange={updateFormData} name="batteryModel" value={formData.batteryModel} variant="outlined" required/>
                    <TextField label="Código da bateria" onChange={updateFormData} name="batteryCode" value={formData.batteryCode} variant="outlined" required/>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanBatteries.map(battery => {
                            if (battery.batteryIsAvailable) {
                                return (
                                    <TableRow key={battery.batteryCode}>
                                        <TableCell>{battery.batteryModel}</TableCell>
                                        <TableCell>{battery.batteryCode}</TableCell>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanBatteries.map(battery => {
                            if (!battery.batteryIsAvailable) {
                                return (
                                    <TableRow key={battery.batteryCode}>
                                        <TableCell>{battery.batteryModel}</TableCell>
                                        <TableCell>{battery.batteryCode}</TableCell>
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