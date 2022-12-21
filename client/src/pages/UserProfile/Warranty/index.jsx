import React, { useCallback, useEffect, useState } from "react";
import WarrantyItem from "../../../components/WarrantyItem";
import axios from "axios";

const Warranty = () => {
  const [allWarranty, setAllWarranty] = useState([]);
  const newCustomer = localStorage.getItem("User");

  const callAllWarranty = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-all-warranty-by-cus/${newCustomer}/`)
      .then((res) => {
        setAllWarranty(res.data.warranty);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);
  useEffect(() => {
    callAllWarranty();
  }, [callAllWarranty]);
  return (
    <>
      <div className="order">
        <div className="order__desc">
          <div className="order__desc__item">
            {allWarranty?.map((item, index) => {
              return <WarrantyItem item={item}></WarrantyItem>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Warranty;
