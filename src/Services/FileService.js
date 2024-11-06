import axiosInstance from "./AxiosInstance";

// const API_BASE_URL = 'https://file-transfer-app-backend.onrender.com/api/v1';
const API_BASE_URL = 'https://file-transfer-app-backend.onrender.com/api/v1';

// Common headers for API requests
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

// Function to move a file
async function moveFile(reference_Id, DirectoriesToMoveFileTo, FileIds, DirectoryFileIsMoveFrom) {
    console.log(reference_Id, DirectoriesToMoveFileTo, FileIds, DirectoryFileIsMoveFrom);
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/${reference_Id}/movefiles`, {
            DirectoriesToMoveFileTo,
            FileIds,
            DirectoryFileIsMoveFrom
        });
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

// Function to delete a file
async function deleteFile(directoryId, fileIds) {
    console.log(directoryId, fileIds)
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/delete-files`, {
            data: {
                directoryId,
                fileIds
            },
            headers: headers
        });
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

// Function to upload a file
async function uploadFiles(reference_Id, directoryId, formData) {
    try {
        const response = await axiosInstance.post(
            `${API_BASE_URL}/${reference_Id}/directories/${directoryId}/stuff`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to download a file
async function downloadFile(reference_Id, fileId) {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/download/${fileId}`, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

// Function to get files in a particular directory
async function getFilesInDirectory(referenceId, directoryId) {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/${referenceId}/directories/${directoryId}/stuff`, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

// Function to move files from Subscriptions to downloads
async function moveFilesFromSubscriptionsToDownload(referenceId, directoryId) {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/${referenceId}/move-to-downloads`, null, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

export const FileService = {
    moveFile,
    deleteFile,
    uploadFiles,
    downloadFile,
    getFilesInDirectory,
    moveFilesFromSubscriptionsToDownload
};
