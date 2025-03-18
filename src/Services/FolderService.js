import axiosInstance from "./AxiosInstance";

// Function to create a directory
async function createDirectory(reference_Id, directoryId, folderData) {
  const response = await axiosInstance.post(
    `/${reference_Id}/directories/${directoryId}`,
    folderData
  );
  return response.data;
}

// Function to get all directories
async function getMainDirectories(reference_Id) {
  const response = await axiosInstance.get(`/${reference_Id}/directories`);
  return response.data;
}

// Function to delete a directory
async function deleteDirectory(currentDirectory, folderIds) {
  const response = await axiosInstance.delete(`/delete-directory`, {
    data: { directoryIds: folderIds, parentDirectory: currentDirectory },
  });
  return response.data;
}

// Function to get all directories for moving
async function getAllDirForMoving(reference_Id) {
  const response = await axiosInstance.get(`/${reference_Id}/directories/all`);
  return response.data;
}

// Function to get a directory by ID
async function getAdirectory(reference_Id, directoryId) {
  const response = await axiosInstance.get(
    `/${reference_Id}/directories/${directoryId}`
  );
  return response.data;
}

// Function to get all subscriptions
async function getAllSubscriptions(reference_Id) {
  const response = await axiosInstance.get(`/${reference_Id}/sharing`);
  return response.data;
}

// Function to move directories
async function moveDirectories(
  reference_Id,
  directoriesToMove,
  directoryToMoveTo
) {
  const response = await axiosInstance.post(
    `/${reference_Id}/moveDirectories`,
    { directoriesToMove, directoryToMoveTo }
  );
  return response.data;
}

// Function to get subscriptions by directory ID
async function getSubscriptionsByDirectoryId(reference_Id, directoryId) {
  const response = await axiosInstance.get(
    `/${reference_Id}/sharing/${directoryId}/sub`
  );
  return response.data;
}

// Function to rename a directory
async function renameDirectory(reference_Id, _id, name) {
  const response = await axiosInstance.post(
    `/${reference_Id}/renameDirectory`,
    { _id, name }
  );
  return response.data;
}

// Function to subscribe to a subscription
async function subscribeToSubscription(data) {
  const response = await axiosInstance.post(`/subscribed`, data);
  return response.data;
}
// /:reference_Id/search/:searchItem
// Function to search file files or directories
async function search(reference_Id, searchTerm) {
  const response = await axiosInstance.get(
    `/${reference_Id}/search/${searchTerm}`
  );
  return response.data;
}

async function searchHistory(reference_Id) {
  const response = await axiosInstance.get(`/${reference_Id}/search`);
  return response.data;
}

async function breadCrumb(reference_Id, directoryId) {
  console.log(reference_Id, directoryId)
  const response = await axiosInstance.get(
    `${reference_Id}/bread-crumb/${directoryId}`
  );
  return response.data;
}

export const FolderService = {
  createDirectory,
  getMainDirectories,
  deleteDirectory,
  getAllDirForMoving,
  getAdirectory,
  moveDirectories,
  getAllSubscriptions,
  getSubscriptionsByDirectoryId,
  renameDirectory,
  subscribeToSubscription,
  search,
  searchHistory,
  breadCrumb,
};
