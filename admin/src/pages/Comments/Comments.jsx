import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [allComment, setAllComment] = useState([]);
  const param = useParams();

  const callAllComment = async (id) => {
    await axios
      .get(`http://localhost:8000/api/get-comment-of-product/${id}/`)
      .then((res) => {
        setAllComment(res.data.Comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllComment();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Option</h2>
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
                    <td>Mã Khách Hàng</td>
                    <td>Mã Sản Phẩm</td>
                    <td>Nội Dung</td>
                    <td>Đánh Giá</td>
                    <td>Tình Trạng</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allComment?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.cus_id}</td>
                      <td>{item.product_id}</td>
                      <td>{item.description}</td>
                      <td>{item.rate}</td>
                      <td>{item.status}</td>
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

export default Comments;
