import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import OrderList from "../components/orderList";
import {
  getAllOrders,
  getOrderbyID,
  cancelOrder,
  updatedOrder,
  downloadReports

} from "../store/slice/sliceOrder";
import Spinner from "../components/layout/Spinner";

const Orders = () => {
  const dispatch = useDispatch();
  // Obtener la URL actual
  const { orders, order, loading, value } = useSelector(
    (state) => state.orderSlice
  );
  console.log("loading", value);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const handleShowDetail = (item) => {
    dispatch(getOrderbyID(item.id));

    console.log(order);
  };

  const handleCancelOrder = (item) => {
    dispatch(cancelOrder(item.id));

    console.log(order);
  };
  const handleUpdateOrder = (item) => {
    dispatch(updatedOrder(item.id));

    console.log(order);
  };
  const downloadReport2 = () => {
    dispatch(downloadReports());

    console.log(order);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <OrderList
          orders={orders}
          handleShowDetail={handleShowDetail}
          handleCancelOrder={handleCancelOrder}
          handleUpdateOrder={handleUpdateOrder}
          downloadReports={downloadReport2}
        />
      )}
    </>
  );
};

export default Orders;
