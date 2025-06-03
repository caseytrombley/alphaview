import { useState } from 'react';
import {
    TextField, Button, Typography, Box, CircularProgress, Alert, Paper,
} from '@mui/material';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function Search() {
    const [symbol, setSymbol] = useState('AAPL');
    const [data, setData] = useState<{ date: string; price: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get('http://localhost:3001/api/candle', {
                params: { symbol },
            });

            if (!Array.isArray(res.data) || res.data.length === 0) {
                throw new Error('No data available');
            }

            setData(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 700, margin: 'auto', p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Stock Price Chart
            </Typography>
            <Box display="flex" alignItems="center" mb={3}>
                <TextField
                    label="Ticker Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={fetchData}>Fetch</Button>
            </Box>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

            {data.length > 0 && (
                <Paper elevation={3} sx={{ p: 2 }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <XAxis dataKey="date" />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#1976d2"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            )}
        </Box>
    );
}
