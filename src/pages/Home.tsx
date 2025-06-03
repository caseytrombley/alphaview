import Grid from '@mui/material/Grid'; // MUI v7 Grid import
import { Box, Typography, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero Section */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to AlphaView
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Real-time financial charts, market insights, and stock exploration at your fingertips.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<SearchIcon />}
                    onClick={() => navigate('/search')}
                >
                    Start Exploring
                </Button>
            </Paper>

            {/* Features Section */}
            <Grid container columns={12} spacing={4}>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: 'flex' }}
                >
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                        <ShowChartIcon fontSize="large" color="primary" />
                        <Typography variant="h6" gutterBottom>
                            Interactive Charts
                        </Typography>
                        <Typography variant="body2">
                            Visualize price trends and technical data using clean, dynamic candlestick charts.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: 'flex' }}
                >
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                        <TimelineIcon fontSize="large" color="primary" />
                        <Typography variant="h6" gutterBottom>
                            Historical Insights
                        </Typography>
                        <Typography variant="body2">
                            Access daily historical data to analyze market behavior over time.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: 'flex' }}
                >
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                        <SearchIcon fontSize="large" color="primary" />
                        <Typography variant="h6" gutterBottom>
                            Stock Search
                        </Typography>
                        <Typography variant="body2">
                            Search by ticker to view individual company performance and chart data.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
