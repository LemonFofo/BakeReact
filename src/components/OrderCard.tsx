import React from 'react';
// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Order } from '../types';
import { spacing } from '../theme';

// Framer Motion
import { motion } from 'framer-motion';

interface OrderCardProps {
  order: Order;
  onDelete?: () => void;
  onEdit?: () => void;
}

// Framer Motion variants for animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 }, // Initial state (can be used for entry animation too)
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    x: 100, // Slide right
    transition: { duration: 0.3 }
  }
};

export default function OrderCard({ order, onDelete, onEdit }: OrderCardProps) {
  console.log('OrderCard rendered for order:', order.id);

  const time = new Date(order.deliveryTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div 
      key={order.id} // Key remains on the motion component
      variants={cardVariants}
      initial="visible"
      animate="visible"
      exit="exit"
    >
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: spacing.md }}>
        <CardContent sx={{ flexGrow: 1, pb: { xs: 0, sm: 2 } }}>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {order.item}
          </Typography>
          <Typography variant="caption" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
            for {order.clientName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {order.quantity}x
            </Typography>
            <Box sx={{ display: 'flex', gap: spacing.xs }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {order.deliveryType}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                @ {time}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ 
            flexShrink: 0, 
            alignSelf: { xs: 'flex-end', sm: 'center' },
            p: { xs: 1, sm: 2 },
            pt: { xs: 0, sm: 2 }
        }}>
          {onEdit && (
            <IconButton 
              size="small" 
              onClick={() => {
                console.log('Edit button clicked for order:', order.id);
                onEdit && onEdit();
              }}
              aria-label="edit"
              sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { backgroundColor: 'secondary.dark' } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton 
              size="small" 
              onClick={() => {
                console.log('Delete button clicked for order:', order.id);
                onDelete && onDelete();
              }}
              aria-label="delete"
              sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'primary.dark' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
}

// Old styles object is removed 