import Axios from "../utils/Axios";

export const createTestRoom = async (newTestRoom: unknown) => {
  try {
    const response = await Axios.post("/test-room", newTestRoom);
    console.log("TestRoom created successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error creating TestRoom:", error);
    throw error;
  }
};

export const getAllTestRoom = async () => {
  try {
    const response = await Axios.get("/test-room");
    console.log("All Testroom fetched successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching Testroom:", error);
    throw error;
  }
};

export const updateTestRoom = async (
  testRoom: unknown,
  updatedTestRoom: unknown
) => {
  try {
    const response = await Axios.put(
      `/test-room/updateTestRoom`,
      updatedTestRoom
    );
    console.log("TestRoom updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating TestRoom:", error);
    throw error;
  }
};

export const deleteTestRoom = async (testRoom: unknown) => {
  try {
    const response = await Axios.delete(
      `/test-room/deleteTestRoom/${testRoom}`
    );
    console.log("TestRoom deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting TestRoom:", error);
    throw error;
  }
};

export const getTotalAnimals = async (data: unknown) => {
  try {
    const response = await Axios.post(`/test-room/total-animals`, data);
    console.log("All Testroom fetched successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching Testroom:", error);
    throw error;
  }
};
