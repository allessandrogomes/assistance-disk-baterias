import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { removeData, updateData } from "../../store/reducers/requests";
import FilteringField from "../../components/FilteringField";
import ModalConfirmAction from "../../components/ModalConfirmAction";


export default function EditionRequests() {

    const requests = useSelector(state => state.requests)

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState('')
    const [selectedRequest, setSelectedRequest] = useState({})
    const [selectedRequests, setSelectedRequests] = useState([])
    const [editEnabled, setEditEnabled] = useState(false)
    const [requestNotFound, setRequestNotFound] = useState(undefined)
    const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false)

    const searchRequest = () => {
        const requestFound = requests.some(item => item.request.toString() === searchValue)
        if (requestFound) {
            let count = 0
            requests.forEach(item => {
                item.request.toString() === searchValue ? count++ : ''
            })

            if (count < 2) {
                requests.forEach(item => item.request.toString() === searchValue ? setSelectedRequest(item) : '')
                setRequestNotFound(false)
                setSelectedRequests([])
            } else {
                const requestsFound = []
                requests.forEach(item => item.request.toString() === searchValue ? requestsFound.push(item) : '')
                setSelectedRequests(requestsFound)
                setRequestNotFound(false)
            }
        } else {
            setRequestNotFound(true)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setSelectedRequest({
            ...selectedRequest,
            [name]: value
        })
    }

    const chooseRequest = (item) => {
        setSelectedRequest(item)
        setRequestNotFound(false)
        setSelectedRequests([])
    }

    const handleSave = () => {
        const requestsUpdated = requests.filter(item => item.id !== selectedRequest.id)
        requestsUpdated.push(selectedRequest)
        dispatch(updateData(requestsUpdated))
        window.bridgeRequests.saveDataRequests(requestsUpdated)
        setEditEnabled(false)

    }

    const handleOpenModalDelete = () => {
        setOpenModalConfirmDelete(true)
    }

    const handleDelete = () => {
        const requestsUpdated = requests.filter(item => item.id !== selectedRequest.id)
        dispatch(removeData(selectedRequest))
        window.bridgeRequests.saveDataRequests(requestsUpdated)
        setOpenModalConfirmDelete(false)
        setSelectedRequest({})
        setSearchValue('')
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '45vh', maxWidth: '95vw' }}>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', alignSelf: 'center', mb: '40px' }}>
                <FilteringField labelText="Digite o número da requisição" onChangeValue={(value) => setSearchValue(value)} inputValue={searchValue} />
                <Button sx={{ height: '50px' }} onClick={searchRequest} variant="contained">Buscar</Button>
            </Box>
            {requestNotFound ? <span style={{ color: 'white', fontFamily: 'sans-serif' }}>Nenhuma requisição encontrada...</span> :
                selectedRequests.length > 0 ? (
                    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: '#FFF', p: '10px' }}>
                        <Typography sx={{ color: 'red' }}>Existe mais de uma requisição, escolha uma para editar ou excluir</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>N° Requisição</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Data entrada</TableCell>
                                    <TableCell>Data retorno</TableCell>
                                    <TableCell>Modelo bateria</TableCell>
                                    <TableCell>Código bateria</TableCell>
                                    <TableCell>Bateria empréstimo</TableCell>
                                    <TableCell>Código bateria empréstimo</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Selecionar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedRequests.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.request}</TableCell>
                                        <TableCell>{item.clientName}</TableCell>
                                        <TableCell>{item.cpf}</TableCell>
                                        <TableCell>{item.phoneNumber}</TableCell>
                                        <TableCell>{item.entryDate}</TableCell>
                                        <TableCell>{item.returnDate}</TableCell>
                                        <TableCell>{item.batteryModel}</TableCell>
                                        <TableCell>{item.batteryCode}</TableCell>
                                        <TableCell>{item.loanBatteryModel}</TableCell>
                                        <TableCell>{item.loanBatteryCode}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <Button onClick={() => chooseRequest(item)} sx={{ mt: '10px' }} size="small" variant="contained">Selecionar</Button>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) :
                    (
                        Object.keys(selectedRequest).length !== 0 ? (
                            <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: '#FFF', }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>N° Requisição</TableCell>
                                            <TableCell>Cliente</TableCell>
                                            <TableCell>CPF</TableCell>
                                            <TableCell>Telefone</TableCell>
                                            <TableCell>Data entrada</TableCell>
                                            <TableCell>Data retorno</TableCell>
                                            <TableCell>Modelo bateria</TableCell>
                                            <TableCell>Código bateria</TableCell>
                                            <TableCell>Bateria empréstimo</TableCell>
                                            <TableCell>Código bateria empréstimo</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Editar</TableCell>
                                            <TableCell>Excluir</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={selectedRequest.id}>
                                            {editEnabled ? (
                                                <>
                                                    <TableCell>
                                                        <TextField sx={{ width: '80px' }} name="request" value={selectedRequest.request} onChange={(event) => handleChange(event)} variant="outlined" label="N° Requisição" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '150px' }} name="clientName" value={selectedRequest.clientName} onChange={(event) => handleChange(event)} variant="outlined" label="Cliente" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '130px' }} name="cpf" value={selectedRequest.cpf} onChange={(event) => handleChange(event)} variant="outlined" label="CPF" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '130px' }} name="phoneNumber" value={selectedRequest.phoneNumber} onChange={(event) => handleChange(event)} variant="outlined" label="Telefone" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '120px' }} name="entryDate" value={selectedRequest.entryDate} onChange={(event) => handleChange(event)} variant="outlined" label="Data entrada" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '120px' }} name="returnDate" value={selectedRequest.returnDate} onChange={(event) => handleChange(event)} variant="outlined" label="Data retorno" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '100px' }} name="batteryModel" value={selectedRequest.batteryModel} onChange={(event) => handleChange(event)} variant="outlined" label="Modelo bateria" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '100px' }} name="batteryCode" value={selectedRequest.batteryCode} onChange={(event) => handleChange(event)} variant="outlined" label="Código bateria" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '100px' }} name="loanBatteryModel" value={selectedRequest.loanBatteryModel} onChange={(event) => handleChange(event)} variant="outlined" label="Bateria empréstimo" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '100px' }} name="loanBatteryCode" value={selectedRequest.loanBatteryCode} onChange={(event) => handleChange(event)} variant="outlined" label="Código bateria empréstimo" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField sx={{ width: '120px' }} name="status" value={selectedRequest.status} onChange={(event) => handleChange(event)} variant="outlined" label="Status" size="small" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={handleSave}><SaveIcon /></Button>
                                                    </TableCell>

                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>{selectedRequest.request}</TableCell>
                                                    <TableCell>{selectedRequest.clientName}</TableCell>
                                                    <TableCell>{selectedRequest.cpf}</TableCell>
                                                    <TableCell>{selectedRequest.phoneNumber}</TableCell>
                                                    <TableCell>{selectedRequest.entryDate}</TableCell>
                                                    <TableCell>{selectedRequest.returnDate}</TableCell>
                                                    <TableCell>{selectedRequest.batteryModel}</TableCell>
                                                    <TableCell>{selectedRequest.batteryCode}</TableCell>
                                                    <TableCell>{selectedRequest.loanBatteryModel}</TableCell>
                                                    <TableCell>{selectedRequest.loanBatteryCode}</TableCell>
                                                    <TableCell>{selectedRequest.status}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => setEditEnabled(true)}><EditIcon /></Button>
                                                    </TableCell>
                                                </>
                                            )
                                            }
                                            <TableCell>
                                                <Button onClick={handleOpenModalDelete}><DeleteIcon /></Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : ''
                    )}
            {openModalConfirmDelete
                ?
                <ModalConfirmAction
                    alertDialogTitle="Confime a requisição para excluir"
                    alertDialogDescription={<li>{selectedRequest.request}</li>}
                    onClickConfirm={handleDelete}
                    onClickCancel={() => setOpenModalConfirmDelete(false)}
                />
                :
                ''
            }
        </Box>
    )
}