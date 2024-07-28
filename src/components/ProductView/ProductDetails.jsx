import { useEffect, useState } from 'react';
import { RadioGroup, Dialog } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../Redux/Product/Action';
import { MoonLoader } from 'react-spinners';
import {addItemToCart} from '../../Redux/Cart/Action'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const sizeGuide = {
  S: { length: '27"', width: '18"' },
  M: { length: '28"', width: '20"' },
  L: { length: '29"', width: '22"' },
  XL: { length: '30"', width: '24"' },
  XXL: { length: '31"', width: '26"' }
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(findProductsById({ productId: id }));
  }, [dispatch, id]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color);
      if (Array.isArray(product.sizes)) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize(product.sizes);
      }
    }
  }, [product]);

  if (loading) return <div className="flex justify-center items-center h-full py-28">
    <MoonLoader />
  </div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return null; // Add a null check for product

  const sizes = Array.isArray(product.sizes) ? product.sizes : [product.sizes];

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addItemToCart({productId:id,size:selectedSize.name}))
    //   toast.success("Item added to the cart Succesfully",{position:'top-center',autoClose:5000})
    // })
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="bg-white py-20">
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full min-w-10 object-cover object-center m-2"
              />
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

              <form onSubmit={handleAddToCart} className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    {product.color && (
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroup.Option
                          key={product.color}
                          value={product.color}
                          aria-label={product.color}
                          className={({ focus, checked }) =>
                            classNames(
                              focus && checked ? 'ring ring-offset-1' : '',
                              !focus && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              'h-8 w-8 rounded-full border border-black border-opacity-10',
                              `bg-${product.color.toLowerCase()}`
                            )}
                          />
                        </RadioGroup.Option>
                      </RadioGroup>
                    )}
                  </fieldset>
                </div>
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </button>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    {sizes && (
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {sizes.map((size) => (
                          <RadioGroup.Option
                            key={size._id}
                            value={size}
                            className={({ focus }) =>
                              classNames(
                                size.quantity > 0
                                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                focus ? 'ring-2 ring-indigo-500' : '',
                                'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                              )
                            }
                          >
                            {({ checked, focus }) => (
                              <>
                                <span>{size.name}</span>
                                {size.quantity > 0 ? (
                                  <span
                                    className={classNames(
                                      checked ? 'border-indigo-500' : 'border-transparent',
                                      focus ? 'border' : 'border-2',
                                      'pointer-events-none absolute -inset-px rounded-md'
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    )}
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showSizeGuide} onClose={() => setShowSizeGuide(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <Dialog.Title className="text-lg font-medium text-gray-900">Size Guide</Dialog.Title>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Width</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(sizeGuide).map((size) => (
                    <tr key={size}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sizeGuide[size].length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sizeGuide[size].width}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={() => setShowSizeGuide(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <ToastContainer/>
    </>
  );
};

export default ProductDetails;
