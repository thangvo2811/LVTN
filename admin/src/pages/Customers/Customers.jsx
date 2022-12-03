import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  const callAllCustomer = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-user")
      .then((res) => {
        setAllCustomer(res.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllCustomer();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Khách Hàng</h2>
        <div className="page-header__add">
          <i className="bx bx-plus"></i>
          <div>Add New</div>
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
                    <td>Email</td>
                    <td>FullName</td>
                    <td>PhoneNumber</td>
                    <td>Avatar</td>
                    <td>BirthDay</td>
                    <td>Address</td>
                  </tr>
                </thead>
                <thead>
                  {allCustomer
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.fullname}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.avatar}</td>
                        <td>{item.birthday}</td>
                        <td>{item.address}</td>
                        <td>
                          <span className="card__body__edit">
                            <i className="bx bxs-edit"></i>
                          </span>
                          <span className="card__body__delete">
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

export default Customers;
