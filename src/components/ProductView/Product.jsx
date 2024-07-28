import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { findProducts } from '../../Redux/Product/Action';
import ProductCard from './ProductCard';
import ProductSort from './ProductSort';
import ProductFilter from './ProductFilter';
import { MoonLoader } from 'react-spinners';

export default function Product() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { products, loading, error } = useSelector((state) => state.product);

    const [openFilter, setOpenFilter] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(findProducts({
            page: currentPage,
            category: selectedCategory,
            minPrice,
            maxPrice,
            sort: selectedSortOption,
        }));
    }, [dispatch, currentPage, selectedCategory, minPrice, maxPrice, selectedSortOption]);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleSortChange = (sortOption) => {
        setSelectedSortOption(sortOption);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePriceChange = (minPrice, maxPrice) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setCurrentPage(1);
    };

   

    const handleNextPage = () => {
        const totalPages = Math.ceil(products.totalElements / products.size);
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const clearFilters = () => {
        setMinPrice(0);
        setMaxPrice(200);
        setSelectedSortOption('');
        setSelectedCategory('all');
        setCurrentPage(1);
        dispatch(findProducts());
    };

    return (
        <Container className='p-28'>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Products
            </Typography>

            <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 5 }}
            >
                <ProductFilter
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    onCategoryChange={handleCategoryChange}
                    onPriceChange={handlePriceChange}
                />
                <ProductSort onSortChange={handleSortChange} />
            </Stack>

            {loading ? (
                <div className="loader">
                    <MoonLoader size={40} />
                </div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <Grid container spacing={3}>
                    {products?.content?.map((product) => (
                        <Grid key={product._id} xs={12} sm={6} md={3}>
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                Img={product.imageUrl}
                                price={product.price}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <div className="flex justify-center items-center mt-4">
                <button
                    className="btn btn-secondary mx-2"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <button
                    className="btn btn-secondary mx-2"
                    onClick={handleNextPage}
                    disabled={products?.data?.length < products.size}
                >
                    Next
                </button>
            </div>
        </Container>
    );
}
