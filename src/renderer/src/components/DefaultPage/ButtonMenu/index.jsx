import { Button } from "@mui/material";

export default function ButtonMenu({ startIcon, onClick, text, active }) {
    return (
        <Button
            startIcon={startIcon}
            sx={{ backgroundColor: `${active ? '#FFF' : '#FBB900'}`, color: '#000', '&:hover': { backgroundColor: '#FFF' } }}
            onClick={onClick}
            variant='contained'
        >
            {text}
        </Button>
    )
}