import { useEffect, useState } from "react"
import { adminService } from "../services/adminService";
import { 
    Container, Typography, Box, Grid, Card, CardContent, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    CircularProgress, Alert, Divider, Chip
} from '@mui/material';
export const AdminDashboard = () => {
    const [users, setUsers] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(null); const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            setError('')
            try {
                const resData = await adminService.getAllUsers();
                if (Array.isArray(resData)) {
                    setUsers(resData);
                } else if (resData && Array.isArray(resData.users)) {
                    setUsers(resData.users);
                } else if (resData && Array.isArray(resData.data)) {
                    setUsers(resData.data);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching users');
            } finally {
                setLoading(false);
            }
        }
        fetchUsers()
    }, [])
    const handleUserSelect = (user) => {
        setSelectedUserId(user);
    };
    const selectedUser = users.find(u => u.id === selectedUserId);
    return (
    <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '30px 20px', 
        fontFamily: 'sans-serif', 
        direction: 'rtl',
        textAlign: 'right'
    }}>
        {/* כותרת עליונה ממורכזת */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#1976d2', margin: '0 0 10px 0', fontSize: '28px' }}>ניהול מערכת הלמידה</h1>
            <p style={{ color: '#666', margin: 0, fontSize: '16px' }}>צפייה בנתוני המשתמשים ומעקב בזמן אמת אחר היסטוריית הפרומפטים</p>
        </div>

        {loading && (
            <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>טוען נתונים...</div>
        )}
        
        {error && (
            <div style={{ color: '#d32f2f', backgroundColor: '#fde8e8', padding: '12px', borderRadius: '6px', textAlign: 'center', marginBottom: '20px' }}>
                {error}
            </div>
        )}

        {!loading && !error && (
            <div style={{ display: 'flex', gap: '30px', marginTop: '20px', alignItems: 'flex-start' }}>
                
                {/* טבלת משתמשים - תופסת 40% מהרוחב */}
                <div style={{ flex: '4', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    <h3 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #eee', backgroundColor: '#fcfcfc', color: '#333' }}>רשימת הלומדים במערכת</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px 20px', color: '#555' }}>שם המשתמש</th>
                                <th style={{ padding: '12px 20px', color: '#555' }}>טלפון</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    onClick={() => handleUserSelect(user.id)} 
                                    style={{
                                        cursor: 'pointer', 
                                        backgroundColor: selectedUserId === user.id ? '#e6f7ff' : 'transparent', 
                                        borderBottom: '1px solid #eee',
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    <td style={{ padding: '14px 20px', color: '#333' }}>{user.name}</td>
                                    <td style={{ padding: '14px 20px', color: '#666' }}>{user.phone}</td>
                                        </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* אזור הצגת פרומפטים - תופס 60% מהרוחב */}
                <div style={{ flex: '6', backgroundColor: '#fcfcfc', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', minHeight: '400px', border: '1px solid #eee' }}>
                    {selectedUser ? (
                        <div>
                            <h3 style={{ margin: '0 0 20px 0', color: '#333', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
                                מסע הלמידה של: {selectedUser.name}
                            </h3>

                            {selectedUser.prompts && selectedUser.prompts.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {selectedUser.prompts.map((p) => (
                                        <div key={p.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderRight: '5px solid #2e7d32' }}>
                                            <p style={{ margin: '0 0 10px 0', color: '#555', fontSize: '14px' }}><strong>שאילתת המשתמש (Prompt):</strong></p>
                                            <p style={{ margin: '0 0 15px 0', color: '#111', fontWeight: '500' }}>{p.prompt}</p>
                                            
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #eef0f2' }}>
                                                <span style={{ backgroundColor: '#1976d2', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>תשובת המערכת</span>
                                                <p style={{ margin: 0, color: '#2c3e50', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                                                    {p.response}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#777', textAlign: 'center', marginTop: '40px' }}>המשתמש עדיין לא ביצע פניות ל-AI.</p>
                            )}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', color: '#777' }}>
                            <h4 style={{ margin: '0 0 5px 0', color: '#444' }}>נעים להכיר!</h4>
                            <p style={{ margin: 0, fontSize: '14px' }}>בחר משתמש מרשימת הלומדים מימין כדי לצפות בפעילות שלו</p>
                        </div>
                    )}
                </div>

            </div>
        )}
    </div>
);
};