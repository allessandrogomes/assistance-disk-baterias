import { Box, Button, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import { removeData, updateData } from "../../store/reducers/requests";
import FilteringField from "../../components/FilteringField";
import ModalConfirmAction from "../../components/ModalConfirmAction";


export default function EditionRequests() {

    const requests = useSelector(state => state.requests)

    const dispatch = useDispatch()

    const [dataRenderer, setDataRenderer] = useState(requests.map(item => ({ ...item })))

    const [editedDataList, setEditedDataList] = useState(requests.map(item => ({ ...item })))
    const [editIndex, setEditIndex] = useState(-1)

    const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false)
    const [itemListToDelete, setItemListToDelete] = useState()

    const [filterValue, setFilterValue] = useState('')

    const [page, setPage] = useState(1)
    const requestsPerPage = 10
    const count = Math.ceil(dataRenderer.length / requestsPerPage)
    const indexOfLastRequest = page * requestsPerPage
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage
    const currentRequests = dataRenderer.slice(indexOfFirstRequest, indexOfLastRequest)

    const handleChangePage = (event, value) => {
        setPage(value)
    }

    const handleEdit = (index) => {
        setEditIndex(index)
    }

    const handleSave = (index) => {
        const newDataList = editedDataList.map((item, i) => (i === index ? item : requests[i]))
        dispatch(updateData(newDataList))
        window.bridgeRequests.saveDataRequests(newDataList)
        setEditIndex(-1)
    }
    const handleOpenModalDelete = (item) => {
        setOpenModalConfirmDelete(true)
        setItemListToDelete(item)
    }

    const handleDelete = (item) => {
        dispatch(removeData(item))
        const updatedDataList = editedDataList.filter(request => request.batteryCode !== item.batteryCode)
        setEditedDataList(updatedDataList)
        setDataRenderer(updatedDataList)
        setOpenModalConfirmDelete(false)
        window.bridgeRequests.saveDataRequests(updatedDataList)
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target

        const updatedDataList = editedDataList.map((item, i) => (i === index ? { ...item, [name]: value } : item))
        setEditedDataList(updatedDataList)
        setDataRenderer(updatedDataList)
    }

    useEffect(() => {

        if (filterValue.length > 0) {
            let filteredRequests = editedDataList.filter(item => {
                const stringRequestNumber = item.request.toString().toLowerCase()
                return stringRequestNumber.includes(filterValue.toLowerCase())
            })
            setDataRenderer(filteredRequests)
        } else {
            setDataRenderer(editedDataList)
        }

    }, [filterValue])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '45vh', maxWidth: '95vw' }}>
            <FilteringField inputLabelFilterBy="número da requisição" onChangeValue={(value) => setFilterValue(value)} inputValue={filterValue} />
            <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'white', }}>
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
                        {currentRequests.map((item, index) => {
                            return <TableRow key={index}>
                                {editIndex === index ? (
                                    <>
                                        <TableCell>
                                            <TextField name="request" value={item.request} onChange={(event) => handleChange(event, index)} variant="outlined" label="N° Requisição" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="clientName" value={item.clientName} onChange={(event) => handleChange(event, index)} variant="outlined" label="Cliente" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="cpf" value={item.cpf} onChange={(event) => handleChange(event, index)} variant="outlined" label="CPF" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="phoneNumber" value={item.phoneNumber} onChange={(event) => handleChange(event, index)} variant="outlined" label="Telefone" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="entryDate" value={item.entryDate} onChange={(event) => handleChange(event, index)} variant="outlined" label="Data entrada" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="returnDate" value={item.returnDate} onChange={(event) => handleChange(event, index)} variant="outlined" label="Data retorno" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="batteryModel" value={item.batteryModel} onChange={(event) => handleChange(event, index)} variant="outlined" label="Modelo bateria" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="batteryCode" value={item.batteryCode} onChange={(event) => handleChange(event, index)} variant="outlined" label="Código bateria" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="loanBatteryModel" value={item.loanBatteryModel} onChange={(event) => handleChange(event, index)} variant="outlined" label="Bateria empréstimo" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="loanBatteryCode" value={item.loanBatteryCode} onChange={(event) => handleChange(event, index)} variant="outlined" label="Código bateria empréstimo" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleSave(index)}><SaveIcon /></Button>
                                        </TableCell>

                                    </>
                                ) : (
                                    <>
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
                                        <TableCell>
                                            <Button onClick={() => handleEdit(index)}><EditIcon /></Button>
                                        </TableCell>
                                    </>
                                )
                                }
                                <TableCell>
                                    <Button onClick={() => handleOpenModalDelete(item)}><DeleteIcon /></Button>
                                </TableCell>
                            </TableRow>
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} sx={{ alignSelf: 'end', marginTop: '10px' }}>
                <Pagination 
                page={page} 
                onChange={handleChangePage} 
                color="primary" 
                count={count} 
                sx={{ 
                    '.MuiPaginationItem-page': {color: '#FFF'},
                    '.MuiPaginationItem-previousNext': {color: '#FFF'},
                    '.MuiPaginationItem-ellipsis': {color: '#FFF'}
                }}
            />
            </Stack>
            {openModalConfirmDelete ?
                <ModalConfirmAction
                    alertDialogTitle="Confime a requisição para excluir"
                    alertDialogDescription={<li>{itemListToDelete.request}</li>}
                    onClickConfirm={() => handleDelete(itemListToDelete)}
                    onClickCancel={() => setOpenModalConfirmDelete(false)}
                /> :
                ''
            }
        </Box>
    )
}