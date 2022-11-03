import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userLogin";

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.get("/api/get-user-login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};
