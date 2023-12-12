import React from 'react'
import { TextField, Button, Grid } from '@mui/material'

function Search() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            tracking: data.get('tracking'),
        });
    }

  return (
    <Grid
        container spacing={2}
        alignItems="center" 
        justifyContent="center"
        component="form" 
        noValidate 
        onSubmit={handleSubmit} 
        sx={{ 
            mt: 1,
            py: 2
            }}>

        <Grid item>
            <TextField
                    margin="normal"
                    required
                    size='medium'
                    style={{ width: '300px', marginBottom: '8px' }}
                    id="tracking"
                    label="Shipment tracking"
                    name="tracking"
                    autoComplete="tracking"
                    autoFocus
            />  
        </Grid>
                
        <Grid item>
            <Button 
                variant='contained'
                sx={{
                    mr: 2,
                    px: 4, 
                    py: 1,
                    fontSize: '0.9rem',
                    textTransform: 'capitalize',
                    borderRadius: 0,
                    borderColor: '#14192d',
                    color: '#fff',
                    backgroundColor: '#14192d',
                    "&&:hover": {
                        backgroundColor: "#343a55"
                    },
                    "&&:focus": {
                        backgroundColor: "#343a55"
                    }
                }}
                >
                    Search
            </Button> 
        </Grid>
                
    </Grid>
        
  )
}

export default Search
