import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// Sanity check
console.log('Alpha Vantage API Key:', process.env.ALPHA_VANTAGE_API_KEY ? 'Loaded' : 'Missing');

interface TimeSeriesData {
    [date: string]: {
        "1. open": string;
        "2. high": string;
        "3. low": string;
        "4. close": string;
        "5. adjusted close": string;
        "6. volume": string;
        "7. dividend amount": string;
        "8. split coefficient": string;
    };
}

// Use a normal arrow function without trying to assign it to RequestHandler
app.get('/api/candle', async (req, res) => {
    const symbol = req.query.symbol as string;
    if (!symbol) {
        res.status(400).json({ error: 'Missing symbol' });
        return;
    }

    try {
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                apikey: process.env.ALPHA_VANTAGE_API_KEY,
            },
        });

        const data: TimeSeriesData | undefined = response.data['Time Series (Daily)'];

        if (!data) {
            const errMsg = response.data['Error Message'] || response.data['Note'] || 'No data found for symbol';
            res.status(404).json({ error: errMsg });
            return;
        }

        const chartData = Object.entries(data)
            .map(([date, values]) => ({
                date,
                price: parseFloat(values['4. close']),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        res.json(chartData);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
