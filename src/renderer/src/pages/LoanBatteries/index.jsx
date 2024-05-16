import { Alert, Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TableOfAvailableLoanBatteries from "../../components/TableOfAvailableLoanBatteries"
import TableOfSuggestionLoanBatteries from "../../components/TableOfSuggestionLoanBatteries"
import FormLoanBatteries from "../../components/FormLoanBatteries"
import TableOfUnavailableBatteries from "../../components/TableOfUnavailableBatteries"

export default function LoanBatteries() {

    const [newLoanBatteryRegisteredSucessfully, setNewLoanBatteryRegisteredSucessfully] = useState(null)

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
                newLoanBatteryRegisteredSucessfully ? ( <Alert severity="success">Bateria cadastrada com sucesso.</Alert>) : 
                newLoanBatteryRegisteredSucessfully === false ? ( <Alert severity="warning">Já existe uma bateria com esse código cadastrado, por favor tente novamente.</Alert>) : 
                null
            }
            <FormLoanBatteries newLoanBatteryRegisteredSucessfully={(value) => setNewLoanBatteryRegisteredSucessfully(value)}/>
            <TableOfAvailableLoanBatteries />
            <TableOfSuggestionLoanBatteries />
            <TableOfUnavailableBatteries />
        </Box>
    )
}