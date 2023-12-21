import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon'
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import ChartPieIcon from '@heroicons/react/24/solid/ChartPieIcon'
import CliboardDocumentListIcon from '@heroicons/react/24/solid/ClipboardDocumentListIcon'
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Nhân viên',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Thêm nhân viên",
        path: '/staffs/add_staff',
        allowedRoles: ["Admin", "Manager"],
      },
      {
        title: "Tất cả nhân viên",
        path: '/staffs/all_staffs'
      },
    ]
  }, 
  {
    title: 'Đơn hàng',
    icon: (
      <SvgIcon fontSize="small">
        <CliboardDocumentListIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Tạo đơn hàng",
        path: '/orders/create_order',
        allowedRoles: ["Transactor"],
      },
      {
        title: "Xác nhận đơn hàng",
        path: '/orders/confirm_order',
        allowedRoles: ["Transactor"],
      },
      {
        title: "Giao đơn hàng",
        path: '/orders/shipping_order',
        allowedRoles: ["Transactor"],
      },
      {
        title: "Tra cứu đơn hàng",
        path: '/orders/search_order'
      },
      {
        title: "Tất cả đơn hàng",
        path: '/orders/all_orders'
      },
    ]
  },
  {
    title: 'Vận chuyển',
    icon: (
      <SvgIcon fontSize="small">
        <TruckIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: "Tạo vận chuyển",
        path: '/transfers/create_transfer',
        allowedRoles: ["Transactor", "Processor"],
      },
      {
        title: "Xác nhận vận chuyển",
        path: '/transfers/confirm_transfer',
        allowedRoles: ["Transactor", "Processor"],
      },
      {
        title: "Tra cứu vận chuyển",
        path: '/transfers/search_transfer',
      },
      {
        title: "Tất cả vận chuyển",
        path: '/transfers/all_transfers',
      }
    ],
  },
  {
    title: "Thống kê",
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
      </SvgIcon>
    ),
    allowedRoles: ["Admin", "Manager", "Transactor"]
  },
  {
    title: 'Tài khoản',
    icon: (
      <SvgIcon fontSize="small">
        <UserCircleIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: 'Hồ sơ người dùng',
        path: '/account', 
      },
      {
        title: 'Cài đặt',
        path: '/settings',
      },
    ]
  },
  
];
