import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FileService } from "../Services/FileService";
import { FolderService } from "../Services/FolderService";
import { isFulfilled, isRejected } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  downloadData: null,
  folderStatus: [],
  fileStatus: [],
  sidebarItems: [],
  moveItemsArray: [],
  downloadStatus: "idle",
  receiveFileStatus: "idle",
  deleteFileStatus: "idle",
  status: "idle",
  moveItemStatus: "idle",
  generateSecretCodeStatus: "idle",
  searchStatus: "idle",
  mainFolders: [],
  selectedFolders: null,
  secreteCode: "",
  error: null,
  globalStatus: false,
  statusCode: null,
  message: "",
  workspaceErrorMessage: "",
  searchResults: [],
  searchHistory: [],
};

const updateFolderName = (folders, id, newName) => {
  const folderIndex = folders.findIndex((folder) => folder._id === id);
  if (folderIndex !== -1) {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex] = {
      ...updatedFolders[folderIndex],
      name: newName,
    };
    return updatedFolders;
  }
  return folders;
};

const updateFileUrl = (folders, id, url) => {
  const fileIndex = folders.findIndex((folder) => folder._id === id);
  if (fileIndex !== -1) {
    const updatedFolders = [...folders];
    updatedFolders[fileIndex] = {
      ...updatedFolders[fileIndex],
      url,
    };
    return updatedFolders;
  }
  return folders;
};

const updateName = (folders, path, label) => {
  const folderIndex = folders.findIndex((folder) => folder.path === path);
  if (folderIndex !== -1) {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex] = {
      ...updatedFolders[folderIndex],
      label,
    };
    return updatedFolders;
  }
  return folders;
};

const storeIdsAndNameOfMainFoldersInStorage = (folders) => {
  let mainFoldersIdsAndName = [];
  folders.forEach((element) => {
    const { name, _id } = element;
    mainFoldersIdsAndName.push({ name, _id });
  });

  return mainFoldersIdsAndName;
};

const handleAsyncActions = (state, action, statusField, stateField) => {
  const { success, error } = action.payload || {};
  if (action.type.endsWith("pending")) {
    state[statusField] = "loading";
  } else if (action.type.endsWith("fulfilled")) {
    const { data, message, status } = action.payload;
    state[statusField] = "succeeded";
    state.globalStatus = status;
    state.message = message;
    if (Array.isArray(data)) {
      state[stateField] = [...state[stateField], ...data];
    } else if (!Array.isArray(data)) {
      state[stateField] = [...state[stateField], data];
    }
  } else if (action.type.endsWith("rejected")) {
    state[statusField] = "failed";
    state.globalStatus = success;
    state.workspaceErrorMessage = error?.message;
    state.statusCode = error?.code;
  }
};

const handleFolderActions = (state, action, statusField, stateField) => {
  const { success, error } = action.payload || {};
  if (action.type.endsWith("pending")) {
    state[statusField] = "loading";
  } else if (action.type.endsWith("fulfilled")) {
    const { data, message, status } = action.payload;
    state[statusField] = "succeeded";
    state.globalStatus = status;
    state.message = message;
    if (stateField) {
      if (Array.isArray(data)) {
        state[stateField] = [...new Set([...data])];
      } else if (!Array.isArray(data)) {
        state[stateField] = [...new Set([...state[stateField], data])];
      }
    }
  } else if (action.type.endsWith("rejected")) {
    state[statusField] = "failed";
    state.globalStatus = success;
    state.workspaceErrorMessage = error?.message;
    state.statusCode = error?.code;
  }
};

// ---------------------------------------------------------------------------------------------

