import { useState, useEffect } from 'react';
import Head from 'next/head';
import { TextField,MenuItem, Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewSucceedOrders } from 'src/sections/overview/overview-succeed-orders';
import { OverviewOrders } from 'src/sections/overview/overview-orders';
import { OverviewFailedOrders } from 'src/sections/overview/overview-failed-orders';
import { OverviewIncomingOrders } from 'src/sections/overview/overview-incoming-orders';
import { OverviewOutgoingOrders } from 'src/sections/overview/overview-outgoing-orders';
import { OverviewType } from 'src/sections/overview/overview-type';
import { useAuth } from 'src/hooks/use-auth';
import { OverviewOngoingOrders } from 'src/sections/overview/overview-ongoing-orders';

const fetchStats = async (location) => {
  const response = await fetch(
    `http://localhost:3030/v1/stats?loc=${location}`,
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
  const [stats, setStats] = useState({
    succeed: '',
    failed: '',
    ongoing: '',
    incoming: '',
    outgoing: '',
    num: [],
    type: {
      document: '',
      goods: '',
    },
    latestOrders: [],
    latestTransfers: [],
  })

  const { user } = useAuth();

  const [selectedLocation, setSelectedLocation] = useState(user?.location);

  const locations = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39", "A40", "A41", "A42", "A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51", "A52", "A53", "A54", "A55", "A56", "A57", "A58", "A59", "A60", "A61", "A62", "A63",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"
  ]

  const fetchData = async () => {
    const data = await fetchStats(selectedLocation);
    setStats(data);
  };

  useEffect(() => {
    if (user?.role !== "Admin") {
      setSelectedLocation(user?.location);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedLocation])

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
          py: 2
        }}
      > 
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={12}
              lg={12}
            >
              <TextField
                select={user?.role === "Admin"}
                label="Địa điểm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                sx={{ minWidth: 120, maxWidth: 120, float: "right" }}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: 250 },
                  },
                }}
                InputProps={{ readOnly: user?.role !== "Admin" }}
              >
                <MenuItem key="" value="">- Tất cả -</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))} 
              </TextField>
            </Grid>
            { user?.role !== 'Transactor' && (
              <Grid
                xs={12}
                sm={6}
                lg={3}
              >
                <OverviewIncomingOrders
                  difference={12}
                  positive
                  sx={{ height: '100%' }}
                  value={`${stats?.incoming || 0}`}
                  transform={selectedLocation.includes('E')}
                />
              </Grid>
            )}
            { user?.role !== 'Transactor' && (
              <Grid
                xs={12}
                sm={6}
                lg={3}
              >
                <OverviewOutgoingOrders
                  difference={12}
                  positive
                  sx={{ height: '100%' }}
                  value={`${stats?.outgoing || 0}`}
                  transform={selectedLocation.includes('E')}
                />
              </Grid>
            )}
            <Grid
              xs={12}
              sm={6}
              lg={user?.role === 'Transactor'? 4:3}
            >
              <OverviewSucceedOrders
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={`${stats?.succeed || 0}`}
                transform={selectedLocation.includes('E')}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={user?.role === 'Transactor'? 4:3}
            >
              <OverviewFailedOrders
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={`${selectedLocation.includes('E')?stats?.ongoing || 0:stats?.failed || 0}`}
                transform={selectedLocation.includes('E')}
              />
            </Grid>
            { user?.role === 'Transactor' && (
              <Grid
                xs={12}
                sm={6}
                lg={4}
              >
                <OverviewOngoingOrders
                  difference={12}
                  positive
                  sx={{ height: '100%' }}
                  value={`${stats?.ongoing || 0}`}
                  transform={selectedLocation.includes('E')}
                />
              </Grid>
            )}
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewOrders
                chartSeries={[
                  {
                    name: 'Năm nay',
                    data: stats?.num,
                  },
                  {
                    name: 'Năm ngoái',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
                transform={selectedLocation.includes('E')}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewType
                chartSeries={selectedLocation.includes('E')?[stats?.type?.in || 0, stats?.type?.out || 0]:[stats?.type?.document || 0, stats?.type?.goods|| 0]}
                labels={selectedLocation.includes('E')?['Nhập hàng', 'Xuất hàng']:['Tài liệu', 'Hàng hóa']}
                sx={{ height: '100%' }}
                transform={selectedLocation.includes('E')}
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