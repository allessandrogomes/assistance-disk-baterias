import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, FormLabel, Paper } from '@mui/material';

export default function FieldAddNewData() {

    return (
        <Paper elevation={24}>
            <FormLabel sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', maxWidth: '95vw', bgcolor: '#EEEEEE', p: '10px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', width: '100%' }}>
                    <TextField size="small" label="ID" variant="filled" required />
                    <TextField size="small" label="Nome do cliente" variant="filled" required />
                    <TextField size="small" label="CPF" variant="filled" />
                    <TextField size="small" label="Telefone" variant="filled" required />
                    <TextField type="date" size="small" label="Data de entrada" variant="filled" required />
                    <TextField type="date" size="small" label="Data de retorno" variant="filled" required />
                    <TextField size="small" label="Modelo da bateria" variant="filled" required />
                    <TextField size="small" label="Código da bateria" variant="filled" required />
                    <TextField size="small" label="Modelo bateria empréstimo" variant="filled" required />
                    <TextField size="small" label="Código bateria empréstimo" variant="filled" required />
                </Box>
                <Button variant="contained">Adicionar</Button>
            </FormLabel>
        </Paper>

    )
}