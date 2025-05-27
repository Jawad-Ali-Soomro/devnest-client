import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

export const getUser = async () => {
  try {
    const token = await window.localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.post(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_USER}`,
      {
        token,
      }
    );

    if (response.data && response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    }

    throw new Error("User not found in response");
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
};
