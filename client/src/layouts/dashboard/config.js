import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon'
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import MapBinIcon from '@heroicons/react/24/solid/MapPinIcon'
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
    )
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
      },
      {
        title: "Xác nhận đơn hàng",
        path: '/orders/confirm_order',
      },
      {
        title: "Giao đơn hàng",
        path: '/orders/shipping_order',
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
      },
      {
        title: "Xác nhận vận chuyển",
        path: '/transfers/confirm_transfer',
      },
      {
        title: "Tra cứu vận chuyển",
        path: '/transfers/search_transfer',
      },
      {
        title: "Tất cả vận chuyển",
        path: '/transfers/all_transfers',
      }
    ]
  },
  {
    title: "Thống kê",
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
      </SvgIcon>
    )
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
