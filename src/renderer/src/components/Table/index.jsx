import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const columns = [
    { field: 'request', headerName: 'Nº Requisição', width: 60 },
    { field: 'clientName', headerName: 'Cliente', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 110 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 110 },
    { field: 'entryDate', headerName: 'Data entrada', width: 120 },
    { field: 'returnDate', headerName: 'Data retorno', width: 120 },
    { field: 'batteryModel', headerName: 'Modelo bateria', width: 130 },
    { field: 'batteryCode', headerName: 'Código bateria', width: 130 },
    { field: 'loanBatteryModel', headerName: 'Bateria empréstimo', width: 190 },
    { field: 'loanBatteryCode', headerName: 'Código empréstimo', width: 190 },
    { field: 'daysOfDelay', headerName: 'Dias de atraso', width: 120 },
    { field: 'numberOfTimesReturned', headerName: 'Retornos', width: 80 },
    { field: 'status', headerName: 'Status', width: 100 },
]

const initialFilters = [
    {
        field: 'status',
        operator: 'isAnyOf',
        value: ['pendente', 'emprestada']
    }
]


export default function DataTable() {

    const requests = useSelector(state => state.requests)

    return (
        <div style={{ height: '70vh', width: '95vw' }}>
            <DataGrid
                getRowId={(row) => row.id}
                sx={{ color: '#EEEEEE', backgroundColor: '#31363F' }}
                rows={requests}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 8 },
                    },
                    sorting: {
                        sortModel: [{ field: 'request', sort: 'desc' }]
                    },
                    filter: {
                        filterModel: {
                            items: initialFilters
                        }
                    }
                }}
                pageSizeOptions={[5, 8]}
            />
        </div>
    );
}