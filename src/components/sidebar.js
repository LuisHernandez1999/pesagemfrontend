import React from 'react';  
import { Box, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { AiOutlineDashboard, AiOutlineControl, AiOutlineFileDone, AiOutlineLogout } from 'react-icons/ai'; // Ícones
import { useRouter } from 'next/router';

export default function Sidebar() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <Box
            sx={{
                width: '290px',
                height: '2800px', 
                backgroundColor: '#333', // Fundo preto
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: 0,
                left: 0,
                padding: '1rem',
                zIndex: 1000, 
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    marginTop: '5rem', 
                    fontSize: '30px', 
                    fontWeight: 'bold', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    display: 'flex', 
                    color: 'white' 
                }}
            >
              
            </Typography>
            
            <Box sx={{ marginBottom: '2rem', marginTop: '4rem' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Pesquisar..."
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        '& .MuiInputBase-root': {
                            height: '40px',
                        },
                        '&:hover': {
                            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
                        },
                        '&:focus-within': {
                            borderColor: '#6200ea',
                            boxShadow: '0 0 8px rgba(98, 0, 234, 0.8)',
                        }
                    }}
                />
            </Box>

            <List sx={{ flexGrow: 1 }}>
                {[
                    { text: "Pesagem", icon: <AiOutlineDashboard color="white" size={32} />, path: "/pesagem" },
                    { text: "Controle de Pesagem", icon: <AiOutlineControl color="white" size={32} />, path: "/controle-pesagem" },
                    { text: "Resumo de Pesagem", icon: <AiOutlineFileDone color="white" size={32} />, path: "/resumo-pesagem" },
                ].map(({ text, icon, path }) => (
                    <ListItem 
                        button 
                        key={text}
                        sx={{ 
                            marginBottom: '1rem', 
                            paddingLeft: '1rem',
                            transition: 'background 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&:active': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                        }} 
                        onClick={() => handleNavigation(path)}
                    > 
                        <ListItemIcon sx={{ marginTop: '10px' }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ color: 'white' }} />
                    </ListItem>
                ))}
            </List>

            <ListItem 
                button 
                sx={{ 
                    marginBottom: '1rem', 
                    paddingLeft: '1rem',
                    transition: 'background 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    },
                    '&:active': {
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    }
                }} 
                onClick={() => handleNavigation('/logout')}
            >
                <ListItemIcon sx={{ marginTop: '10px' }}>
                    <AiOutlineLogout color="white" size={32} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: 'white' }} />
            </ListItem>
        </Box>
    );
}

