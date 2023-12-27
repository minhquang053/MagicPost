import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Grid } from '@mui/material'

// rotas
import { useNavigate } from 'react-router-dom';


function Search() {
    const navigate = useNavigate();
    const itemList = {
        text: "Info",
        to: "/info"
    };
    const [orderId, setorderId] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setorderId(event.target.value);
      };

    const handleSubmit = async (event) => {
        //navigate(itemList.to);
        event.preventDefault();
        try {
            if (event) {
                event.preventDefault();
              }
              
            if (orderId) {
                
                const response = await axios.get(`https://magic-post-7ed53u57vq-de.a.run.app/v1/tracking/${orderId}`);
              
            // Handle the response as needed
            setResponseData(response.data);
            setError(null); // Reset error on successful response
            }

          } catch (error) {
            // Handle errors
            setError('HTTP Request: Failed 404. No such shipment code exists');
            console.error('Error submitting data:', error);
          }
    };

    // Log responseData whenever it changes
    useEffect(() => {
        // Check if response has data
        if (responseData) {
          const { order, transfers } = responseData;
    
          // Log or use the data as needed
          console.log('Order ID:', order.orderId);
          console.log('Transfers:', transfers);
    
          // Navigate to the new path with order and transfers as props
          navigate(itemList.to, { state: { order, transfers } });
        } else if(error){
            // Navigate to the new path with error message
            navigate(itemList.to, { state: { error } });
        }
      }, [responseData, error, navigate, itemList.to]);

  return (
    <Grid
        container spacing={2}
        alignItems="center" 
        justifyContent="center"
        component="form" 
        noValidate 

        sx={{ 
            mt: 1,
            py: 2
            }}>

        <Grid item>
            <TextField
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    size='medium'
                    style={{ width: '300px', marginBottom: '8px' }}
                    id="tracking"
                    label="Shipment tracking"
                    name="tracking"
                    value={orderId} //Very IMPORTANT !!!
                    autoComplete="tracking"
                    autoFocus
            />  
        </Grid>
                
        <Grid item> 
            <Button 
                onClick={handleSubmit}
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
