import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilteringField from "../../components/FilteringField";
import OutputRequestTable from "../../components/OutputRequestTable";

export default function RequestOutput() {

    const navigate = useNavigate()

    const requests = useSelector(state => state.requests)

    const [dataRenderer, setDataRenderer] = useState(requests)
    const [filterValue, setFilterValue] = useState('')

    useEffect(() => {
        if (filterValue.length > 0) {
            let filteredRequests = requests.filter(item => {
                const stringRequestNumber = item.request.toString().toLowerCase()
                return stringRequestNumber.includes(filterValue.toLowerCase())
            })
            setDataRenderer(filteredRequests)
        } else {
            setDataRenderer(requests)
        }

    }, [filterValue])

    useEffect(() => {
        setDataRenderer(requests)
    }, [requests])

    return (
        <Box sx={{ minHeight: '45vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            <Button onClick={() => navigate("/saida/requisicao-permutada")} color="error" variant="contained">Saída requisição permutada</Button>
            <FilteringField onChangeValue={(value) => setFilterValue(value)} inputValue={filterValue} labelText="Filtrar pelo número da requisição" />
            <OutputRequestTable data={dataRenderer}/>
        </Box>
    )
}