import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const CATEGORY_OPTIONS = ['all', 'Men', 'Women', 'Sports', 'Kids', 'Accessories'];

export default function ProductFilter({ openFilter, onOpenFilter, onCloseFilter, onCategoryChange, onPriceChange }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handlePriceChange = () => {
    onPriceChange(minPrice, maxPrice);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="left"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            {/* <Icon icon="eva:close-fill" /> */}
          </IconButton>
        </Stack>

        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Category</Typography>
            <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
              {CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </Stack>
        </Stack>
        <Typography variant="subtitle2" sx={{ px: 3 }}>Price</Typography>
        <div className="flex justify-between items-center px-3">
          <input
            type="number"
            min="0"
            className="input input-bordered input-primary w-1/2"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="mx-2">to</span>
          <input
            type="number"
            min="0"
            className="input input-bordered input-primary w-1/2"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={handlePriceChange}
          >
            Apply
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ProductFilter.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  onCategoryChange: PropTypes.func,
  onPriceChange: PropTypes.func,
};
