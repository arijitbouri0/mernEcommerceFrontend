import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const SORT_OPTIONS = [
  { value: 'low-to-high', label: 'Price: Low to High' },
  { value: 'high-to-low', label: 'Price: High to Low' },
];

export default function ProductSort({ onSortChange }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (sortOption) => {
    setOpen(null);
    if (sortOption) {
      onSortChange(sortOption);
    }
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Choose Option
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} onClick={() => handleClose(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

ProductSort.propTypes = {
  onSortChange: PropTypes.func,
};
