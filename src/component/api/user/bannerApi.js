
import axios from "../axios";

// Get banners, optionally filter by showOn & active
export const getBanner = async ({ showOn, active } = {}) => {
  const params = {};

  if (showOn) params.showOn = showOn;
  if (active !== undefined) params.active = active;

  const response = await axios.get(`/user/banner`, { params });
  return response.data;
};

