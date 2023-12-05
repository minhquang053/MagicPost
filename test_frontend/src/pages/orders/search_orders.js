// pages/your-page.js
import Head from 'next/head';
import { Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import OrderSearch from 'src/sections/orders/orders-search';

const Page = () => (
  <>
    <Head>
      <title>Tra cuu don hang | Magic Post</title>
    </Head>

    <Container>
      <OrderSearch />

      {/* Add additional components or display search results here */}
    </Container>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;