import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import { API_URL } from '../constant';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: '',
    duration: '',
    activity: '',
    customer: ''
  });
  const [dateObject, setDateObject] = React.useState([]);

  const handleClickOpen = () => {
    setTraining({...training, customer: props.params.links[0].href})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //save the training 
    const handleSave = () => {
        props.addedTraining(training, API_URL + 'api/trainings');  
        setOpen(false);
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: ''
        });
    }

    const changeDate = (newDate) => {
        setDateObject(newDate.toISOString());
        setTraining({...training, date:newDate});
    }

    return (
        <div>
        <Button onClick={handleClickOpen}>
            <AddIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Training</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    label="Date & Time"
                    value={dateObject}
                    onChange={date => changeDate(date)}
                    format="DD.MM.YYYY hh:mm"
                />
                </LocalizationProvider>
                <TextField
                    value = {training.duration}
                    onChange = {e => setTraining({...training, duration: e.target.value})}
                    margin="dense"
                    label="Duration (min)"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    value = {training.activity}
                    onChange = {e => setTraining({...training, activity: e.target.value})}
                    margin="dense"
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
  );
}