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
            setFormData({
                batteryModel: '',
                batteryCode: '',
                batteryIsAvailable: true,
                origin: 'SOS'
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ backgroundColor: '#FBB900', borderRadius: '10px', display: 'flex', gap: '20px', p: '10px' }}>
                <TextField sx={{ backgroundColor: "#FFF" }} label="Modelo da bateria" onChange={updateFormData} name="batteryModel" value={formData.batteryModel} variant="outlined" required />
                <TextField sx={{ backgroundColor: "#FFF" }} label="Código da bateria" onChange={updateFormData} name="batteryCode" value={formData.batteryCode} variant="outlined" required />
                <Button sx={{ backgroundColor: "#000", '&:hover': { backgroundColor: "#2A2D38" } }} variant="contained" type="submit">Adicionar nova bateria</Button>
            </Box>
        </form>
    )
} 