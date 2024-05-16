import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateLoanBatteries } from "../../store/reducers/loanBatteries"
import { useState } from "react";

export default function FormLoanBatteries({ newLoanBatteryRegisteredSucessfully }) {

    const dispatch = useDispatch()

    const loanBatteries = useSelector(state => state.loanBatteries)

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
            newLoanBatteryRegisteredSucessfully(false)
        } else {
            newLoanBatteryRegisteredSucessfully(true)
            loanBatteriesUpdated.push(formData)
            dispatch(updateLoanBatteries(loanBatteriesUpdated))
            window.bridgeLoanBatteries.saveDataLoanBatteries(loanBatteriesUpdated)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: '10px', display: 'flex', gap: '20px', p: '10px' }}>
                <TextField label="Modelo da bateria" onChange={updateFormData} name="batteryModel" value={formData.batteryModel} variant="outlined" required />
                <TextField label="Código da bateria" onChange={updateFormData} name="batteryCode" value={formData.batteryCode} variant="outlined" required />
                <Button variant="contained" type="submit">Adicionar nova bateria</Button>
            </Box>
        </form>
    )
} 