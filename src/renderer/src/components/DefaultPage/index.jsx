import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'normalize.css'
import '../../index.css'
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



export default function DefaultPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loanBatteries = useSelector(state => state.loanBatteries)
    const requests = useSelector(state => state.requests)

    const date = new Date()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        updateSystem()
    }, [requests]);

    const updateSystem = () => {
        const requestsUpdated = updateRequestsDependentOnTodaysDate()
        const loanBatteriesUpdated = updatedLoanBatteries(requestsUpdated)
        const { loanBatteriesCloneUpdated, requestsCloneUpdated } = definesRequisitionBatteryAsLoanBattery(loanBatteriesUpdated, requestsUpdated)

        if (!isEqual(requests, requestsCloneUpdated)) {
            dispatch(updateData(requestsCloneUpdated));
        }

        if (!isEqual(loanBatteries, loanBatteriesCloneUpdated)) {
            dispatch(updateLoanBatteries(loanBatteriesCloneUpdated));
        }
    }

    const updateRequestsDependentOnTodaysDate = () => {
        let requestsClone = requests.map(request => ({ ...request }))

        requestsClone.forEach(request => {
            request.numberOfDaysPassed = definesNumberOfDaysPassed(request.entryDate)
            request.daysOfDelay = request.numberOfDaysPassed - request.deadlineDays
        })

        return requestsClone
    }

    const definesNumberOfDaysPassed = (entryDate) => {
        const todayDate = new Date()

        const [day, month, year] = entryDate.split('/')
        const entryDateInDateFormat = new Date(year, month - 1, day, 0, 0, 0)

        const differenceInMilliseconds = Math.abs(todayDate - entryDateInDateFormat)

        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24))

        return differenceInDays - 1
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
        const loanBatteriesClone = [...loanBatteriesUpdated]
        const requestsClone = [...requestsUpdated]
        const maximumDealineOfDays = 30

        requestsClone.forEach(request => {

            let newLoanBattery = {
                batteryModel: '',
                batteryCode: '',
                batteryIsAvailable: true
            }

            if (request.status !== "PERMUTA" && request.numberOfDaysPassed > maximumDealineOfDays) {
                request.status = "PERMUTA"
                newLoanBattery.batteryModel = request.batteryModel
                newLoanBattery.batteryCode = request.batteryCode
                loanBatteriesClone.push(newLoanBattery)
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px', minHeight: '100vh' }}>
            <Title />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Hoje é {date.toLocaleDateString()}</Typography>
                {isLoading ? (
                    <Button><CircularProgress size={20} /></Button>
                ) : (
                    <Button onClick={refreshSystem}><RefreshIcon /></Button>
                )}
            </Box>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button sx={{ backgroundColor: '#FF9800', color: '#000' }} onClick={() => navigate('/')} variant='contained'>Porta</Button>
                <Button sx={{ backgroundColor: '#5755FE', color: '#000' }} onClick={() => navigate('/retorno')} variant='contained'>Retorno</Button>
                <Button sx={{ backgroundColor: '#41C9E2', color: '#000' }} onClick={() => navigate('/baterias-de-emprestimo')} variant='contained'>Baterias de empréstimo</Button>
            </Box>
            <Outlet />
            <Footer />
        </Box>
    )
}