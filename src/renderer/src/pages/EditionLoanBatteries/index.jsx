import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeLoanBatteries, updateLoanBatteries } from "../../store/reducers/loanBatteries"
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import FilteringField from "../../components/FilteringField";
import ModalConfirmAction from "../../components/ModalConfirmAction";


export default function EditionLoanBatteries() {

    const loanBatteries = useSelector(state => state.loanBatteries)

    const dispatch = useDispatch()

    const [dataRenderer, setDataRenderer] = useState(loanBatteries.map(item => ({ ...item })))

    const [editedDataList, setEditedDataList] = useState(loanBatteries.map(item => ({ ...item })))
    const [editIndex, setEditIndex] = useState(-1)

    const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false)
    const [itemListToDelete, setItemListToDelete] = useState()

    const [filterValue, setFilterValue] = useState('')

    const handleEdit = (index) => {
        setEditIndex(index)
    }

    const handleSave = (index) => {
        const newDataList = editedDataList.map((item, i) => (i === index ? item : loanBatteries[i]))
        dispatch(updateLoanBatteries(newDataList))
        setEditIndex(-1)
    }

    const handleOpenModalDelete = (item) => {
        setOpenModalConfirmDelete(true)
        setItemListToDelete(item)
    }

    const handleDelete = (item) => {
        dispatch(removeLoanBatteries(item))
        const updatedDataList = editedDataList.filter(loanBattery => loanBattery.batteryCode !== item.batteryCode)
        setEditedDataList(updatedDataList)
        setDataRenderer(updatedDataList)
        setOpenModalConfirmDelete(false)
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target

        const updatedDataList = editedDataList.map((item, i) => (i === index ? { ...item, [name]: value } : item))
        setEditedDataList(updatedDataList)
        setDataRenderer(updatedDataList)
    }

    useEffect(() => {

        if (filterValue.length > 0) {
            let filteredLoanBatteries = editedDataList.filter(item => {
                const stringBatteryCode = item.batteryCode.toString().toLowerCase()
                return stringBatteryCode.includes(filterValue.toLowerCase())
            })
            setDataRenderer(filteredLoanBatteries)
        } else {
            setDataRenderer(editedDataList)
        }

    }, [filterValue])

    return (
        <Box sx={{ minHeight: '45vh', maxWidth: '95vw' }}>
            <FilteringField inputLabelFilterBy="código da bateria" onChangeValue={(value) => setFilterValue(value)} inputValue={filterValue}/>
            <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'white', }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Modelo bateria</TableCell>
                            <TableCell>Código bateria</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataRenderer.map((item, index) => {
                            return <TableRow key={index}>
                                {editIndex === index ? (
                                    <>
                                        <TableCell>
                                            <TextField name="batteryModel" value={item.batteryModel} onChange={(event) => handleChange(event, index)} variant="outlined" label="Modelo bateria" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="batteryCode" value={item.batteryCode} onChange={(event) => handleChange(event, index)} variant="outlined" label="Código bateria" size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleSave(index)}><SaveIcon /></Button>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{item.batteryModel}</TableCell>
                                        <TableCell>{item.batteryCode}</TableCell>
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
            {openModalConfirmDelete ?
                <ModalConfirmAction
                    alertDialogTitle="Confime a bateria para excluir"
                    alertDialogDescription={<li>{itemListToDelete.batteryModel} {itemListToDelete.batteryCode}</li>}
                    onClickConfirm={() => handleDelete(itemListToDelete)}
                    onClickCancel={() => setOpenModalConfirmDelete(false)}
                /> :
                ''
            }
        </Box>
    )
}