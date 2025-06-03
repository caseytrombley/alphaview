import { Container, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Company from './pages/Company';
import NavBar from './components/NavBar';

export default function App() {
    return (
        <>
            <CssBaseline />
            <NavBar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/company/:symbol" element={<Company />} />
                </Routes>
            </Container>
        </>
    );
}