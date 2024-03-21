import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'clientName', headerName: 'Nome do cliente', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 110 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 110 },
    { field: 'entryDate', headerName: 'Data de entrada', width: 120 },
    { field: 'returnDate', headerName: 'Data de retorno', width: 120 },
    { field: 'batteryModel', headerName: 'Modelo da bateria', width: 130 },
    { field: 'batteryCode', headerName: 'Código da bateria', width: 130 },
    { field: 'loanBatteryModel', headerName: 'Modelo bateria empréstimo', width: 190 },
    { field: 'loanBatteryCode', headerName: 'Código bateria empréstimo', width: 190 },
];

const rows = [
    {
        id: 1,
        clientName: 'Bento Martin Diogo da Luz',
        cpf: '11513542010',
        phoneNumber: '98985420704',
        entryDate: '10/02/2024',
        returnDate: '11/02/2024',
        batteryModel: 'M60GD',
        batteryCode: 'A2-0456',
        loanBatteryModel: 'Z60D',
        loanBatteryCode: 'B2-9843'
    },
    {
        id: 2,
        clientName: "Ana Júlia Barros",
        cpf: "19825437029",
        phoneNumber: "96981234785",
        entryDate: "12/03/2024",
        returnDate: "15/03/2024",
        batteryModel: "M60GD",
        batteryCode: "A3-0789",
        loanBatteryModel: "Z60D",
        loanBatteryCode: "B3-1123"
    },
    {
        id: 3,
        clientName: "Tiago Gomes Oliveira",
        cpf: "23598745632",
        phoneNumber: "91987654321",
        entryDate: "20/03/2024",
        returnDate: "22/03/2024",
        batteryModel: "S45GT",
        batteryCode: "A4-0921",
        loanBatteryModel: "X40F",
        loanBatteryCode: "C1-3456"
    },
    {
        id: 4,
        clientName: "Luciana Andrade Souza",
        cpf: "14725836914",
        phoneNumber: "98987612345",
        entryDate: "25/03/2024",
        returnDate: "27/03/2024",
        batteryModel: "R50QV",
        batteryCode: "D5-6789",
        loanBatteryModel: "W50E",
        loanBatteryCode: "E2-1234"
    },
    {
        id: 5,
        clientName: "Marcos Antônio Queiroz",
        cpf: "15935748620",
        phoneNumber: "96981234567",
        entryDate: "01/04/2024",
        returnDate: "03/04/2024",
        batteryModel: "T55HU",
        batteryCode: "F6-4567",
        loanBatteryModel: "Y55T",
        loanBatteryCode: "G4-8910"
    },
    {
        id: 6,
        clientName: "Carla dos Santos Pereira",
        cpf: "26481907356",
        phoneNumber: "97982345678",
        entryDate: "05/04/2024",
        returnDate: "07/04/2024",
        batteryModel: "U60JK",
        batteryCode: "H7-2345",
        loanBatteryModel: "V60B",
        loanBatteryCode: "I5-6789"
    },
    {
        id: 7,
        clientName: "Roberto Silva e Silva",
        cpf: "37419528647",
        phoneNumber: "95983456789",
        entryDate: "10/04/2024",
        returnDate: "12/04/2024",
        batteryModel: "V65KL",
        batteryCode: "J8-3456",
        loanBatteryModel: "U65M",
        loanBatteryCode: "K6-7890"
    },
    {
        id: 8,
        clientName: "Fernanda Lima Rocha",
        cpf: "48276019385",
        phoneNumber: "94984567890",
        entryDate: "15/04/2024",
        returnDate: "17/04/2024",
        batteryModel: "W70NM",
        batteryCode: "L9-4567",
        loanBatteryModel: "T70S",
        loanBatteryCode: "M7-0123"
    },
    {
        id: 9,
        clientName: "Gustavo Henrique Farias",
        cpf: "59168240796",
        phoneNumber: "93985678901",
        entryDate: "20/04/2024",
        returnDate: "22/04/2024",
        batteryModel: "X75OP",
        batteryCode: "N0-5678",
        loanBatteryModel: "S75V",
        loanBatteryCode: "O8-3456"
    },
    {
        id: 10,
        clientName: "Lívia Moura Gonçalves",
        cpf: "61039485721",
        phoneNumber: "92986789012",
        entryDate: "25/04/2024",
        returnDate: "27/04/2024",
        batteryModel: "Y80QR",
        batteryCode: "P1-6789",
        loanBatteryModel: "R80W",
        loanBatteryCode: "Q9-0123"
    }

];

export default function DataTable() {
    return (
        <div style={{ height: '70vh', width: '95vw' }}>
            <DataGrid
                sx={{ color: '#EEEEEE', backgroundColor: '#31363F' }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 8 },
                    },
                }}
                pageSizeOptions={[5, 8]}
                checkboxSelection
            />
        </div>
    );
}