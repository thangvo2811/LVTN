import React, { useEffect, useState } from "react";

import axios from "axios";
import AddBrand from "./AddBrand/AddBrand";
import { Button, Modal } from "antd";
import "./style.scss";

const Brand = () => {
  const [allBrand, setAllBrand] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameBrand, setNameBrand] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const callAllBrand = async () => {
    await axios
      .get("http://localhost:8000/api/get-brand/")
      .then((res) => {
        console.log(res.data);
        setAllBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callDeleteBrand = async (id, e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/delete-brand/${id}/`)
      .then((res) => {
        console.log(res);
        callAllBrand();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddBrand = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:8000/api/get-create-brand`, {
        nameBrand: "",
      })
      .then((res) => {
        if (!nameBrand) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(false);
  };
  useEffect(() => {
    callAllBrand();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Brand</h2>
        <div>
          <Button type="primary" onClick={showModal}>
            Add Brand
          </Button>
          <Modal
            title="NEW BRAND"
            open={isModalOpen}
            onOk={(e) => handleAddBrand(e, e.target.value)}
            onCancel={handleCancel}
            width={300}
          >
            <div className="form-input">
              <form>
                <input type="text" placeholder="Name" />
              </form>
            </div>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allBrand?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <span className="card__body__edit">
                          <i className="bx bxs-edit"></i>
                        </span>
                        <span
                          className="card__body__delete"
                          onClick={(e) => callDeleteBrand(item.id, e)}
                        >
                          <i className="bx bx-trash"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
