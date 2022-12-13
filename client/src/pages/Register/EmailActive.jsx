import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmailActive = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();
  return (
    <div>
      <div>Kích Hoạt Tài Khoản {userEmail}</div>
      <Link to={`/login/${userEmail}`}>Kích Hoạt</Link>
    </div>
  );
};

export default EmailActive;
