import { Box, Link, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <Box component="footer" sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', backgroundColor: '#FBB900', height: '125px', width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ color: "#000", fontWeight: "bold" }}>Desenvolvido por Alessandro Gomes &#169;</Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Link target="_blank" href="https://linkedin.com/in/allessandrogomes"><LinkedInIcon /></Link>
                    <Link sx={{ color: '#000' }} target="_blank" href="https://github.com/allessandrogomes"><GitHubIcon /></Link>
                </Box>
            </Box>
        </Box>
    )
}