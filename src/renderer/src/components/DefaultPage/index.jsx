import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'normalize.css'
import '../../assets/index.css'
import { Outlet, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { Box, Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoanBatteries } from '../../store/reducers/loanBatteries';
import { updateData } from '../../store/reducers/requests';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../Footer';
import { setsTheDeadlineDays } from '../../utils/setsTheDeadlineDays';
import { definesNumberOfDaysPassed } from '../../utils/definesNumberOfDaysPassed';
import { defineDaysOfDelay } from '../../utils/defineDaysOfDelay';



export default function DefaultPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loanBatteries = useSelector(state => state.loanBatteries)
    const requests = useSelector(state => state.requests)

    const date = new Date()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        updateSystem()
    }, [requests, loanBatteries]);

    const updateSystem = () => {
        const requestsUpdated = updatesDateRelatedAttributes()
        const loanBatteriesUpdated = updatedLoanBatteries(requestsUpdated)
        const { loanBatteriesCloneUpdated, requestsCloneUpdated } = definesRequisitionBatteryAsLoanBattery(loanBatteriesUpdated, requestsUpdated)

        if (!isEqual(requests, requestsCloneUpdated)) {
            dispatch(updateData(requestsCloneUpdated))
            window.bridgeRequests.saveDataRequests(requestsCloneUpdated)
        }

        if (!isEqual(loanBatteries, loanBatteriesCloneUpdated)) {
            dispatch(updateLoanBatteries(loanBatteriesCloneUpdated))
            window.bridgeLoanBatteries.saveDataLoanBatteries(loanBatteriesCloneUpdated)
        }
    }

    //Atualiza o numero de dias passados, prazo, e dias de atraso de acordo com o dia de hoje
    const updatesDateRelatedAttributes = () => {
        let requestsClone = requests.map(request => ({ ...request }))

        requestsClone.forEach(request => {
            request.numberOfDaysPassed = definesNumberOfDaysPassed(request.entryDate)
            request.deadlineDays = setsTheDeadlineDays(request.entryDate, request.returnDate)
            request.daysOfDelay = defineDaysOfDelay(request.numberOfDaysPassed, request.deadlineDays)
        })

        return requestsClone
    }

    const updatedLoanBatteries = (requestsUpdated) => {
        let loanBatteriesClone = loanBatteries.map(battery => ({ ...battery }))
        const requestsClone = [...requestsUpdated]

        loanBatteriesClone.forEach(battery => {
            let isBatteryLoaned = false

            requests.forEach(request => {
                if (battery.batteryCode === request.loanBatteryCode) {
                    isBatteryLoaned = true
                }
            })

            isBatteryLoaned ? battery.batteryIsAvailable = false : battery.batteryIsAvailable = true
        })

        const { loanBatteriesCloneUpdated } = definesRequisitionBatteryAsLoanBattery(loanBatteriesClone, requestsClone)

        return loanBatteriesCloneUpdated

    }

    const definesRequisitionBatteryAsLoanBattery = (loanBatteriesUpdated, requestsUpdated) => {
        let loanBatteriesClone = [...loanBatteriesUpdated]
        const requestsClone = [...requestsUpdated]
        const maximumDelayOfDays = 30

        requestsClone.forEach(request => {

            let newLoanBattery = {
                batteryModel: '',
                batteryCode: '',
                batteryIsAvailable: true,
                origin: 'PERMUTA'
            }

            if (request.status !== "PERMUTA" && request.daysOfDelay > maximumDelayOfDays && request.itHasALoanerBattery) {
                request.status === 'EMPRESTADA' ? newLoanBattery.batteryIsAvailable = false : ''
                request.status = "PERMUTA"
                newLoanBattery.batteryModel = request.batteryModel
                newLoanBattery.batteryCode = request.batteryCode
                loanBatteriesClone.push(newLoanBattery)
                loanBatteriesClone.forEach(loanBattery => {
                    if (loanBattery.batteryCode === request.loanBatteryCode) {
                        const batteryToBeRemovedFromLoanerBatteries = loanBattery
                        loanBatteriesClone = loanBatteriesClone.filter(item => item.batteryCode !== batteryToBeRemovedFromLoanerBatteries.batteryCode)
                    }
                })
            }
        })

        const loanBatteriesCloneUpdated = loanBatteriesClone
        const requestsCloneUpdated = requestsClone

        return {
            loanBatteriesCloneUpdated,
            requestsCloneUpdated
        }

    }

    const refreshSystem = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false);
        }, 1000)

        updateSystem()
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minHeight: '100vh' }}>
            <Title />
            <Box sx={{ backgroundColor: '#31363F', display: 'flex', gap: '20px', p: '15px' }}>
                <Button sx={{ backgroundColor: '#FF9800', color: '#000' }} onClick={() => navigate('/')} variant='contained'>Entrada</Button>
                <Button sx={{ backgroundColor: '#90D26D', color: '#000' }} onClick={() => navigate('/saida')} variant='contained'>Saída</Button>
                <Button sx={{ backgroundColor: '#41C9E2', color: '#000' }} onClick={() => navigate('/baterias-de-emprestimo')} variant='contained'>Baterias de empréstimo</Button>
                <Button sx={{ backgroundColor: '#5755FE', color: '#000' }} onClick={() => navigate('/retorno')} variant='contained'>Retorno</Button>
                <Button sx={{ backgroundColor: '#FF204E', color: '#000' }} onClick={() => navigate('/editar')} variant='contained'>Editar dados</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Hoje é {date.toLocaleDateString()}</Typography>
                {isLoading ? (
                    <Button><CircularProgress size={20} /></Button>
                ) : (
                    <Button onClick={refreshSystem}><RefreshIcon /></Button>
                )}
            </Box>
            <Outlet />
            <Footer />
        </Box>
    )
}