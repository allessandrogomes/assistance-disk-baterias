import { Box, Input, InputLabel } from "@mui/material";


export default function FilteringField({ inputLabelFilterBy, onChangeValue, inputValue }) {
    return (
        <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: '5px', p: '10px', mb: '20px', width: '250px' }}>
            <InputLabel>Filtrar pelo {inputLabelFilterBy}</InputLabel>
            <Input onChange={(event) => onChangeValue(event.target.value)} value={inputValue} sx={{ width: '70px' }} />
        </Box>
    )
}