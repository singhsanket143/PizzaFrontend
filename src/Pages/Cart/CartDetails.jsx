import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails, removeProductFromCart } from "../../Redux/Slices/CartSlice";
import Layout from "../../Layouts/Layout";
import { Link } from "react-router-dom";

function CartDetails() {

    const [cartDetails, setCartDetails] = useState();
    const { cartsData } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    async function fetchCartDetails() {
        console.log("fetching cart details")
        const response = await dispatch(getCartDetails());
        console.log(response);
        setCartDetails(response?.payload?.data?.data);
    }

    async function handleRemove(productId) {
        // Remove product from cart
        const response = await dispatch(removeProductFromCart(productId));
        if(response?.payload?.data?.success) {
            console.log("removed successfully")
            dispatch(getCartDetails()); // Fetch cart details and update state
        }
    }
    useEffect(() => {
        console.log("re-rendering")
        fetchCartDetails();
    }, [cartsData?.items?.length]);


    return (
        <Layout>
        <section className="py-8 antialiased md:py-16 ">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Card details
          </h2>
          {cartDetails?.items?.length > 0 ? (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 ">
              <div className="flex-none w-full mx-auto lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartDetails?.items.map((item) => (
                    <div key={item._id} className="p-4 text-gray-900 rounded-lg shadow-sm bg-gradient-to-r from-amber-50 to-orange-300 md:p-6 border">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img
                          className="hidden w-20 h-20 dark:block rounded-md"
                          src={item?.product?.productImage}
                          alt={item?.product?.productName}
                        />
                        <div className="flex-1 w-full min-w-0 md:order-2 md:max-w-md">
                          <p className="text-base font-medium text-gray-900 hover:underline">
                            <Link to={`/product/${item?._id}`}>
                              {`${item?.product?.productName}, ${item?.product?.description}, Category: ${item?.product?.category}`}
                            </Link>
                          </p>
                          <p> ₹{item?.product?.price} </p>

                          <div className="flex items-center gap-4">
                            {item._id && (
                              <button
                                type="button"
                                onClick={() => handleRemove(item?.product?._id)}
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
                <div className="p-4 space-y-4 text-gray-800 border rounded-lg shadow-sm bg-gradient-to-r from-amber-50 to-orange-300 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 ">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        
                        {
                            cartDetails?.items.map((item) => {
                                return (
                                    <dd key={item?.product?._id} className="text-base font-medium ">
                                        {item?.product?.productName} x {item?.quantity}

                                        <p>{item?.product?.price} x {item?.quantity}</p>
                                    </dd>
                                )
                            })
                        }

                        
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <dt className="text-base font-bold ">Total</dt>
                      <dd className="text-base font-bold ">
                        ₹
                        {cartDetails?.items.length === 0
                          ? ''
                          : cartDetails?.items.reduce((acc, item) => acc + item?.quantity*item?.product?.price , 0) }
                      </dd>
                    </dl>
                  </div>
                  {cartDetails?.items.length > 0 && (
                    <Link
                      to={'/order'}
                      className="flex justify-center text-white bg-yellow-400 border border-yellow-500 rounded-md hover:bg-yellow-700"
                    >
                      Proceed to Checkout
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {' '}
                      or{' '}
                    </span>
                    <Link
                      to={'/'}
                      className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            'Cart is empty'
          )}
        </div>
        </section>
        </Layout>
    )
}

export default CartDetails;