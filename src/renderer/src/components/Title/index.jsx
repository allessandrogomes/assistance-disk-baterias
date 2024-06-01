import { Box, Paper, Typography } from "@mui/material";
import Logo from "../../assets/logo-disk-baterias.jpg"

export default function Title() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', height: '125px', width: '100%', gap: "10px" }}>
            <Box sx={{ width: "65px", position: "relative", top: "5px" }}>
                <img style={{ width: "100%" }} src={Logo} alt="Logo Disk Baterias" />
            </Box>
            <Box sx={{ backgroundColor: "#FBB900", width: "500px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }} component={Paper}>
                <Typography
                    component="h1"
                    sx={{ fontSize: '2rem', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: "Bebas-Neue" }}
                >
                    Assistência Técnica - Disk Baterias
                </Typography>
            </Box>

        </Box>
    )
}