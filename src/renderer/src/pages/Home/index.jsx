import { Box, Button } from "@mui/material"
import FieldAddNewData from "../../components/FieldAddNewData"
import DataTable from "../../components/Table"
import { useNavigate } from "react-router-dom"



function Home() {

  const navigate = useNavigate()

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '50px', justifyContent: 'center' }}>
      <Button onClick={() => navigate('/retorno')}>Tela de retorno</Button>
      <FieldAddNewData />
      <DataTable />
    </Box>
  )
}

export default Home