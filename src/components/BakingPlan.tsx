import React from 'react';
// import './BakingPlan.css'; // Assuming you will create a CSS file for styles
import { BakingStep } from '../types';
import { colors, spacing, typography, shadows } from '../theme';

interface BakingPlanProps {
  steps: BakingStep[];
}

// Define styles with correct types for React
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    boxShadow: `0 ${shadows.card.shadowOffset.height}px ${shadows.card.shadowRadius}px ${shadows.card.shadowColor}`,
  },
  step: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${spacing.sm}px 0`,
    borderBottom: `1px solid ${colors.border}`,
  },
  timeContainer: {
    width: 80,
    paddingRight: spacing.sm,
  },
  time: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    ...typography.body,
    color: colors.text,
  },
};

export default function BakingPlan({ steps }: BakingPlanProps) {
  console.log('BakingPlan rendered with steps:', steps);

  // Ensure steps is an array before mapping
  if (!Array.isArray(steps)) {
    console.error('BakingPlan received non-array steps:', steps);
    return <div style={styles.container}>Error: Invalid steps data.</div>;
  }

  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        // Add validation for step object and time property
        if (!step || typeof step.time !== 'string') {
          console.error('Invalid step data:', step);
          return <div key={index} style={styles.step}>Invalid step</div>;
        }
        
        let time = 'Invalid Time';
        try {
          time = new Date(step.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch (e) {
          console.error('Error formatting time for step:', step, e);
        }

        return (
          <div key={index} style={styles.step}>
            <div style={styles.timeContainer}>
              <span style={styles.time}>{time}</span>
            </div>
            <div style={styles.descriptionContainer}>
              <span style={styles.description}>{step.description || 'No description'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Remove StyleSheet and convert styles to CSS
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: spacing.md,
//     ...shadows.card,
//   },
//   step: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: spacing.sm,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   timeContainer: {
//     width: 80,
//     paddingRight: spacing.sm,
//   },
//   time: {
//     ...typography.body,
//     color: colors.primary,
//     fontWeight: '600',
//   },
//   descriptionContainer: {
//     flex: 1,
//   },
//   description: {
//     ...typography.body,
//     color: colors.text,
//   },
// }); 