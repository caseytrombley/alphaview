import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function Company() {
    const { symbol } = useParams();
    const [profile, setProfile] = useState<any | null>(null);

    useEffect(() => {
        axios.get('https://finnhub.io/api/v1/stock/profile2', {
            params: {
                symbol,
                token: import.meta.env.VITE_FINNHUB_API_KEY
            }
        }).then(res => setProfile(res.data));
    }, [symbol]);

    if (!profile) return <CircularProgress />;

    return (
        <div>
            <Typography variant="h4">{profile.name}</Typography>
            <Typography variant="subtitle1">Ticker: {profile.ticker}</Typography>
            <Typography variant="body2">Industry: {profile.finnhubIndustry}</Typography>
            <Typography variant="body2">Website: <a href={profile.weburl} target="_blank">{profile.weburl}</a></Typography>
        </div>
    );
}