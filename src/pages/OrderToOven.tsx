import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import BakingPlan from '../components/BakingPlan';
import AddOrderModal from '../components/AddOrderModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { Order, BakingStep } from '../types';
import { colors, spacing, typography } from '../theme';

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
    ...typography.title,
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
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  datePicker: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: spacing.xl,
    ...typography.body,
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
    ...typography.subtitle,
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
      ...typography.body,
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

  console.log('--- Preparing to render JSX ---');
  try {
    return (
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleContainer}>
            <span style={styles.title}>Order-to-Oven</span> 
            <span style={styles.emoji}>🧁</span>
          </div>
          <button 
            style={styles.addButton} 
            onClick={handleAddOrder}
          >
            + Add Order
          </button>
        </div>

        {/* Date Picker Placeholder */}
        <div style={styles.datePicker}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {/* Orders Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Orders</span>
            <div style={styles.sectionUnderline} />
          </div>
          {orders.length === 0 ? (
            <p style={styles.emptyStateText}>No orders for this date.</p>
          ) : (
            orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onEdit={() => handleEditOrder(order.id)}
                onDelete={() => handleDeleteOrder(order.id)}
              />
            ))
          )}
        </div>

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
      </div>
    );
  } catch (error) {
      console.error("Error rendering OrderToOven component:", error);
      return <div style={{ padding: 20, backgroundColor: 'red', color: 'white' }}>An error occurred during rendering. Check the console.</div>;
  }
} 