// tried out another (less complicated?) way to do the traininglist 
// but wasn't as successful as the original one
// i'm still keeping it for now just in case i'll come back to it 

/*
import React, { useState, useEffect } from 'react';
import { API_URL } from '../constant';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';

function Traininglist2() {

    const [trainings, setTrainings] = useState([]);

    //for the snackbar
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const [columnDefs] = useState([
        {field: 'date', headerName: 'Date & Time', sortable: true, filter:true, width:250},
        {field: 'duration', headerName: 'Duration (min)', sortable: true, filter:true, width:200},
        {field: 'activity', headerName: 'Activity', sortable: true, filter:true, width: 200},
        {field: 'customer', headerName: 'Customer', sortable: true, filter:true, width: 200},
        { field: 'delete', headerName: 'Delete', width: 75, sortable: false, filter: false,
            renderCell: (params) => {
                return (
                    
                    <Button 
                        size='small' 
                        onClick={() => deleteTraining(params)}>
                        <DeleteIcon color="error" />
                    </Button>
                    
                );
        }}
    ]);

    useEffect( () => {
        const fetchData = async () => {
            const data = await fetch(API_URL + 'api/trainings')

            // convert the data to json
            const json = await data.json()

            const content = await json.content

            for (let i = 0; i < content.length; i += 1) {
                //format date in each training
                content[i].date = await dayjs(content[i].date).format('DD.MM.YYYY - hh:mm')


                //set customer for each training
                let cust = await fetchCustomer(content[i].links[2].href)

                //create training object and set it to trainings
                setTrainings(trainings => [...trainings, {
                    date: content[i].date,
                    duration: content[i].duration,
                    activity: content[i].activity,
                    customer: cust,
                    links: content[i].links
                }])

            }

            // set state with the result
            setTrainings(content);
          }
        
          // call the function
          fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    const fetchCustomer = async (link) => {
        const data = await fetch(link)
        const json = await data.json()
        if (json.firstname === undefined) {
            return '';
        } else {
            return json.firstname + ' ' + json.lastname
        }
    }


    const getTrainings = () => {
        const fetchData = async () => {
            const data = await fetch(API_URL + 'api/trainings')

            // convert the data to json
            const json = await data.json()

            const content = await json.content

            for (let i = 0; i < content.length; i += 1) {
                //format date in each training
                content[i].date = dayjs(content[i].date).format('DD.MM.YYYY - hh:mm')


                //set customer for each training
                let cust = await fetchCustomer(content[i].links[2].href)

                //create training object and set it to trainings
                setTrainings(trainings => [...trainings, {
                    date: content[i].date,
                    duration: content[i].duration,
                    activity: content[i].activity,
                    customer: cust,
                    links: content[i].links
                }])

            }

            // set state with the result
            setTrainings(content);
          }
        
          // call the function
          fetchData()
            // make sure to catch any error
            .catch(console.error);
    }

    // delete selected training 
    const deleteTraining = (params) => {
        if (window.confirm("Do you want to delete training?")){
            fetch(params.id, { method: 'DELETE' })
            .then(response => {
                if (response.ok){
                    setMsg('Deleted successfully')
                    setOpen(true);
                    getTrainings();
                } else {
                    alert('Something went wrong in deletion');
                }
            })
            .catch(err => console.log(err));
        }   
    }

    return (
        <div>
            <h2>Training List</h2>

            <div style={{ height: 475, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.links[0].href}
                    rows={trainings}
                    columns={columnDefs}
                    slots={{
                        toolbar: TrainingToolbar
                    }}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    getRowSpacing={params => ({
                        top:params.isFirstVisible ? 0 : 5,
                        bottom:params.isLastVisible ? 0 : 5

                    })}
                />
            </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </div>
    );
}

function TrainingToolbar() {

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
}

export default Traininglist2;
*/