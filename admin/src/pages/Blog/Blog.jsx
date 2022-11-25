import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [allBlog, setAllBlog] = useState([]);
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
  }, []);

  const handleDeleteBlog = async (id, e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/delete-blog/${id}`)
      .then((res) => {
        console.log(res);
        callAllBlog();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Blog</h2>
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
                    <td>Description</td>
                    <td>Status</td>
                    <td>Img</td>
                    <td>Name</td>
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allBlog?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.Description}</td>
                      <td>{item.sta_id}</td>
                      <td>{item.img}</td>
                      <td>{item.name}</td>

                      <td>
                        <span className="card__body__edit">
                          <i className="bx bxs-edit"></i>
                        </span>
                        <span
                          className="card__body__delete"
                          onClick={(e) => handleDeleteBlog(item.id, e)}
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

export default Blog;
