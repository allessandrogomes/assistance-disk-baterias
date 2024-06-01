import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Edition() {

    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '45vh' }}>
            <Typography component="h2" variant="h5">Selecione o que deseja editar</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button sx={{ backgroundColor: "#FBB900", color: "#000", '&:hover': { backgroundColor: "#FFF" } }} onClick={() => navigate('/editar/requisicoes')} variant="contained">Requisições</Button>
                <Button sx={{ backgroundColor: "#FBB900", color: "#000", '&:hover': { backgroundColor: "#FFF" } }} onClick={() => navigate('/editar/baterias-de-emprestimo')} variant="contained">Baterias de empréstimo</Button>
            </Box>
        </Box>

    )
}