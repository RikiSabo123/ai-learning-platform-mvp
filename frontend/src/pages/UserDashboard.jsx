import { useEffect, useState } from "react";
import { learningService } from "../services/learningService";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
    TextField,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Alert,
    Divider,
    AppBar,
    Toolbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const UserDashboard = () => {
    const [history, setHistory] = useState([]);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [AIResponse, setAIResponse] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) setUserName(savedName);

        const fetchCategories = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await learningService.getCategories();
                const rawCategories = data.categories || data;

                if (Array.isArray(rawCategories)) {
                    const seen = new Set();
                    const unique = rawCategories.filter(cat => {
                        if (!cat || !cat.name) return false;
                        if (seen.has(cat.name)) return false;
                        seen.add(cat.name);
                        return true;
                    });
                    setCategories(unique);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await learningService.getUserHistory();

                const dataToClean = Array.isArray(res) ? res : (res.data || res.history || []);
                const clean = Array.isArray(dataToClean)
                    ? dataToClean.map(item => ({
                        id: item.id || item._id || Date.now(),
                        prompt: item.prompt || '',
                        response: item.response || item.lesson || item.message || ''
                    }))
                    : [];
                setHistory(clean);
            } catch (err) {
                console.error("Error loading history:", err);
            }
        };

        fetchHistory();
    }, []);

    const handleCategorySelect = async (categoryId, categoryName) => {
        setLoading(true);
        setError('');
        try {
            const data = await learningService.getSubcategoriesByCategoryId(categoryId);
            const rawSubCategories = data.subCategories || data;
            if (Array.isArray(rawSubCategories)) {
                const seen = new Set();
                const unique = rawSubCategories.filter((sub) => {
                    if (!sub || !sub.name) return false;
                    if (seen.has(sub.name)) return false;
                    seen.add(sub.name);
                    return true;
                });
                setSubCategories(unique);
            } else {
                setSubCategories([]);
            }
            setSelectedCategory(categoryId);
            setSelectedCategoryName(categoryName);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubCategorySelect = (subCategoryId, subCategoryName) => {
        setSelectedSubCategory(subCategoryId);
        setSelectedSubCategoryName(subCategoryName);
        setStep(3);
    };

    const handleSubmitPrompt = async (e) => {
        e.preventDefault();

        if (!currentPrompt.trim()) {
            setError("Please enter a prompt");
            return;
        }

        setLoading(true);
        setError("");
        setAIResponse("");

        try {
            const userId = localStorage.getItem("userId");

            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:3000/api/ai/stream", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    userId,
                    categoryId: selectedCategory,
                    subCategoryId: selectedSubCategory,
                    prompt: currentPrompt,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            if (!res.body) {
                throw new Error("No stream received from server");
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let fullText = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                fullText += chunk;
                setAIResponse(fullText);
            }

            setHistory((prev) => [
                {
                    id: Date.now(),
                    prompt: currentPrompt,
                    response: fullText,
                },
                ...prev
            ]);

            setCurrentPrompt("");

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        📚 AI Learning Platform
                    </Typography>
                    {step === 3 && (
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            {selectedCategoryName} • {selectedSubCategoryName}
                        </Typography>
                    )}
                    <Typography variant="body2">
                        👋 {userName}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Step 1: Category Selection */}
                {step === 1 && !loading && (
                    <Box>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                            Choose a Learning Category
                        </Typography>
                        <Grid container spacing={2}>
                            {categories.map((cat, i) => (
                                <Grid item xs={12} sm={6} key={cat.id || cat._id || i}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => handleCategorySelect(cat.id || cat._id, cat.name)}
                                        sx={{
                                            padding: 3,
                                            borderRadius: 2,
                                            border: '2px solid #e0e0e0',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#1976d2',
                                                backgroundColor: '#f5f5f5',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                                            {cat.name}
                                        </Typography>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Step 2: Subcategory Selection */}
                {step === 2 && (
                    <Box>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setStep(1)}
                            sx={{ mb: 2 }}
                        >
                            Back
                        </Button>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                            Choose a Subcategory
                        </Typography>
                        <Grid container spacing={2}>
                            {subCategories.map((sub, i) => (
                                <Grid item xs={12} sm={6} key={sub.id || sub._id || i}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => handleSubCategorySelect(sub.id || sub._id, sub.name)}
                                        sx={{
                                            padding: 3,
                                            borderRadius: 2,
                                            border: '2px solid #e0e0e0',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#1976d2',
                                                backgroundColor: '#f5f5f5',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                                            {sub.name}
                                        </Typography>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Step 3: Ask Questions */}
                {step === 3 && (
                    <Box>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setStep(2)}
                            sx={{ mb: 2 }}
                        >
                            Back
                        </Button>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Prompt Input Form */}
                        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                            <form onSubmit={handleSubmitPrompt}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Ask your question here..."
                                    value={currentPrompt}
                                    onChange={(e) => setCurrentPrompt(e.target.value)}
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    disabled={loading}
                                    fullWidth
                                    sx={{
                                        paddingY: 1.5,
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0px 6px 14px rgba(25, 118, 210, 0.4)',
                                        }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Question'}
                                </Button>
                            </form>
                        </Paper>

                        {/* AI Response */}
                        {AIResponse && (
                            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
                                    💡 Answer:
                                </Typography>
                                <Box sx={{
                                    '& h1, & h2, & h3': { color: '#1976d2', mt: 2, mb: 1 },
                                    '& ul, & ol': { pl: 2 },
                                    '& li': { mb: 0.5 },
                                    '& p': { mb: 1 }
                                }}>
                                    <ReactMarkdown>{AIResponse}</ReactMarkdown>
                                </Box>
                            </Paper>
                        )}

                        {/* History */}
                        {history.length > 0 && (
                            <Box>
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
                                    📖 Learning History
                                </Typography>
                                {history.map((item, index) => (
                                    <Card key={item.id || index} sx={{ mb: 2, borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#1976d2' }}>
                                                Q: {item.prompt}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                A: {item.response?.substring(0, 200)}...
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>
                )}

                {/* Loading State */}
                {loading && step < 3 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Container>
        </>
    );
};
