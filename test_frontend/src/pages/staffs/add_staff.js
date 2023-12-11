// add-staff.js
import React from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import AddStaffForm from 'src/sections/staff/add-staff-form';

const AddStaff = () => {
  return (
    <>
      <Head>
        <title>Thêm nhân viên | Magic Post</title>
      </Head>
      <AddStaffForm />
    </>
  );
};

AddStaff.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddStaff;
