import axiosInstance from "./AxiosInstance";

// Common headers for API requests
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

// Function to move a file
async function moveFile(reference_Id, DirectoriesToMoveFileTo, FileIds, DirectoryFileIsMoveFrom) {
    try {
        const response = await axiosInstance.post(`/${reference_Id}/movefiles`, {
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
    try {
        const response = await axiosInstance.delete(`/delete-files`, {
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
        console.log(reference_Id, directoryId)
        const response = await axiosInstance.post(`/${reference_Id}/directories/${directoryId}/files`,formData,
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
        const response = await axiosInstance.get(`/download/${fileId}`, {
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
        const response = await axiosInstance.get(`/${referenceId}/directories/${directoryId}/stuff`, {
         
            headers,
        });
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

// Function to receive share files
async function receiveFile(referenceId,secreteCode) {
    console.log(referenceId,secreteCode)
    try {
        const response = await axiosInstance.post(`/${referenceId}/share`, 
            { secreteCode},
            {  headers  },
        );
        return response.data;
    } catch (error) {
        throw error; // Optional: handle or rethrow the error
    }
}

// Function to generate secret code
async function generateSecretCode(referenceId, fileIds,name) {
    try {
        const response = await axiosInstance.post(
            `/${referenceId}/share/files`,
            { fileIds,name },
            { headers }  
        );
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error; 
    }
}



// Function to move files from Subscriptions to downloads
async function moveFilesFromSubscriptionsToDownload(referenceId, directoryId) {
    try {
        const response = await axiosInstance.post(`/${referenceId}/move-to-downloads`, null, {
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
    receiveFile,
    generateSecretCode,
    uploadFiles,
    downloadFile,
    getFilesInDirectory,
    moveFilesFromSubscriptionsToDownload
};
