import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getRoleFromToken = () => {
  const token = Cookies.get("access_token");
  if (token) {
    const decoded = jwtDecode(token);
    //console.log("DECODED " + decoded);
    return decoded.roles[0];
  } else {
    return Cookies.remove("access_token");
  }
};

export const isAdmin = () => {
  return getRoleFromToken() === "ADMIN";
};

export const isMentor = () => {
  return getRoleFromToken() === "MENTOR";
};

export const isLoggedIn = () => {
  const token = Cookies.get("accessToken");
  return token ? true : false;
};

export const isStudent = () => {
  return getRoleFromToken() === "STUDENT";
};
