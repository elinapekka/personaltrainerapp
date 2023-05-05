import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import GetCalendar from './components/GetCalendar';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function App() {

  const [value, setValue] = useState('customers');
  const handleChange = (event, value) => {
    setValue(value);
    };

  return (
    <div className="App">

      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Personal Trainer App</Typography>
        </Toolbar>
      </AppBar>

  
      <Tabs value={value} onChange={handleChange}>
        <Tab value="customers" label="Customers" />
        <Tab value="trainings" label="Trainings" />
        <Tab value="calendar" label="Calendar" />
      </Tabs>
      {value === 'customers' && <Customerlist />}
      {value === 'trainings' && <Traininglist />}
      {value === 'calendar' && <GetCalendar />}

    </div>
  );
}

export default App;
