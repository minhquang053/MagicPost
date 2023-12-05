// pages/orders/search_orders.js
import React, { useState } from 'react';
import OrderSearchTable from './orders-table'; // Import the OrderSearchTable component

const OrderSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dummy search function for illustration purposes
  const handleSearch = () => {
    // Implement your search logic here
    // For demonstration, using dummy search results
    const dummySearchResults = [
      { id: '1', name: 'Order 1', createdDay: '2023-01-01', status: 'Pending' },
      { id: '2', name: 'Order 2', createdDay: '2023-02-02', status: 'Completed' },
      // Add more orders as needed
    ];
    setSearchResults(dummySearchResults);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {/* Your search bar or any other elements can be placed here */}
      <button onClick={handleSearch}>Search Orders</button>

      {/* Display search results using OrderSearchTable */}
      <OrderSearchTable
        count={searchResults.length}
        items={searchResults.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default OrderSearch;
