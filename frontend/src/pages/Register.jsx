import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Container, Typography, Box, Paper } from '@mui/material';
import { authService } from "../services/authService"; // שינוי לשירות המרוכז שלך
const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        setError('');
        setLoading(true);

        if (!userData.name.trim() || !userData.phone.trim()) {
            setError('כל השדות חובה!');
            setLoading(false);
            return;
        }

        try {
            let data;
            try {
                data = await authService.login(userData.phone);
            } catch (err) {
                if (err.response?.status === 404 || err.response?.data?.message === 'User not found') {
                    await authService.register({ name: userData.name, phone: userData.phone });
                    data = await authService.login(userData.phone);
                } else {
                    throw err;
                }
            }

            if (data && data.user && data.user.id) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('userRole', data.user.role || 'user');

                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                throw new Error('השרת לא החזיר מידע משתמש תקין');
            }
        } catch (err) {
            let errorMessage = 'כל השדות חייבים להתמלא כראוי!';

            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.request) {
                errorMessage = 'שגיאת תקשורת: השרת בתוך דוקר לא מגיב. ודא שה-Backend רץ';
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: '100%', textAlign: 'center', background: 'linear-gradient(to bottom, #ffffff, #fcfcfc)' }}>
                    <Typography component="h1" variant="h4" fontWeight="700" sx={{ marginBottom: 1, color: '#1976d2', letterSpacing: '0.5px' }}>
                        Start Learning Today
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 4 }}>
                        Create your account or login. To login as admin, use phone: <strong>admin</strong>
                    </Typography>

                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            type="text"
                            name="name"
                            label="Full Name"
                            variant="outlined"
                            value={userData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ marginBottom: 2.5 }}
                        />

                        <TextField
                            type="text"
                            name="phone"
                            label="Phone Number"
                            variant="outlined"
                            value={userData.phone}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ marginBottom: 2.5 }}
                        />

                        {error && (
                            <Typography variant="body2" sx={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '8px', borderRadius: '6px', marginBottom: 2.5, fontWeight: '500' }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{
                                paddingY: 1.5,
                                borderRadius: 2,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0px 6px 14px rgba(25, 118, 210, 0.4)',
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={26} color="inherit" /> : 'Create Account'}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;