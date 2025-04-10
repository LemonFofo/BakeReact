import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import BakingPlan from '../components/BakingPlan';
import AddOrderModal from '../components/AddOrderModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import DateStrip from '../components/DateStrip';
import { Order, BakingStep } from '../types';
import { colors, spacing, typography as customTypography, shadows } from '../theme';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, Box, Typography, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// --- MUI Theme Integration ---
const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.accent,
      contrastText: colors.white,
    },
    error: {
      main: colors.error,
    },
    background: {
      default: colors.background,
      paper: colors.white,
    },
    text: {
      primary: colors.text,
      secondary: colors.textLight,
    },
  },
  spacing: Object.values(spacing), 
  typography: {
    h4: { fontSize: customTypography.title.fontSize, fontWeight: customTypography.title.fontWeight },
    h6: { fontSize: customTypography.subtitle.fontSize, fontWeight: customTypography.subtitle.fontWeight },
    body1: { fontSize: customTypography.body.fontSize, fontWeight: customTypography.body.fontWeight },
    caption: { fontSize: customTypography.small.fontSize, fontWeight: customTypography.small.fontWeight }
  },
  components: {
    MuiCard: {
        styleOverrides: {
            root: {
                boxShadow: `0 ${shadows.card.shadowOffset.height}px ${shadows.card.shadowRadius}px ${shadows.card.shadowColor}`,
                borderRadius: 12,
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 24,
                textTransform: 'none',
            }
        }
    }
  }
});

// --- Demo Data ---
const demoOrders: Order[] = [
  {
    id: '1',
    clientName: 'Emily',
    item: 'Birthday Cake',
    quantity: 1,
    deliveryType: 'delivery',
    deliveryTime: '2024-04-08T16:00:00.000Z',
    date: '2024-04-08',
    createdAt: '2024-04-08T10:00:00.000Z',
    updatedAt: '2024-04-08T10:00:00.000Z',
  },
  {
    id: '2',
    clientName: 'Leo',
    item: 'Cupcakes',
    quantity: 12,
    deliveryType: 'pickup',
    deliveryTime: '2024-04-08T13:00:00.000Z',
    date: '2024-04-08',
    createdAt: '2024-04-08T10:00:00.000Z',
    updatedAt: '2024-04-08T10:00:00.000Z',
  },
];

const demoBakingSteps: BakingStep[] = [
  {
    time: '2024-04-08T10:00:00.000Z',
    description: "Bake Leo's Cupcakes",
    orderId: '2',
  },
  {
    time: '2024-04-08T13:00:00.000Z',
    description: "Start Emily's Cake",
    orderId: '1',
  },
];

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    // flex: 1, // flex: 1 might not work well on a top-level div without a flex parent
    backgroundColor: colors.background,
    padding: spacing.lg,
    fontFamily: 'sans-serif',
    minHeight: '100vh', // Ensure container takes full height
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...customTypography.title,
    color: colors.text,
  },
  emoji: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    borderRadius: 24,
    border: 'none',
    cursor: 'pointer',
    ...customTypography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  datePicker: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: spacing.xl,
    ...customTypography.body,
    color: colors.text,
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Add a subtle shadow
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...customTypography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
    display: 'block', // Make title a block element
  },
  sectionUnderline: {
    height: 2,
    backgroundColor: colors.accent,
    width: 40,
  },
  emptyStateText: {
      ...customTypography.body,
      color: colors.textLight,
      textAlign: 'center',
      marginTop: spacing.md,
  },
};

