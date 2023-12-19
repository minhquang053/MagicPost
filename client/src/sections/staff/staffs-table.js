import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const StaffsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const vn_translate = {
    'Manager': "Trưởng điểm",
    'Transactor': 'Giao dịch viên',
    'Processor': 'Nhân viên',
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Họ tên
                </TableCell>
                <TableCell>
                  Tài khoản Email
                </TableCell>
                <TableCell>
                  Vai trò
                </TableCell>
                <TableCell>
                  Điểm làm việc
                </TableCell>
                <TableCell>
                  Số điện thoại
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((staff) => {
                return (
                  <TableRow
                    hover
                    key={staff.id}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={staff.avatar}>
                          {getInitials(staff.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {staff.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {staff.email}
                    </TableCell>
                    <TableCell>
                      {vn_translate[staff.role]}
                    </TableCell>
                    <TableCell>
                      {staff.location}
                    </TableCell>
                    <TableCell>
                      {staff.phone}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

StaffsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
