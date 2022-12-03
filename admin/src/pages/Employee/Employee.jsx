import React from "react";

const Employee = () => {
  const idAdmin = localStorage.getItem("admin");

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Nhân Viên</h2>
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
                    <td>Phân Quyền</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead></thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
