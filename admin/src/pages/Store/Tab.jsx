import React from "react";
import { useState } from "react";
import { Tabs } from "antd";

import StoreOne from "./StoreOne";
import axios from "axios";
import { useEffect } from "react";
import StoreTwo from "./StoreTwo";

const Tab = () => {
  const [tabPosition, setTabPosition] = useState("left");
  // const [allBranch, setAllBranch] = useState([]);

  // const callAllBranch = async () => {
  //   await axios
  //     .get("http://localhost:8000/api/get-warehouse/")
  //     .then((res) => {
  //       setAllBranch(res.data.Warehouse);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   callAllBranch();
  // }, []);

  // const idBranch = allBranch.map((item, index) =>
  //   item.id === 1 ? item.id : null
  // );
  // console.log("ID BRANCH", idBranch);
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