// --- Component ---
export default function OrderToOven() {
  console.log('--- OrderToOven Component Render Start ---');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [bakingSteps, setBakingSteps] = useState<BakingStep[]>(demoBakingSteps);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  // Log state on each render
  console.log('State - orders:', JSON.stringify(orders));
  console.log('State - bakingSteps:', JSON.stringify(bakingSteps));
  console.log('State - isAddModalVisible:', isAddModalVisible);
  console.log('State - editingOrder:', JSON.stringify(editingOrder));
  console.log('State - isDeleteModalVisible:', isDeleteModalVisible);
  console.log('State - orderToDelete:', JSON.stringify(orderToDelete));

  useEffect(() => {
    console.log('OrderToOven useEffect triggered (initial mount).');
  }, []);

  // --- Event Handlers ---
  const handleAddOrder = () => {
    console.log('Add Order button clicked');
    setEditingOrder(null);
    setIsAddModalVisible(true);
  };

  const handleModalClose = () => {
    console.log('Closing Add/Edit Modal');
    setIsAddModalVisible(false);
    setEditingOrder(null);
  };

  const handleModalSubmit = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Submitting order:', JSON.stringify(orderData), 'Editing order:', JSON.stringify(editingOrder));
    if (editingOrder) {
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order =>
          order.id === editingOrder.id
            ? {
                ...order,
                ...orderData, // Overwrite with new data
                updatedAt: new Date().toISOString(),
              }
            : order
        );
        console.log('Orders after update:', JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    } else {
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setOrders(prevOrders => {
          const updatedOrders = [...prevOrders, newOrder];
          console.log('Orders after adding:', JSON.stringify(updatedOrders));
          return updatedOrders;
      });
    }
    // TODO: Update baking steps based on order changes

    setIsAddModalVisible(false);
    setEditingOrder(null);
  };

  const handleEditOrder = (orderId: string) => {
    console.log('Editing order with ID:', orderId);
    const orderToEdit = orders.find(order => order.id === orderId);
    if (orderToEdit) {
      setEditingOrder(orderToEdit);
      setIsAddModalVisible(true);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log('Attempting to delete order with ID:', orderId);
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrderToDelete(order);
      setIsDeleteModalVisible(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      console.log('Confirming delete for order:', orderToDelete.id);
      setOrders(prevOrders => {
          const updatedOrders = prevOrders.filter(order => order.id !== orderToDelete.id);
          console.log('Orders after delete:', JSON.stringify(updatedOrders));
          return updatedOrders;
      });
      // TODO: Remove related baking steps
      // setBakingSteps(prevSteps => prevSteps.filter(step => step.orderId !== orderToDelete.id));
      setIsDeleteModalVisible(false);
      setOrderToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    console.log('Cancelled delete operation');
    setIsDeleteModalVisible(false);
    setOrderToDelete(null);
  };

  const handleDateChange = (newDate: Date) => {
      console.log('New date selected:', newDate);
      setSelectedDate(newDate);
      // TODO: Add logic here to filter/fetch orders and baking steps for the newDate
      // For now, just updating the state
  };

  console.log('--- Preparing to render JSX ---');
  try {
    return (
      <ThemeProvider theme={muiTheme}>
        <Box sx={{ backgroundColor: 'background.default', p: spacing.lg, minHeight: '100vh' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: spacing.xl }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
                Order-to-Oven
              </Typography>
              <Typography variant="h4" component="span" role="img" aria-label="cupcake">🧁</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={handleAddOrder} sx={{ fontWeight: 'bold' }}>
              + Add Order
            </Button>
          </Box>

          {/* Replace Date Picker Placeholder with DateStrip */}
          <DateStrip selectedDate={selectedDate} onChangeDate={handleDateChange} />

          {/* Orders Section */}
          <Box sx={{ margin: spacing.xl }}>
            <Box sx={{ mb: spacing.md }}>
              <Typography variant="h6" component="h2" sx={{ color: 'text.primary', mb: spacing.xs }}>
                Orders
              </Typography>
              <Box sx={{ height: 2, backgroundColor: 'secondary.main', width: 40 }} />
            </Box>
            {orders.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: spacing.md }}>
                No orders for this date.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing.lg, py: spacing.sm }}> 
                <AnimatePresence>
                  {orders.map(order => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: 100, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginBottom: spacing.lg }}
                    >
                      <OrderCard
                        order={order}
                        onEdit={() => handleEditOrder(order.id)}
                        onDelete={() => handleDeleteOrder(order.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Box>
            )}
          </Box>

          {/* Baking Plan Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionTitle}>Baking Plan</span>
              <div style={styles.sectionUnderline} />
            </div>
            {bakingSteps.length === 0 ? (
              <p style={styles.emptyStateText}>No baking steps planned.</p>
            ) : (
              <BakingPlan steps={bakingSteps} />
            )}
          </div>

          {/* Modals */}
          <AddOrderModal
            visible={isAddModalVisible}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            initialData={editingOrder}
          />

          <DeleteConfirmationModal
            visible={isDeleteModalVisible}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            orderName={orderToDelete?.clientName || orderToDelete?.item || 'this order'}
          />
        </Box>
      </ThemeProvider>
    );
  } catch (error) {
      console.error("Error rendering OrderToOven component:", error);
      return <div style={{ padding: 20, backgroundColor: 'red', color: 'white' }}>An error occurred during rendering. Check the console.</div>;
  }
} 