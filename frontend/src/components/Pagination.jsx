import React from "react";
import { Pagination, Stack } from "@mui/material";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ my: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationComponent;
