import { Box, TextField, Typography } from '@mui/material'
import { ErrorMessage } from 'formik'


export default function TextFieldForm({ onChange, onBlur, title, value, type, name, sx, inputProps }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                size="small"
                type={type}
                label={title}
                value={value}
                variant="filled"
                sx={sx}
                inputProps={inputProps}
            />
            <ErrorMessage name={name}>
                {message => (
                    <Typography fontSize="small" color="red">{message}</Typography>
                )}
            </ErrorMessage>
        </Box>
    )
}