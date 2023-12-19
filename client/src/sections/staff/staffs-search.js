// staffs-search.js
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

export const StaffsSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39", "A40", "A41", "A42", "A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51", "A52", "A53", "A54", "A55", "A56", "A57", "A58", "A59", "A60", "A61", "A62", "A63",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"
  ]

  const handleSearch = () => {
    // Perform your search logic here
    // You can use onSearch callback to pass the search criteria to the parent component
    onSearch({
      searchTerm,
      selectedRole,
      selectedLocation,
    });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <OutlinedInput
          fullWidth
          placeholder="Nhập tên hoặc email của nhân viên"
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
            label="Vai trò"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            sx={{ minWidth: 150 }}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            {/* Add your role options here */}
            <MenuItem value="">- Tất cả -</MenuItem>
            <MenuItem value="Manager">Trưởng điểm</MenuItem>
            <MenuItem value="Transactor">Giao dịch viên</MenuItem>
            <MenuItem value="Processor">Nhân viên</MenuItem>
          </TextField>
          <TextField
            select
            label="Điểm làm việc"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            sx={{ minWidth: 150 }}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            <MenuItem value="">- Tất cả -</MenuItem>
            {locations.map((location) => (
              <MenuItem value={location}>
                {location}
              </MenuItem>
            ))} 
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
