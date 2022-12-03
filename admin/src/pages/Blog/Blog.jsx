import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteBlog from "./DeleteBlog/DeleteBlog";
import AddBlog from "./AddBlog/AddBlog";
import UpdateBlog from "./UpdateBlog/UpdateBlog";

const Blog = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllBlog = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-blog/")
      .then((res) => {
        setAllBlog(res.data.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllBlog();
  }, [reloadPage]);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Blog</h2>
        <AddBlog parentCallback={callbackFunction}></AddBlog>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên</td>
                    <td>Mô Tả</td>
                    <td>Hình Ảnh</td>
                    <td>Tình Trạng</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allBlog?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.Description}</td>
                      <td>{item.img}</td>
                      <td>{item.sta_id}</td>

                      <td>
                        <div className="card__body__features">
                          <span className="card__body__edit">
                            <UpdateBlog
                              id={item.id}
                              descBlog={item.Description}
                              statusBlog={item.sta_id}
                              nameBlog={item.name}
                              parentCallback={callbackFunction}
                            ></UpdateBlog>
                          </span>
                          <span className="card__body__delete">
                            <DeleteBlog
                              item={item.id}
                              img={item.img}
                              parentCallback={callbackFunction}
                            ></DeleteBlog>
                          </span>
                        </div>
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

export default Blog;
