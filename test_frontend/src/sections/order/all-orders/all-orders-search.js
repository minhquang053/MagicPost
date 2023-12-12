import React, { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  TextField,
  Stack,
  MenuItem,
  Button,
} from '@mui/material';

export const AllOrdersSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStart, setSelectedStart] = useState('');
  const [selectedEnd, setSelectedEnd] = useState('');

  const handleSearch = () => {
    // Perform your search logic here
    // You can use onSearch callback to pass the search criteria to the parent component
    onSearch({
      searchTerm,
      selectedStart,
      selectedEnd,
    });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <OutlinedInput
          fullWidth
          placeholder="Nhập mã đơn hàng"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{ maxWidth: 500 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <TextField
            select
            label="Điểm gửi hàng"
            value={selectedStart}
            onChange={(e) => setSelectedStart(e.target.value)}
            sx={{ minWidth: 150 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {/* Add your role options here */}
            <MenuItem value="">- All roles -</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Processor">Processor</MenuItem>
            <MenuItem value="Shipper">Shipper</MenuItem>
          </TextField>
          <TextField
            select
            label="Điểm giao hàng"
            value={selectedEnd}
            onChange={(e) => setSelectedEnd(e.target.value)}
            sx={{ minWidth: 150 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {/* Add your location options here */}
            <MenuItem value="">- All locations -</MenuItem>
            <MenuItem value="test">test</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleSearch}
            sx={{ minWidth: 120 }}
          >
            Tìm kiếm
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};