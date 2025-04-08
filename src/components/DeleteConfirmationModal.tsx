import React from 'react';
// import './DeleteConfirmationModal.css'; // Assuming you will create a CSS file for styles
import { colors, spacing, typography } from '../theme';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderName: string;
}

// Define styles with correct types for React
const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: { // Changed from modalContainer to represent the overlay
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure modal is on top
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    width: '90%',
    maxWidth: 400,
    textAlign: 'center',
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
  },
  message: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm, // Add gap between buttons
  },
  button: { // Base button style
    flex: 1,
    padding: spacing.sm,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    ...typography.body,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: colors.border,
    color: colors.text,
  },
  deleteButton: {
    backgroundColor: colors.error,
    color: colors.white,
  },
};

export default function DeleteConfirmationModal({
  visible,
  onClose,
  onConfirm,
  orderName,
}: DeleteConfirmationModalProps) {
  console.log('DeleteConfirmationModal rendered for order:', orderName);

  if (!visible) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}> {/* Close on overlay click */} 
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking content */} 
        <p style={styles.title}>Delete Order</p> 
        <p style={styles.message}>
          Are you sure you want to delete the order for {orderName}? This action cannot be undone.
        </p>

        <div style={styles.buttonContainer}>
          <button 
            style={{...styles.button, ...styles.cancelButton}} 
            onClick={() => {
              console.log('Cancel button clicked');
              onClose();
            }}
          >
            Cancel
          </button>
          <button 
            style={{...styles.button, ...styles.deleteButton}} 
            onClick={() => {
              console.log('Delete button clicked for order:', orderName);
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Remove StyleSheet and convert styles to CSS
// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: spacing.lg,
//     width: '90%',
//     maxWidth: 400,
//   },
//   title: {
//     ...typography.title,
//     color: colors.text,
//     marginBottom: spacing.md,
//     textAlign: 'center',
//   },
//   message: {
//     ...typography.body,
//     color: colors.text,
//     marginBottom: spacing.lg,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cancelButton: {
//     flex: 1,
//     padding: spacing.sm,
//     borderRadius: 8,
//     backgroundColor: colors.border,
//     marginRight: spacing.sm,
//   },
//   cancelButtonText: {
//     ...typography.body,
//     color: colors.text,
//     textAlign: 'center',
//   },
//   deleteButton: {
//     flex: 1,
//     padding: spacing.sm,
//     borderRadius: 8,
//     backgroundColor: colors.error,
//     marginLeft: spacing.sm,
//   },
//   deleteButtonText: {
//     ...typography.body,
//     color: colors.white,
//     textAlign: 'center',
//   },
// }); 