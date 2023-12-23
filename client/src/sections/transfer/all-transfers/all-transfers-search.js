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
  useMediaQuery,
} from '@mui/material';

export const AllTransfersSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFrom, setSelectedStart] = useState('');
  const [selectedTo, setSelectedEnd] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const locations = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39", "A40", "A41", "A42", "A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51", "A52", "A53", "A54", "A55", "A56", "A57", "A58", "A59", "A60", "A61", "A62", "A63",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"
  ]

  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const handleSearch = () => {
    onSearch({
      searchTerm,
      selectedFrom,
      selectedTo,
      selectedStatus,
    });
  };

  return (
    <Card sx={{ p: 2 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between', // Added for alignment on larger screens
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Nhập mã vận chuyển/đơn hàng"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{
            width: isSmallScreen ? '100%' : 'calc(50% - 4px)', // Adjusted width for larger screens
            marginBottom: isSmallScreen ? '8px' : '0px',
            marginRight: isSmallScreen ? '0px' : '8px',
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: '8px',
          }}
        >
          <TextField
            select
            label="Điểm vận chuyển"
            value={selectedFrom}
            onChange={(e) => setSelectedStart(e.target.value)}
            sx={{ minWidth: 165, marginBottom: isSmallScreen ? '8px' : '0px', marginTop: isSmallScreen ? '8px' : '0px' }}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            <MenuItem key="" value="">- Tất cả -</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))} 
          </TextField>
          <TextField
            select
            label="Điểm nhận hàng"
            value={selectedTo}
            onChange={(e) => setSelectedEnd(e.target.value)}
            sx={{ minWidth: 160, marginBottom: isSmallScreen ? '8px' : '0px' }}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            <MenuItem key="" value="">- Tất cả -</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))} 
          </TextField>
          <TextField
            select
            label="Trạng thái"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{ minWidth: 114, marginBottom: isSmallScreen ? '8px' : '0px' }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="">- Tất cả -</MenuItem>
            <MenuItem value="transferring">Đang vận chuyển</MenuItem>
            <MenuItem value="done">Đã hoàn thành</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              minWidth: isSmallScreen ? '100%' : '120px',
              marginTop: isSmallScreen ? '8px' : '0px',
            }}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </Card>
  );
};