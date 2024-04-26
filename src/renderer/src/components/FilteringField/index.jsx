import { Box, Input, InputLabel } from "@mui/material";


export default function FilteringField({ labelText, onChangeValue, inputValue }) {
    return (
        <Box sx={{ backgroundColor: '#EEEEEE', borderRadius: '5px', p: '10px', width: '250px' }}>
            <InputLabel>{labelText}</InputLabel>
            <Input onChange={(event) => onChangeValue(event.target.value)} value={inputValue} sx={{ width: '70px' }} />
        </Box>
    )
}