import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'normalize.css'
import '../../index.css'
import { Outlet } from "react-router-dom";
import Title from "../../components/Title";
import { Box } from '@mui/material';


export default function DefaultPage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
            <Title />
            <Outlet />
        </Box>
    )
}