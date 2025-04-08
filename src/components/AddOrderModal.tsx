import React, { useState, useEffect } from 'react';
// import './AddOrderModal.css'; // Assuming you will create a CSS file for styles
import { Order, DeliveryType } from '../types';
import { colors, spacing, typography } from '../theme'; // Assuming theme.ts is in the parent directory

interface AddOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Order | null;
}

// Define styles with correct types for React
const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  input: {
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
    ...typography.body,
    color: colors.text,
    width: '100%', // Ensure inputs take full width
    boxSizing: 'border-box', // Include padding and border in width
  },
  deliveryTypeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  deliveryTypeButton: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    cursor: 'pointer',
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },
  selectedDeliveryType: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderColor: colors.primary,
  },
  timeInput: { // Style for the datetime-local input
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
    ...typography.body,
    color: colors.text,
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginTop: spacing.md, // Add some space above buttons
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
  submitButton: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
};

export default function AddOrderModal({ visible, onClose, onSubmit, initialData }: AddOrderModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    item: '',
    quantity: 1,
    deliveryType: 'pickup' as DeliveryType,
    // Ensure initial deliveryTime is a valid Date object or string for input type=datetime-local
    deliveryTime: initialData ? new Date(initialData.deliveryTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    date: initialData ? initialData.date : new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    console.log('AddOrderModal initialData:', initialData);
    if (initialData) {
      setFormData({
        clientName: initialData.clientName,
        item: initialData.item,
        quantity: initialData.quantity,
        deliveryType: initialData.deliveryType,
        // Format for datetime-local input
        deliveryTime: new Date(initialData.deliveryTime).toISOString().slice(0, 16),
        date: initialData.date,
      });
    } else {
      // Reset form when modal opens without initialData
      setFormData({
        clientName: '',
        item: '',
        quantity: 1,
        deliveryType: 'pickup',
        deliveryTime: new Date().toISOString().slice(0, 16),
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, visible]); // Depend on visible to reset form

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Submitting form data:', formData);
    if (!formData.clientName || !formData.item || !formData.quantity || !formData.deliveryTime) {
        console.warn('Form validation failed');
        return;
    }
    // Convert deliveryTime back to ISO string before submitting
    const submitData = {
        ...formData,
        deliveryTime: new Date(formData.deliveryTime).toISOString(),
    };
    onSubmit(submitData);
    // onClose(); // Keep modal open on submit? Or close? Decide based on UX.
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
  };
    
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
        ...prev,
        quantity: parseInt(e.target.value) || 0 // Default to 0 if parse fails
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
          ...prev,
          deliveryTime: e.target.value // datetime-local gives value in correct format
      }));
  };

  if (!visible) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}> 
        {/* Use a form element for better semantics and accessibility */}
        <form onSubmit={handleSubmit}>
            <p style={styles.title}>{initialData ? 'Edit Order' : 'Add New Order'}</p>

            <input
              style={styles.input}
              placeholder="Client Name"
              name="clientName" // Add name attribute
              value={formData.clientName}
              onChange={handleInputChange} // Use generic handler
              required // Add basic validation
            />

            <input
              style={styles.input}
              placeholder="Item"
              name="item" // Add name attribute
              value={formData.item}
              onChange={handleInputChange} // Use generic handler
              required
            />

            <input
              style={styles.input}
              placeholder="Quantity"
              name="quantity" // Add name attribute
              type="number"
              value={formData.quantity}
              onChange={handleQuantityChange} // Specific handler for number
              required
              min="1" // Basic validation
            />

            <div style={styles.deliveryTypeContainer}>
              <button
                type="button" // Prevent form submission
                style={{
                    ...styles.deliveryTypeButton,
                    ...(formData.deliveryType === 'pickup' ? styles.selectedDeliveryType : {})
                }}
                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'pickup' }))}
              >
                Pickup
              </button>

              <button
                type="button" // Prevent form submission
                style={{
                    ...styles.deliveryTypeButton, 
                    ...(formData.deliveryType === 'delivery' ? styles.selectedDeliveryType : {})
                }}
                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'delivery' }))}
              >
                Delivery
              </button>
            </div>

            <input
              style={styles.timeInput} // Use specific style
              type="datetime-local"
              name="deliveryTime" // Add name attribute
              value={formData.deliveryTime}
              onChange={handleTimeChange}
              required
            />

            <div style={styles.buttonContainer}>
              <button 
                type="button" // Prevent form submission
                style={{...styles.button, ...styles.cancelButton}} 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" // Submit the form
                style={{...styles.button, ...styles.submitButton}}
              >
                {initialData ? 'Update Order' : 'Add Order'}
              </button>
            </div>
        </form>
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
//     marginBottom: spacing.lg,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 8,
//     padding: spacing.sm,
//     marginBottom: spacing.md,
//     ...typography.body,
//     color: colors.text,
//   },
//   deliveryTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: spacing.md,
//   },
//   deliveryTypeButton: {
//     flex: 1,
//     padding: spacing.sm,
//     borderRadius: 8,
//     backgroundColor: colors.border,
//     marginRight: spacing.sm,
//   },
//   deliveryTypeText: {
//     ...typography.body,
//     color: colors.text,
//     textAlign: 'center',
//   },
//   selectedDeliveryType: {
//     backgroundColor: colors.primary,
//   },
//   selectedDeliveryTypeText: {
//     color: colors.white,
//   },
//   timeButton: {
//     padding: spacing.sm,
//     borderRadius: 8,
//     backgroundColor: colors.border,
//     marginBottom: spacing.md,
//   },
//   timeButtonText: {
//     ...typography.body,
//     color: colors.text,
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
//   submitButton: {
//     flex: 1,
//     padding: spacing.sm,
//     borderRadius: 8,
//     backgroundColor: colors.primary,
//     marginLeft: spacing.sm,
//   },
//   submitButtonText: {
//     ...typography.body,
//     color: colors.white,
//     textAlign: 'center',
//   },
// }); 