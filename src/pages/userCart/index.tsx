import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import React from "react";
// import CartDetails from "./CartDetails";
const CartDetails = React.lazy(() => import("./CartDetails"));

const CartDetailsIndex = () => {
  return (
    <div>
      <h1 className="bold text-2xl text-center my-3">My Cart</h1>
      {/* <CartDetails /> */}
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <CartDetails />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
export default CartDetailsIndex;
