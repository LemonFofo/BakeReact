import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'; // For Tooltip on Today button
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today'; // Icon for Today button
import dayjs, { Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { spacing } from '../theme';

// Extend dayjs with plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);
dayjs.extend(advancedFormat);

interface DateStripProps {
  selectedDate: Date;
  onChangeDate: (newDate: Date) => void;
}

const DATE_BUTTON_SIZE = 50; // Define size for circular buttons

const DateStrip: React.FC<DateStripProps> = ({ selectedDate, onChangeDate }) => {
  const [dates, setDates] = useState<Dayjs[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate the 7 days around the selected date
  useEffect(() => {
    const currentDayjs = dayjs(selectedDate);
    const daysToShow: Dayjs[] = [];
    for (let i = -3; i <= 3; i++) {
      daysToShow.push(currentDayjs.add(i, 'day'));
    }
    setDates(daysToShow);

    // Scroll the selected date into view
    setTimeout(() => {
        const selectedButton = containerRef.current?.querySelector(`[data-date="${currentDayjs.format('YYYY-MM-DD')}"]`);
        selectedButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 100); // Timeout ensures DOM is updated

  }, [selectedDate]);

  const handleDateSelect = (date: Dayjs) => {
    onChangeDate(date.toDate());
  };

  const handleGoToToday = () => {
    onChangeDate(new Date()); // Pass today's date
  };

  const handleDatePickerChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChangeDate(newValue.toDate());
    }
    setIsDatePickerOpen(false);
  };

  const getDayLabel = (date: Dayjs): string => {
    if (date.isToday()) return 'Today';
    if (date.isYesterday()) return 'Yesterday';
    if (date.isTomorrow()) return 'Tomorrow';
    return date.format('ddd'); // e.g., 'Mon'
  };

  const selectedDateString = dayjs(selectedDate).format('YYYY-MM-DD');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: spacing.xl }}>
      {/* Go To Today Button */}
      <Tooltip title="Go to Today">
        <IconButton 
            onClick={handleGoToToday}
            aria-label="go to today"
            size="small"
            sx={{ mr: spacing.sm, border: '1px solid', borderColor: 'divider' }} // Add border
        >
            <TodayIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto', // Enable horizontal scroll
          py: spacing.sm,
          gap: spacing.sm,
          flexGrow: 1,
          // Hide scrollbar visually (optional)
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For IE/Edge
        }}
      >
        {dates.map((date) => {
          const dateString = date.format('YYYY-MM-DD');
          const isSelected = dateString === selectedDateString;
          return (
            <Button
              key={dateString}
              variant={isSelected ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleDateSelect(date)}
              data-date={dateString} // For scrolling into view
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', // Center content vertically
                minWidth: DATE_BUTTON_SIZE, // Ensure width
                width: DATE_BUTTON_SIZE,    // Fixed width
                height: DATE_BUTTON_SIZE,   // Fixed height
                p: 0,                     // Reset padding
                borderRadius: '50%',       // Make it circular
                // Custom styling for selected state if needed beyond variant="contained"
                ...(isSelected && {
                  // Example: add thicker border or different background
                })
              }}
            >
              <Box sx={{ fontSize: '0.7rem', fontWeight: 'medium', lineHeight: 1.2 }}>{getDayLabel(date)}</Box>
              <Box sx={{ fontSize: '0.9rem', fontWeight: 'bold', lineHeight: 1.2 }}>{date.format('D')}</Box>
            </Button>
          );
        })}
      </Box>
      <IconButton 
        onClick={() => setIsDatePickerOpen(true)} 
        aria-label="select date"
        sx={{ ml: spacing.sm }}
      >
        <CalendarMonthIcon />
      </IconButton>
      
      {/* Invisible DatePicker controlled by state */}
      {isDatePickerOpen && (
         <DatePicker
            // We don't want to *show* the input field, just open the modal
            slots={{ textField: () => null }}
            open={isDatePickerOpen}
            onClose={() => setIsDatePickerOpen(false)}
            value={dayjs(selectedDate)}
            onChange={handleDatePickerChange}
         />
      )}
    </Box>
  );
};

export default DateStrip; 