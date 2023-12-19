// pages/transfers/create_transfer.js
import Head from 'next/head';
import { Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreateTransferForm from 'src/sections/transfer/create_transfer/create_transfer_form'; // Adjust the path accordingly

const Page = () => (
  <>
    <Head>
      <title>Tạo vận chuyển| Magic Post</title>
    </Head>

    <Container>
      <CreateTransferForm />

      {/* Add additional components or display form results here */}
    </Container>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;