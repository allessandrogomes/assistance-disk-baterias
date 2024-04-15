import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ModalConfirmAction({ alertDialogTitle, alertDialogDescription, onClickCancel, onClickConfirm }) {
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alertDialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {alertDialogDescription}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => onClickCancel(e)}>Cancelar</Button>
                <Button onClick={(e) => onClickConfirm(e)} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
