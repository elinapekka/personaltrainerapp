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

function Traininglist() {

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
        fetch(API_URL + 'api/trainings')
        .then(response => {
            if (response.ok){
                return response.json()
            } else{
                alert('Something went wrong in GET request')
            }       
        })
        .then(dataResponse => {
            
            let content = dataResponse.content
          
            for(let i = 0; i < content.length; i += 1) {

                content[i].date = dayjs(content[i].date).format('DD.MM.YYYY - hh:mm')

                fetch(content[i].links[2].href)
                .then(response => {
                    if (response.ok){
                        return response.json()
                    } else{
                        console.log('not success')
                    }       
                })
                .then(dataResponse => {
                    let cust = ''
                    if (dataResponse.firstname !== undefined){
                        cust = dataResponse.firstname + ' ' + dataResponse.lastname
                    } 
                    setTrainings(trainings => [...trainings, {
                        date: content[i].date,
                        duration: content[i].duration,
                        activity: content[i].activity,
                        customer: cust,
                        links: content[i].links
                    }])
                })

            }
        })
        .catch(err => console.log(err))
    }, []);


    const getTrainings = () => {
        fetch(API_URL + 'api/trainings')
        .then(response => {
            if (response.ok){
                return response.json()
            } else{
                alert('Something went wrong in GET request')
            }       
        })
        .then(dataResponse => {
            setTrainings([])
        
            let content = dataResponse.content

            for(let i = 0; i < content.length; i += 1) {
                content[i].date = dayjs(content[i].date).format('DD.MM.YYYY - hh:mm')

                fetch(content[i].links[2].href)
                .then(response => {
                    if (response.ok){
                        return response.json()
                    } else{
                        console.log('problem with fetching the customer')
                    }       
                })
                .then(dataResponse => {
                    let cust = ''
                    if (dataResponse.firstname !== undefined){
                        cust = dataResponse.firstname + ' ' + dataResponse.lastname
                    } 

                    setTrainings(trainings => [...trainings, {
                        date: content[i].date,
                        duration: content[i].duration,
                        activity: content[i].activity,
                        customer: cust,
                        links: content[i].links
                    }])
                })

            }
        })
        .catch(err => console.log(err))
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

export default Traininglist;