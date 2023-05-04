import React, { useState, useEffect } from 'react';
import { API_URL } from '../constant';
import Snackbar from '@mui/material/Snackbar';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid} from '@mui/x-data-grid';

import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


function Customerlist() {
    const [customers, setCustomers] = useState([]);

    //for the snackbar
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    //column definitions
    const [columnDefs] = useState([
        { field: 'addtraining', headerName: 'Training', width: 75, sortable: false, filter: false,
            renderCell: (params) => {
                return (
                    <AddTraining params={params.row} addedTraining={addTraining} />
                );
        }}, 
        {field: 'firstname', headerName: 'First Name', sortable: true, filter:true, width:125},
        {field: 'lastname', headerName: 'Lastname', sortable: true, filter:true, width:125},
        {field: 'streetaddress', headerName: 'Address', sortable: true, filter:true, width:125},
        {field: 'postcode', headerName: 'Postcode', sortable: true, filter:true, width:125},
        {field: 'city', headerName: 'City', sortable: true, filter:true, width:125},
        {field: 'email', headerName: 'Email', sortable: true, filter:true, width:150},
        {field: 'phone', headerName: 'Phone', sortable: true, filter:true, width:150},
        { field: 'edit', headerName: 'Edit', width: 75, sortable: false, filter: false, 
            renderCell: (params) => {
                return (
                    <EditCustomer params={params.row} updatedCustomer={updateCustomer}/>
                );
        }}, 
        { field: 'delete', headerName: 'Delete', width: 75, sortable: false, filter: false,
            renderCell: (params) => {
                return (
                    
                    <Button 
                        size='small' 
                        onClick={() => deleteCustomer(params)}>
                        <DeleteIcon color="error" />
                    </Button>
                    
                );
        }}
    ]
    )


    //fetch customers
    useEffect(() => {
        fetch(API_URL + 'api/customers')
        .then(response => {
            if (response.ok){
                return response.json()
            } else{
                alert('Something went wrong in GET request when fetching customers')
            }       
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    }, []);


    //fetch customers on command
    const getCustomers = () => {
        fetch(API_URL + 'api/customers')
        .then(response => {
            if (response.ok){
                return response.json()
            } else{
                alert('Something went wrong in GET request when fetching customers')
            }       
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    }

    //for the edit customer button
    const updateCustomer = (updatedCustomer, url) => {
        fetch(url, { 
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok){
                setMsg('Edited successfully');
                setOpen(true);
                getCustomers();
            } else {
                alert('Something when wrong when editing a customer.');
            }
        })
        .catch(err => console.log(err));
    }   

    const addCustomer = (customer) => {
        fetch(API_URL + 'api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer) 
        })
        .then(response => {
            if (response.ok) {
                setMsg('Added successfully');
                setOpen(true);
                getCustomers();
            } else {
                alert('Something went wrong when adding a customer: ' + response.statusText);
            }
        })
        .catch(err => console.error(err))
    };

    const deleteCustomer = (params) => {
        console.log(params)
        if (window.confirm("Do you want to delete customer?")){
            fetch(params.id, { method: 'DELETE' })
            .then(response => {
                if (response.ok){
                    setMsg('Deleted successfully')
                    setOpen(true);
                    getCustomers();
                } else {
                    alert('Something went wrong in deletion');
                }
            })
            .catch(err => console.log(err));
        }   
    }

    const addTraining = (training, url) => {
        fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training) 
        })
        .then(response => {
            if (response.ok) {
                setMsg('Training added successfully');
                setOpen(true);
            } else {
                alert('Something went wrong when adding a training: ' + response.statusText);
            }
        })
        .catch(err => console.error(err))
    };

    return (
        <div>
            <h2>Customer List</h2>
            
            <div style={{ height: 475, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.links[0].href}
                    rows={customers}
                    columns={columnDefs}
                    slots={{ toolbar: CustomerToolbar }}
                    slotProps={{ toolbar: { csvOptions: { fields: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'] } } }}
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
            
            <div style={{display: 'flex', justifyContent: 'center', padding: 10}}>
                <AddCustomer addCustomer={addCustomer} />
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



function CustomerToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

export default Customerlist;