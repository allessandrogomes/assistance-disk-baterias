import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import FilteringField from "../../../components/FilteringField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../store/reducers/requests";
import { updateLoanBatteries } from "../../../store/reducers/loanBatteries";


export default function PermutedRequestOutput() {

    const requests = useSelector(state => state.requests)
    const loanBatteries = useSelector(state => state.loanBatteries)
    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState('')
    const [exchangedRequestSelected, setExchangedRequestSelected] = useState(undefined)
    const [exitSuccessfully, setExitSuccessfully] = useState(false)

    const searchRequest = () => {
        const searchResult = requests.filter(item => item.request.toString() === searchValue && item.status === 'PERMUTA')
        setExchangedRequestSelected(searchResult)
    }

    const undoExchangeAndMakeExit = () => {
        let requestsClone = requests.map(item => ({ ...item }))
        let loanBatteriesClone = loanBatteries.map(item => ({ ...item }))
        
        //realiza a saída da requisição permutada e bloqueia a permutação por meio do 'exchangeCanceled'
        requestsClone.forEach(requestClone => {
            exchangedRequestSelected.forEach(exchangedRequest => {
                if (requestClone.batteryCode === exchangedRequest.batteryCode) {
                    requestClone.status = 'FINALIZADA'
                    requestClone.outputDate = new Date().toLocaleDateString('pt-BR')
                    requestClone.exchangeCanceled = true
                }
                //caso a requisição finalizada tenha como empréstimo uma bateria de outra requisição, esta retorna para seus status de 'PENDENTE'
                if (requestClone.batteryCode === exchangedRequest.loanBatteryCode) {
                    requestClone.status = 'PENDENTE'
                }
            })
        })

        //retorna a bateria SOS original
        exchangedRequestSelected.forEach(exchangedRequest => {
            let loanBatteryReturned = {
                batteryModel: '',
                batteryCode: '',
                batteryIsAvailable: true,
                origin: 'SOS'
            }

            loanBatteryReturned.batteryModel = exchangedRequest.loanBatteryModel
            loanBatteryReturned.batteryCode = exchangedRequest.loanBatteryCode
            loanBatteriesClone.push(loanBatteryReturned)

            //deleta a bateria permutada das baterias de empréstimo
            loanBatteriesClone.forEach(loanBattery => {
                if (loanBattery.batteryCode === exchangedRequest.batteryCode) {
                    loanBatteriesClone = loanBatteriesClone.filter(item => item.batteryCode !== loanBattery.batteryCode)
                }
            })
        })

        dispatch(updateData(requestsClone))
        dispatch(updateLoanBatteries(loanBatteriesClone))
        window.bridgeRequests.saveDataRequests(requestsClone)
        window.bridgeLoanBatteries.saveDataLoanBatteries(loanBatteriesClone)
        setExchangedRequestSelected(undefined)
        setSearchValue('')
        setExitSuccessfully(true)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setExitSuccessfully(false)
        }, 5000)
    
        return () => clearTimeout(timeoutId)
      }, [exitSuccessfully])

    return (
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', minHeight: '45vh', maxWidth: '95vw', gap: '50px' }}>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', alignSelf: 'center' }}>
                <FilteringField labelText="Digite o número da requisição" onChangeValue={(value) => setSearchValue(value)} inputValue={searchValue} />
                <Button sx={{ height: '50px' }} onClick={searchRequest} variant="contained">Buscar</Button>
            </Box>
            {
            exchangedRequestSelected === undefined ? <Typography sx={{ fontSize: '1rem' }} component="span">Busque por uma requisição permutada</Typography> : 
            !exchangedRequestSelected.length ? <Typography sx={{ fontSize: '1rem' }} component="span">Requisição não encontrada...</Typography> : 
            (
                <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'white', p: '10px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>N° Requisição</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Modelo bateria</TableCell>
                                <TableCell>Código bateria</TableCell>
                                <TableCell>Bateria empréstimo</TableCell>
                                <TableCell>Código bateria empréstimo</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exchangedRequestSelected.map(item => (
                                <TableRow key={item.id}>
                                <TableCell>{item.request}</TableCell>
                                <TableCell>{item.clientName}</TableCell>
                                <TableCell>{item.batteryModel}</TableCell>
                                <TableCell>{item.batteryCode}</TableCell>
                                <TableCell>{item.loanBatteryModel}</TableCell>
                                <TableCell>{item.loanBatteryCode}</TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }
            <Button 
                color="success" 
                disabled={exchangedRequestSelected === undefined ? true : exchangedRequestSelected.length === 0 ? true : false}
                onClick={undoExchangeAndMakeExit}
                sx={{ width: '400px' }} 
                variant="contained"
            >
                Desfazer permuta e realizar saída
            </Button>
            {exitSuccessfully ? <Alert severity="success">Saída realizada com sucesso.</Alert> : ''}
        </Box>
    )
} 