import React from 'react';
import { Button, Grid } from '@mui/material';

type PaginationControlsProps = {
    page: number,
    isPreviousData: boolean,
    hasMore: boolean,
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, isPreviousData, hasMore, setPage }) => (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
            <Button
                onClick={() => setPage(prev => Math.max(prev  1, 0))}
                disabled={page === 0}
                variant="outlined"
            >
                Previous
            </Button>
        </Grid>
        <Grid item>
            <Button
                onClick={() => {
                    if (!isPreviousData && hasMore) {
                        setPage(prev => prev + 1);
                    }
                }}
                disabled={isPreviousData || !hasMore}
                variant="contained"
            >
                Next
            </Button>
        </Grid>
    </Grid>
);

export default PaginationControls;
