import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const columns = [
    { field: 'request', headerName: 'Requisição', width: 60 },
    { field: 'clientName', headerName: 'Nome do cliente', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 110 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 110 },
    { field: 'entryDate', headerName: 'Data de entrada', width: 120 },
    { field: 'returnDate', headerName: 'Data de retorno', width: 120 },
    { field: 'batteryModel', headerName: 'Modelo da bateria', width: 130 },
    { field: 'batteryCode', headerName: 'Código da bateria', width: 130 },
    { field: 'loanBatteryModel', headerName: 'Modelo bateria empréstimo', width: 190 },
    { field: 'loanBatteryCode', headerName: 'Código bateria empréstimo', width: 190 },
]

export default function DataTable() {

    const requests = useSelector(state => state.requests)

    return (
        <div style={{ height: '70vh', width: '95vw' }}>
            <DataGrid
                getRowId={(row) => row.batteryCode}
                sx={{ color: '#EEEEEE', backgroundColor: '#31363F' }}
                rows={requests}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 8 },
                    },
                    sorting: {
                        sortModel: [{field: 'request', sort: 'desc'}]
                    }
                }}
                pageSizeOptions={[5, 8]}
            />
        </div>
    );
}