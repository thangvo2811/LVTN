import React from "react";
import { useState } from "react";
import { Tabs } from "antd";

import StoreOne from "./StoreOne";
import axios from "axios";
import { useEffect } from "react";
import StoreTwo from "./StoreTwo";

const Tab = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const [allWareHouse, setAllWareHouse] = useState("");

  const callAllWareHouse = async () => {
    await axios
      .get("http://localhost:8000/api/Get-all-warehouse/?id=")
      .then((res) => {
        setAllWareHouse(res.data.product);
      })
      .then((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllWareHouse();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };
  const tabContent = [
    {
      label: `KHO 1`,
      key: 1,
      children: <StoreOne />,
    },
    {
      label: `KHO 2`,
      key: 2,
      children: <StoreTwo />,
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={tabContent.map((tab) => {
          return tab;
        })}
      />
    </div>
  );
};

export default Tab;
