import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewSucceedOrders } from 'src/sections/overview/overview-succeed-orders';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewOrders } from 'src/sections/overview/overview-orders';
import { OverviewFailedOrders } from 'src/sections/overview/overview-failed-orders';
import { OverviewOngoingOrders } from 'src/sections/overview/overview-ongoing-orders';
import { OverviewType } from 'src/sections/overview/overview-type';

const fetchOrderStats = async (location) => {
  const response = await fetch(
    `http://localhost:3030/v1/stats`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    }
  );
  const data = await response.json();
  return data;
}

const Page = () => {
  const [orderStats, setOrderStats] = useState({
    succeed: '',
    failed: '',
    ongoing: '',
    numOrder: [],
    type: {
      document: '',
      goods: '',
    },
    latestOrders: [],
  })
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrderStats('');
      setOrderStats(data);
    };
  
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>
          Tổng quan | MagicPost
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewSucceedOrders
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={`${orderStats?.succeed}`}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewFailedOrders
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={`${orderStats?.failed}`}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewOngoingOrders
                sx={{ height: '100%' }}
                value={`${orderStats?.ongoing}`}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewOrders
                chartSeries={[
                  {
                    name: 'Năm nay',
                    data: orderStats?.numOrder,
                  },
                  {
                    name: 'Năm ngoái',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewType
                chartSeries={[orderStats?.type?.document, orderStats?.type?.goods]}
                labels={['Tài liệu', 'Hàng hóa']}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
            >
              <OverviewLatestOrders
                orders={orderStats?.latestOrders}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
