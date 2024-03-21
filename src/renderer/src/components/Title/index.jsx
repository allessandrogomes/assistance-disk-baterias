import { Box, Typography } from "@mui/material";

export default function Title() {
    return (
        <Box sx={{ mt: '50px' }}>
            <Typography
                component="h1"
                sx={{ fontSize: '2rem', textTransform: 'uppercase', fontWeight: 'bold' }}
            >
                Controle baterias de porta - Assistência Técnica
            </Typography>
        </Box>
    )
}