import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'normalize.css'
import '../../assets/index.css'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
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
import AddIcon from '@mui/icons-material/Add';
import OutputIcon from '@mui/icons-material/Output';
import InventoryIcon from '@mui/icons-material/Inventory';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import ButtonMenu from './ButtonMenu';

export default function DefaultPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
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
        const { loanBatteriesCloneUpdated, requestsCloneUpdated } = carriesOutExchangeProcess(loanBatteriesUpdated, requestsUpdated)

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
            if (request.status !== 'FINALIZADA') {
                request.numberOfDaysPassed = definesNumberOfDaysPassed(request.entryDate)
                request.deadlineDays = setsTheDeadlineDays(request.entryDate, request.returnDate)
                request.daysOfDelay = defineDaysOfDelay(request.numberOfDaysPassed, request.deadlineDays)
            }
        })

        return requestsClone
    }

    const updatedLoanBatteries = (requestsUpdated) => {
        let loanBatteriesClone = loanBatteries.map(battery => ({ ...battery }))
        const requestsClone = [...requestsUpdated]

        loanBatteriesClone.forEach(loanBattery => {
            let isBatteryLoaned = false

            requests.forEach(request => {
                if (loanBattery.batteryCode === request.loanBatteryCode && request.status !== 'FINALIZADA') {
                    isBatteryLoaned = true
                }
            })

            isBatteryLoaned ? loanBattery.batteryIsAvailable = false : loanBattery.batteryIsAvailable = true
        })

        const { loanBatteriesCloneUpdated } = carriesOutExchangeProcess(loanBatteriesClone, requestsClone)

        return loanBatteriesCloneUpdated

    }

    const carriesOutExchangeProcess = (loanBatteriesUpdated, requestsUpdated) => {
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

            if (request.status !== "PERMUTA" && request.daysOfDelay > maximumDelayOfDays && request.itHasALoanerBattery && !request.exchangeCanceled) {
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
        console.log(location.pathname)
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minHeight: '100vh', width: "100%" }}>
            <Title />
            <ButtonGroup>
                <ButtonMenu active={location.pathname === "/" ? true : false} text="Entrada" startIcon={<AddIcon />} onClick={() => navigate('/')}/>
                <ButtonMenu active={location.pathname === "/saida" ? true : false} text="Saída" startIcon={<OutputIcon />} onClick={() => navigate('/saida')}/>
                <ButtonMenu active={location.pathname === "/baterias-de-emprestimo" ? true : false} text="Baterias de empréstimo" startIcon={<InventoryIcon />} onClick={() => navigate('/baterias-de-emprestimo')}/>
                <ButtonMenu active={location.pathname === "/retorno" ? true : false} text="Retorno" startIcon={<WhatsAppIcon />} onClick={() => navigate('/retorno')}/>
                <ButtonMenu active={location.pathname === "/editar" ? true : false} text="Editar dados" startIcon={<EditIcon />} onClick={() => navigate('/editar')}/>
            </ButtonGroup>
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