import { Box, Button, HStack, Grid } from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../../components/ui/pagination';
import { FC, useState } from 'react';

interface PaginationComponentProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  setPageLimitToParent: (limit: number) => void;
}

export const Pagination: FC<PaginationComponentProps> = ({
  currentPage,
  totalItems,
  pageSize,
  handlePageChange,
  setPageLimitToParent,
}) => {
  const [pageLimit, setPageLimit] = useState(pageSize);
  const pageSizeOptions = [5, 10, 15];

  const handlePageLimitChange = (newLimit: number) => {
    setPageLimit(newLimit);
    setPageLimitToParent(newLimit);
  };

  return (
    <Grid templateColumns="1fr 1fr 1fr" alignItems="center" mt="4">
      <HStack justify="flex-start">
        {pageSizeOptions.map((size) => (
          <Button key={size} variant="outline" onClick={() => handlePageLimitChange(size)}>
            {size}
          </Button>
        ))}
      </HStack>
      <Box display="flex" justifyContent="center">
        <PaginationRoot
          page={currentPage}
          count={totalItems}
          defaultPage={currentPage}
          pageSize={pageLimit}
          onPageChange={(e: { page: number }) => handlePageChange(e.page)}
          variant="outline"
          siblingCount={5}
        >
          <HStack justify="center">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Box>
    </Grid>
  );
};
