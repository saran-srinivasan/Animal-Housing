import Axios from "../utils/Axios";

export const createStudy = async (newStudy: unknown) => {
  try {
    const response = await Axios.post("/study", newStudy);
    console.log("Study created successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error creating study:", error);
    throw error;
  }
};

export const getAllStudies = async () => {
  try {
    const response = await Axios.get("/study");
    console.log("All studies fetched successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching studies:", error);
    throw error;
  }
};

export const getStudybyId = async (id: unknown) => {
  try {
    const response = await Axios.get(`/study/${id}`, { params: id });
    console.log("Study updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating study:", error);
    throw error;
  }
};

export const fetchGLRstudyData = async (token: unknown) => {
  try {
    const response = await Axios.get("/fetchGLRstudyData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("All studies fetched successfully from GLR:", response);
    return response;
  } catch (error) {
    console.error("Error fetching studies from GLR:", error);
    throw error;
  }
};

export const updateStudy = async (id: unknown, updatedStudy: unknown) => {
  try {
    const response = await Axios.put(`/study`, updatedStudy);
    console.log("Study updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating study:", error);
    throw error;
  }
};

export const deleteStudy = async (id: unknown) => {
  try {
    const response = await Axios.delete(`/study/${id}`);
    console.log("Study deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting study:", error);
    throw error;
  }
};
