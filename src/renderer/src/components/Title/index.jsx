import { Box, Typography } from "@mui/material";

export default function Title() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#31363F', height: '125px', width: '100%' }}>
            <Typography
                component="h1"
                sx={{ fontSize: '2rem', textTransform: 'uppercase', fontWeight: 'bold' }}
            >
                Controle baterias de porta - Assistência Técnica
            </Typography>
        </Box>
    )
}