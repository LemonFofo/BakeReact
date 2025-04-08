import React, { useState, useEffect } from 'react';
// import './index.css'; // Assuming you will create a CSS file for styles
import OrderCard from './components/OrderCard';
import BakingPlan from './components/BakingPlan';
import AddOrderModal from './components/AddOrderModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { Order, BakingStep } from './types';
import { colors, spacing, typography } from './theme'; // Assuming theme.ts is in the same directory

// Temporary demo data
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

// Define styles with correct types for React
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    fontFamily: 'sans-serif', // Add a default font
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
  },
  sectionUnderline: {
    height: 2,
    backgroundColor: colors.accent,
    width: 40,
  },
};

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
  console.log('State - orders:', orders);
  console.log('State - bakingSteps:', bakingSteps);
  console.log('State - isAddModalVisible:', isAddModalVisible);
  console.log('State - editingOrder:', editingOrder);
  console.log('State - isDeleteModalVisible:', isDeleteModalVisible);
  console.log('State - orderToDelete:', orderToDelete);

  // Add console log for initial state and re-renders
  useEffect(() => {
    console.log('OrderToOven useEffect triggered (initial mount or dependency change).');
    // console.log('Initial Orders:', orders); // Already logged above
    // console.log('Initial Baking Steps:', bakingSteps); // Already logged above
  }, []); // Empty dependency array means this runs only once on mount

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
    console.log('Submitting order:', orderData, 'Editing order:', editingOrder);
    if (editingOrder) {
      // Update existing order
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order =>
          order.id === editingOrder.id
            ? {
                ...orderData,
                id: editingOrder.id,
                createdAt: editingOrder.createdAt,
                updatedAt: new Date().toISOString(),
              }
            : order
        );
        console.log('Orders after update:', updatedOrders);
        return updatedOrders;
      });
    } else {
      // Create new order
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(), // Use timestamp as simple unique ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setOrders(prevOrders => {
          const updatedOrders = [...prevOrders, newOrder];
          console.log('Orders after adding:', updatedOrders);
          return updatedOrders;
      });
    }
    // TODO: Add logic to update bakingSteps based on the new/updated order
    // setBakingSteps(...) 

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
          console.log('Orders after delete:', updatedOrders);
          return updatedOrders;
      });
      // TODO: Add logic to remove related baking steps
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
            <p style={styles.sectionTitle}>Orders</p>
            <div style={styles.sectionUnderline} />
          </div>
          {orders.length === 0 ? (
            <p>No orders for this date.</p>
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
            <p style={styles.sectionTitle}>Baking Plan</p>
            <div style={styles.sectionUnderline} />
          </div>
          <BakingPlan steps={bakingSteps} />
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
          // Pass clientName or item as orderName based on availability
          orderName={orderToDelete?.clientName || orderToDelete?.item || 'this order'}
        />
      </div>
    );
  } catch (error) {
      console.error("Error rendering OrderToOven component:", error);
      return <div style={{ padding: 20, backgroundColor: 'red', color: 'white' }}>An error occurred during rendering. Check the console.</div>;
  }
}

// Remove StyleSheet and convert styles to CSS
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     padding: spacing.lg,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: spacing.xl,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.sm,
//   },
//   title: {
//     ...typography.title,
//     color: colors.text,
//   },
//   emoji: {
//     fontSize: 24,
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.sm,
//     borderRadius: 24,
//     ...typography.body,
//   },
//   addButtonText: {
//     color: colors.white,
//     fontWeight: 'bold',
//   },
//   datePicker: {
//     backgroundColor: colors.white,
//     padding: spacing.md,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: spacing.xl,
//     ...typography.body,
//   },
//   datePickerText: {
//     color: colors.text,
//     fontWeight: '500',
//   },
//   section: {
//     marginBottom: spacing.xl,
//   },
//   sectionHeader: {
//     marginBottom: spacing.md,
//   },
//   sectionTitle: {
//     ...typography.subtitle,
//     color: colors.text,
//     marginBottom: spacing.xs,
//   },
//   sectionUnderline: {
//     height: 2,
//     backgroundColor: colors.accent,
//     width: 40,
//   },
// }); 