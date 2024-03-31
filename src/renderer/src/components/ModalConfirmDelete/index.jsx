import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalConfirmDelete({ onClickCancel, onClickDelete }) {
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Deseja realmente excluir?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={(e) => onClickCancel(e)}>Cancelar</Button>
                <Button onClick={(e) => onClickDelete(e)} autoFocus>
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
}