export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async ({ directoryId, fileIds }, thunkAPI) => {
    try {
      const response = await FileService.deleteFile(directoryId, fileIds);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const moveFile = createAsyncThunk(
  "file/moveFile",
  async (
    { reference_Id, DirectoriesToMoveFileTo, FileIds, DirectoryFileIsMoveFrom },
    thunkAPI
  ) => {
    try {
      const response = await FileService.moveFile(
        reference_Id,
        DirectoriesToMoveFileTo,
        FileIds,
        DirectoryFileIsMoveFrom
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async ({ reference_Id, directoryId, formData }, thunkAPI) => {
    try {
      const response = await FileService.uploadFiles(
        reference_Id,
        directoryId,
        formData
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "file/downloadFile",
  async ({ reference_Id, fileId }, thunkAPI) => {
    try {
      const response = await FileService.downloadFile(reference_Id, fileId);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const receiveFile = createAsyncThunk(
  "file/receiveFile",
  async ({ reference_Id, secreteCode }, thunkAPI) => {
    try {
      const response = await FileService.receiveFile(reference_Id, secreteCode);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const generateSecretCode = createAsyncThunk(
  "file/generateSecretCode",
  async ({ reference_Id, fileIds, name }, thunkAPI) => {
    try {
      const response = await FileService.generateSecretCode(
        reference_Id,
        fileIds,
        name
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Files <---------------------------------------------------------------------------------->

export const getMainDirectories = createAsyncThunk(
  "folder/getMainDirectories",
  async ({ reference_Id }, thunkAPI) => {
    try {
      const response = await FolderService.getMainDirectories(reference_Id);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folder/deleteFolder",
  async ({ currentDirectory, folderIds }, thunkAPI) => {
    try {
      const response = await FolderService.deleteDirectory(
        currentDirectory,
        folderIds
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createFolder = createAsyncThunk(
  "folder/createFolder",
  async ({ reference_Id, directoryId, folderData }, thunkAPI) => {
    try {
      const response = await FolderService.createDirectory(
        reference_Id,
        directoryId,
        folderData
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const moveFolder = createAsyncThunk(
  "folder/moveFolder",
  async ({ reference_Id, directoriesToMove, directoryToMoveTo }, thunkAPI) => {
    try {
      const response = await FolderService.moveDirectories(
        reference_Id,
        directoriesToMove,
        directoryToMoveTo
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const renameFolder = createAsyncThunk(
  "folder/renameFolder",
  async ({ reference_Id, _id, name }, thunkAPI) => {
    try {
      const response = await FolderService.renameDirectory(
        reference_Id,
        _id,
        name
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllFolders = createAsyncThunk(
  "folder/getAllFolders",
  async ({ reference_Id }, thunkAPI) => {
    try {
      const response = await FolderService.getAllDirForMoving(reference_Id);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAdirectory = createAsyncThunk(
  "folder/getAdirectory",
  async ({ reference_Id, directoryId }, thunkAPI) => {
    try {
      const response = await FolderService.getAdirectory(
        reference_Id,
        directoryId
      );
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------------------------------------------------------------

export const searchFilesOrDirectories = createAsyncThunk(
  "folder/search",
  async ({ reference_Id, searchTerm }, thunkAPI) => {
    try {
      const response = await FolderService.search(reference_Id, searchTerm);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSearchHistory = createAsyncThunk(
  "folder/searchHistory",
  async ({ reference_Id }, thunkAPI) => {
    try {
      const response = await FolderService.searchHistory(reference_Id);
      return response;
    } catch (error) {
      let message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const fileFolderSlice = createSlice({
  name: "fileFolder",
  initialState,
  reducers: {
    clearFilesAndFolders: (state) => {
      state.folders = [];
    },
    clearStudentFilesAndFolders: (state) => {
      state.studentFilesAndFoldrs = [];
    },
    clearMessage: (state) => {
      state.message = "";
    },
    clearErrorMessage: (state) => {
      state.workspaceErrorMessage = "";
    },
    clearMoveItemsArray: (state) => {
      state.moveItemsArray = [];
    },
    setSelectedFolders: (state, action) => {
      const nonDuplicate = Array.from(new Set(action.payload));
      state.selectedFolders = nonDuplicate;
    },
    clearSelectedIds: (state) => {
      state.selectedFolders = [];
    },
    updateFile: (state, action) => {
      const { id, url } = action.payload;
      state.folders = updateFileUrl(state.folders, id, url);
    },
    clearSearchTerm: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder

      //search History
      .addCase(getSearchHistory.pending, (state) =>
        state.searchHistory = []
      )
      .addCase(getSearchHistory.fulfilled, (state, action) => {
        const { data,status } = action.payload;
        state.searchHistory = data;
        state.globalStatus = status;
      })
      .addCase(getSearchHistory.rejected, (state, action) =>
        handleAsyncActions(state, action, "searchStatus")
      )

      //Search
      .addCase(searchFilesOrDirectories.pending, (state) =>
        handleAsyncActions(
          state,
          { type: "file/search/pending" },
          "searchStatus"
        )
      )
      .addCase(searchFilesOrDirectories.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        state.searchResults = data;
        state.globalStatus = status;
        state.message = message;
      })
      .addCase(searchFilesOrDirectories.rejected, (state, action) =>{ state.searchHistory = []})

      // Delete File
      .addCase(deleteFile.pending, (state) =>
        handleAsyncActions(
          state,
          { type: "file/deleteFile/pending" },
          "fileStatus"
        )
      )
      .addCase(deleteFile.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        const idsToDelete = new Set(data);
        state.folders = state.folders.filter(
          (item) => !idsToDelete.has(item._id)
        );
        state.globalStatus = status;
        state.message = message;
      })
      .addCase(deleteFile.rejected, (state, action) =>
        handleAsyncActions(state, action, "fileStatus")
      )

      // Move File
      .addCase(moveFile.pending, (state) =>
        handleAsyncActions(
          state,
          { type: "file/moveFile/pending" },
          "fileStatus"
        )
      )
      .addCase(moveFile.fulfilled, (state, action) => {
        handleAsyncActions(state, action, "fileStatus", "folders");
        const idsToDelete = new Set(action.payload.data);
        state.folders = state.folders.filter(
          (item) => !idsToDelete.has(item._id)
        );
      })
      .addCase(moveFile.rejected, (state, action) =>
        handleAsyncActions(state, action, "fileStatus")
      )

      // Upload File
      .addCase(uploadFile.pending, (state) =>
        handleAsyncActions(
          state,
          { type: "file/uploadFile/pending" },
          "fileStatus"
        )
      )
      .addCase(uploadFile.fulfilled, (state, action) => {
        handleAsyncActions(state, action, "fileStatus", "folders");
      })
      .addCase(uploadFile.rejected, (state, action) =>
        handleAsyncActions(state, action, "fileStatus")
      )

      // Receive File
      .addCase(receiveFile.pending, (state) =>
        handleAsyncActions(
          state,
          { type: "file/receiveFile/pending" },
          "receiveFileStatus"
        )
      )
      .addCase(receiveFile.fulfilled, (state, action) => {
        const { message, status } = action.payload;
        state.globalStatus = status;
        state.message = message;
      })
      .addCase(receiveFile.rejected, (state, action) =>
        handleAsyncActions(state, action, "receiveFileStatus")
      )

      // Generate Secret Code
      .addCase(generateSecretCode.pending, (state) =>
        handleAsyncActions(
          state,
          { type: "file/generateSecretCode/pending" },
          "generateSecretCodeStatus"
        )
      )
      .addCase(generateSecretCode.fulfilled, (state, action) => {
        const {
          data: { secreteCode },
          message,
          status,
        } = action.payload;
        state.globalStatus = status;
        state.secreteCode = secreteCode;
        state.message = message;
      })
      .addCase(generateSecretCode.rejected, (state, action) =>
        handleAsyncActions(state, action, "generateSecretCodeStatus")
      )

      // .addCase(downloadFile.pending, (state) => {
      //   state.downloadStatus = "loading";
      // })
      // .addCase(downloadFile.fulfilled, (state, action) => {
      //   state.downloadStatus = "succeeded";
      //   state.downloadData = action.payload;
      // })
      // .addCase(downloadFile.rejected, (state, action) => {
      //   state.downloadStatus = "failed";
      //   state.error = action.payload;
      // })

      // Delete Folder
      .addCase(deleteFolder.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/deleteFolder/pending" },
          "folderStatus"
        )
      )
      .addCase(deleteFolder.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        const idsToDelete = new Set(data);
        state.folders = state.folders.filter(
          (item) => !idsToDelete.has(item._id)
        );
        state.globalStatus = status;
        state.message = message;
      })
      .addCase(deleteFolder.rejected, (state, action) =>
        handleFolderActions(state, action, "folderStatus")
      )

      // Create Folder
      .addCase(createFolder.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/createFolder/pending" },
          "folderStatus"
        )
      )
      .addCase(createFolder.fulfilled, (state, action) => {
        handleFolderActions(state, action, "folderStatus", "folders");
        const newFolder = action.payload.data;
        const newLabelObject = { label: newFolder?.name, path: newFolder?._id };
        state.moveItemsArray = [...state.moveItemsArray, newLabelObject];
      })
      .addCase(createFolder.rejected, (state, action) =>
        handleFolderActions(state, action, "folderStatus")
      )

      // Move Folder
      .addCase(moveFolder.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/moveFolder/pending" },
          "folderStatus"
        )
      )
      .addCase(moveFolder.fulfilled, (state, action) => {
        handleFolderActions(state, action, "folderStatus", "folders");
        const { data, message, status } = action.payload;
        state.folders = state.folders.filter(
          (folder) => !data.includes(folder._id)
        );
      })
      .addCase(moveFolder.rejected, (state, action) =>
        handleFolderActions(state, action, "folderStatus")
      )

      // Rename Folder
      .addCase(renameFolder.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/renameFolder/pending" },
          "folderStatus"
        )
      )
      .addCase(renameFolder.fulfilled, (state, action) => {
        handleFolderActions(state, action, "folderStatus", "folders");
        const { data, message, status } = action.payload;
        state.folders = updateFolderName(state.folders, data._id, data.name);
        state.moveItemsArray = updateName(
          state.moveItemsArray,
          data._id,
          data.name
        );
      })
      .addCase(renameFolder.rejected, (state, action) =>
        handleFolderActions(state, action, "folderStatus")
      )

      // Get All Folders
      .addCase(getAllFolders.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/getAllFolders/pending" },
          "moveItemStatus"
        )
      )
      .addCase(getAllFolders.fulfilled, (state, action) => {
        handleFolderActions(state, action, "moveItemStatus", "moveItemsArray");
      })
      .addCase(getAllFolders.rejected, (state, action) =>
        handleFolderActions(state, action, "moveItemStatus")
      )

      // Get Main Directories
      .addCase(getMainDirectories.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/getMainDirectories/pending" },
          "status"
        )
      )
      .addCase(getMainDirectories.fulfilled, (state, action) => {
        handleFolderActions(state, action, "status", "folders");
        const combinedFolders = [...state.folders, ...action.payload.data];
        state.folders = Array.from(
          new Set(combinedFolders.map((folder) => JSON.stringify(folder)))
        ).map((folder) => JSON.parse(folder));
        let keepInStorage = storeIdsAndNameOfMainFoldersInStorage(
          action.payload.data
        );
        localStorage.setItem("mainFolder", JSON.stringify(keepInStorage));
      })
      .addCase(getMainDirectories.rejected, (state, action) =>
        handleFolderActions(state, action, "status")
      )

      // Get A Directory
      .addCase(getAdirectory.pending, (state) =>
        handleFolderActions(
          state,
          { type: "file/getAdirectory/pending" },
          "status"
        )
      )
      .addCase(getAdirectory.fulfilled, (state, action) => {
        handleFolderActions(state, action, "status", "folders");
      })
      .addCase(getAdirectory.rejected, (state, action) =>
        handleFolderActions(state, action, "status")
      );
  },
});

export const {
  clearFilesAndFolders,
  clearMoveItemsArray,
  clearStudentFilesAndFolders,
  setSelectedFolders,
  clearSelectedIds,
  updateFile,
  clearMessage,
  clearErrorMessage,
  clearSearchTerm,
} = fileFolderSlice.actions;

export default fileFolderSlice.reducer;
