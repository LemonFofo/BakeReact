import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// Icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // For Next Up

// Recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

// Mock Data
const statsData = [
  { title: 'Orders Today', count: 4, icon: <Inventory2OutlinedIcon sx={{ color: '#1976d2' }} />, bgColor: '#e3f2fd' },
  { title: 'Items to Bake', count: 12, icon: <BakeryDiningOutlinedIcon sx={{ color: '#ed6c02' }} />, bgColor: '#fff3e0' },
  { title: 'Due Today', count: 2, icon: <CalendarTodayOutlinedIcon sx={{ color: '#2e7d32' }}/>, bgColor: '#e8f5e9' },
];

const chartData = [
  { name: 'Mon', orders: 4 },
  { name: 'Tue', orders: 3 },
  { name: 'Wed', orders: 5 },
  { name: 'Thu', orders: 2 },
  { name: 'Fri', orders: 6 },
  { name: 'Sat', orders: 8 },
  { name: 'Sun', orders: 3 },
];

const nextBakingStep = {
    time: '10:00',
    description: "Bake Leo's Cupcakes"
}

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}> {/* Add padding and font */}
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500 }}>
          Welcome back 👋 Fer
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Here's what's happening today at a glance
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3,
        mb: 3
      }}>
        {statsData.map((stat, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderRadius: 3,
              transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Avatar sx={{ bgcolor: stat.bgColor, width: 52, height: 52 }}>
              {stat.icon}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {stat.title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {stat.count}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Next Up & Chart Sections */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          md: '4fr 8fr' 
        },
        gap: 3
      }}>
        {/* Next Up Section */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Next Up
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: '#fff3e0', width: 40, height: 40 }}>
              <AccessTimeIcon fontSize='small' sx={{ color: '#ed6c02' }}/>
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {nextBakingStep.description}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                at {nextBakingStep.time}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Mini Chart Section */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, height: { xs: 250, md: 300 } }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Orders This Week
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0"/>
              <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} fontSize={12}/>
              <YAxis tickLine={false} axisLine={false} dx={-10} fontSize={12} width={30}/>
              <Tooltip wrapperStyle={{ fontSize: '12px' }} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="orders" fill="#FF6B6B" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 