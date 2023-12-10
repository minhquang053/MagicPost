// pages/orders/create_order.js
import Head from 'next/head';
import { Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreateOrderForm from 'src/sections/order/create_order/create-order-form'; // Adjust the path accordingly

const Page = () => (
  <>
    <Head>
      <title>Tạo đơn hàng| Magic Post</title>
    </Head>

    <Container>
      <CreateOrderForm />

      {/* Add additional components or display form results here */}
    </Container>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;