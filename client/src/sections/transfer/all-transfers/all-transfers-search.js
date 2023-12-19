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

export const AllTransfersSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFrom, setSelectedStart] = useState('');
  const [selectedTo, setSelectedEnd] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

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
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
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
          sx={{ maxWidth: 500 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <TextField
            select
            label="Điểm vận chuyển"
            value={selectedFrom}
            onChange={(e) => setSelectedStart(e.target.value)}
            sx={{ minWidth: 165 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="">- Tất cả -</MenuItem>
            <MenuItem value="test">test</MenuItem>
          </TextField>
          <TextField
            select
            label="Điểm nhận hàng"
            value={selectedTo}
            onChange={(e) => setSelectedEnd(e.target.value)}
            sx={{ minWidth: 160 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="">- Tất cả -</MenuItem>
            <MenuItem value="end">end</MenuItem>
          </TextField>
          <TextField
            select
            label="Trạng thái"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{ minWidth: 114 }}
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