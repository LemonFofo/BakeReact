import React from 'react';
import { Order } from '../types';
import { colors, spacing, typography, shadows } from '../theme';

interface OrderCardProps {
  order: Order;
  onDelete?: () => void;
  onEdit?: () => void;
}

// Define styles with correct types for React
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    margin: `${spacing.sm}px 0`,
    boxShadow: `0 ${shadows.card.shadowOffset.height}px ${shadows.card.shadowRadius}px ${shadows.card.shadowColor}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: { // Note: Pressable-like state needs different handling in web
    transform: 'scale(0.98)',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
    display: 'block', // Ensure title takes space
  },
  clientName: {
    ...typography.small,
    color: colors.textLight,
    display: 'block', // Ensure client name takes space
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantity: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  deliveryType: {
    ...typography.small,
    color: colors.textLight,
    textTransform: 'capitalize',
  },
  time: {
    ...typography.small,
    color: colors.textLight,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  button: {
    padding: spacing.xs,
    borderRadius: 8,
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none', // Remove default button border
    cursor: 'pointer', // Add cursor pointer
  },
  editButton: {
    backgroundColor: colors.accent,
  },
  deleteButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white, // Assuming white text for buttons
  },
};

export default function OrderCard({ order, onDelete, onEdit }: OrderCardProps) {
  console.log('OrderCard rendered for order:', order);

  const time = new Date(order.deliveryTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    // Apply styles using the style prop
    <div style={styles.card}>
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.title}>
            {order.item}
          </span>
          <span style={styles.clientName}>
            for {order.clientName}
          </span>
        </div>
        <div style={styles.details}>
          <span style={styles.quantity}>
            {order.quantity}x
          </span>
          <div style={styles.deliveryInfo}>
            <span style={styles.deliveryType}>
              {order.deliveryType}
            </span>
            <span style={styles.time}>
              @ {time}
            </span>
          </div>
        </div>
      </div>
      <div style={styles.actions}>
        {onEdit && (
          <button 
            onClick={() => {
              console.log('Edit button clicked for order:', order.id);
              onEdit();
            }} 
            // Combine button and editButton styles
            style={{...styles.button, ...styles.editButton}}
          >
            <span style={styles.buttonText}>✏️</span>
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => {
              console.log('Delete button clicked for order:', order.id);
              onDelete();
            }} 
            // Combine button and deleteButton styles
            style={{...styles.button, ...styles.deleteButton}}
          >
            <span style={styles.buttonText}>🗑️</span>
          </button>
        )}
      </div>
    </div>
  );
}

// Remove StyleSheet and convert styles to CSS
// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: spacing.md,
//     marginVertical: spacing.sm,
//     ...shadows.card,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   pressed: {
//     transform: [{ scale: 0.98 }],
//     opacity: 0.9,
//   },
//   content: {
//     flex: 1,
//   },
//   header: {
//     marginBottom: spacing.xs,
//   },
//   title: {
//     ...typography.body,
//     fontWeight: 'bold',
//     color: colors.text,
//   },
//   clientName: {
//     ...typography.small,
//     color: colors.textLight,
//   },
//   details: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.sm,
//   },
//   quantity: {
//     ...typography.small,
//     color: colors.primary,
//     fontWeight: 'bold',
//   },
//   deliveryInfo: {
//     flexDirection: 'row',
//     gap: spacing.xs,
//   },
//   deliveryType: {
//     ...typography.small,
//     color: colors.textLight,
//     textTransform: 'capitalize',
//   },
//   time: {
//     ...typography.small,
//     color: colors.textLight,
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: spacing.xs,
//   },
//   button: {
//     padding: spacing.xs,
//     borderRadius: 8,
//     width: 36,
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   editButton: {
//     backgroundColor: colors.accent,
//   },
//   deleteButton: {
//     backgroundColor: colors.primary,
//   },
//   buttonText: {
//     fontSize: 16,
//   },
// }); 