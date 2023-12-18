// pages/orders/confirm_order.js
import Head from 'next/head';
import { Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import OrderSearch from 'src/sections/order/shipping-order/orders-search';

const ShippingOrderPage = () => (
  <>
    <Head>
      <title>Giao đơn hàng | Magic Post</title>
    </Head>

    <Container>
      <OrderSearch />

      {/* Add additional components or display search results here */}
    </Container>
  </>
);

ShippingOrderPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ShippingOrderPage;