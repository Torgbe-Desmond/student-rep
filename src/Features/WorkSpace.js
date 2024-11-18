import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FileService } from '../Services/FileService';
import { FolderService } from '../Services/FolderService';


const initialState = {
  folders: [],
  downloadData:null,
  folderStatus:[],
  fileStatus:[],
  sidebarItems: [],
  moveItemsArray:[],
  downloadStatus:'idle',
  receiveFileStatus:'idle',
  status: 'idle',
  moveItemStatus:'idle',
  generateSecretCodeStatus:'idle',
  mainFolders:[],
  selectedFolders:null,
  secreteCode:'',  
  error: null,
  message: '',
};

export const deleteFile = createAsyncThunk('file/deleteFile', async ({directoryId,fileIds}, thunkAPI) => {
  try {
    const response = await FileService.deleteFile(directoryId,fileIds);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const updateFolderName = (folders, id, newName) => {
  const folderIndex = folders.findIndex(folder => folder._id === id);
  if (folderIndex !== -1) {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex] = {
      ...updatedFolders[folderIndex],
      name: newName,
    };
    return updatedFolders;
  }
  return folders;
}


const storeIdsAndNameOfMainFoldersInStorage = (folders)=>{
  let mainFoldersIdsAndName = []
  folders.forEach(element => {
      const { name,_id } = element;
      mainFoldersIdsAndName.push({name,_id})
  });

  return mainFoldersIdsAndName;
}


export const moveFile = createAsyncThunk('file/moveFile', async ({reference_Id,DirectoriesToMoveFileTo, FileIds, DirectoryFileIsMoveFrom}, thunkAPI) => {
  try {
    const response = await FileService.moveFile(reference_Id,DirectoriesToMoveFileTo, FileIds, DirectoryFileIsMoveFrom);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const uploadFile = createAsyncThunk('file/uploadFile', async ({ reference_Id, directoryId, formData }, thunkAPI) => {
  try {
    const response = await FileService.uploadFiles(reference_Id, directoryId, formData);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});


export const downloadFile = createAsyncThunk('file/downloadFile', async ({reference_Id,fileId}, thunkAPI) => {
  try {
    const response = await FileService.downloadFile(reference_Id,fileId);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const receiveFile = createAsyncThunk('file/receiveFile', async ({reference_Id,secreteCode}, thunkAPI) => {
  try {
    const response = await FileService.receiveFile(reference_Id,secreteCode);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const generateSecretCode = createAsyncThunk('file/generateSecretCode', async ({reference_Id,fileIds,name}, thunkAPI) => {
  try {
    const response = await FileService.generateSecretCode(reference_Id,fileIds,name);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});


// Files <---------------------------------------------------------------------------------->


export const getMainDirectories = createAsyncThunk('folder/getMainDirectories', async ({ reference_Id }, thunkAPI) => {
  try {
    const response = await FolderService.getMainDirectories(reference_Id);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteFolder = createAsyncThunk('folder/deleteFolder', async ({currentDirectory, folderIds }, thunkAPI) => {
  try {
    const response = await FolderService.deleteDirectory(currentDirectory,folderIds);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const createFolder = createAsyncThunk('folder/createFolder', async ({ reference_Id, directoryId, folderData }, thunkAPI) => {
  try {
    const response = await FolderService.createDirectory(reference_Id,directoryId, folderData);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const moveFolder = createAsyncThunk('folder/moveFolder', async ({reference_Id,directoriesToMove, directoryToMoveTo}, thunkAPI) => {
  try {
    const response = await FolderService.moveDirectories(reference_Id,directoriesToMove, directoryToMoveTo);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const renameFolder = createAsyncThunk('folder/renameFolder', async ({reference_Id,_id,name}, thunkAPI) => {
  try {
    const response = await FolderService.renameDirectory(reference_Id,_id,name);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllFolders = createAsyncThunk('folder/getAllFolders', async ({reference_Id}, thunkAPI) => {
  try {
    const response = await FolderService.getAllDirForMoving(reference_Id);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAdirectory = createAsyncThunk('folder/getAdirectory', async ({ reference_Id, directoryId }, thunkAPI) => {
  try {
    const response = await FolderService.getAdirectory(reference_Id, directoryId);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});


const fileFolderSlice = createSlice({
  name: 'fileFolder',
  initialState,
  reducers: {
    clearFilesAndFolders:(state)=>{
      state.folders= []
    },
    clearStudentFilesAndFolders:(state)=>{
      state.studentFilesAndFoldrs = [];
    },
    clearMoveItemsArray:(state)=>{
      state.moveItemsArray = [];
    },
    setSelectedFolders: (state, action) => {
        const nonDuplicate = Array.from(new Set(action.payload)); 
        state.selectedFolders = nonDuplicate;    
    },
    clearSelectedIds:(state)=>{
      state.selectedFolders = [];
   },

  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFile.pending, (state) => {
        state.fileStatus = 'loading'; 
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.fileStatus = 'succeeded'; 
         const idsToDelete = new Set([
          ...action.payload
         ]);
        state.folders = state.folders.filter(item => !idsToDelete.has(item._id));
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.fileStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(moveFile.pending, (state) => {
        state.fileStatus = 'loading'; 
      })
      .addCase(moveFile.fulfilled, (state, action) => {
        state.fileStatus = 'succeeded'; 
        state.folders = state.folders.filter(file => !action.payload.includes(file._id));
      })
      .addCase(moveFile.rejected, (state, action) => {
        state.fileStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(uploadFile.pending, (state) => {
        state.fileStatus = 'loading'; 
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.fileStatus = 'succeeded';
        state.folders = [...state.folders, ...action.payload.files];
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.fileStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(downloadFile.pending, (state) => {
        state.downloadStatus = 'loading'; 
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.downloadStatus = 'succeeded'; 
        state.downloadData = action.payload;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.downloadStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(deleteFolder.pending, (state) => {
        state.folderStatus = 'loading'; 
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
          state.folderStatus = 'succeeded'; 
          const { filesAndDirectoriesToDelete } = action.payload;
                const idsToDelete = new Set([
              ...filesAndDirectoriesToDelete
          ]);
          state.folders = state.folders.filter(item => !idsToDelete.has(item._id));
       })
    
      .addCase(deleteFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; 
        state.error = action.payload;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(createFolder.pending, (state) => {
        state.folderStatus = 'loading'; 
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folderStatus = 'succeeded'; 
        state.folders = [...state.folders, action.payload];
        const { name, _id } = action.payload
        const newLabelObject = {label:name,path:_id}
        state.moveItemsArray = [...state.moveItemsArray, newLabelObject];
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; 
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(moveFolder.pending, (state) => {
        state.folderStatus = 'loading'; 
      })
      .addCase(moveFolder.fulfilled, (state, action) => {
        state.folderStatus = 'succeeded'; 
        state.folders = state.folders.filter(folder => !action.payload.includes(folder._id));
      })
      .addCase(moveFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(renameFolder.pending, (state) => {
        state.folderStatus = 'loading'; 
      })
      .addCase(renameFolder.fulfilled, (state, action) => {
        state.folderStatus = 'succeeded'; 
        const { _id, name } = action.payload;
        state.folders = updateFolderName(state.folders, _id, name);
      })
      .addCase(renameFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(getAllFolders.pending, (state) => {
        state.moveItemStatus = 'loading';
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        state.moveItemStatus = 'succeeded'; 
        state.moveItemsArray = [...action.payload];
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        state.moveItemStatus = 'failed'; 
        state.error = action.payload;
      })
      .addCase(getMainDirectories.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(getMainDirectories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const combinedFolders = [...state.folders, ...action.payload];
        state.folders = Array.from(new Set(combinedFolders.map(folder => JSON.stringify(folder)))).map(folder => JSON.parse(folder));
        let keepInStorage = storeIdsAndNameOfMainFoldersInStorage(action.payload);
        localStorage.setItem('mainFolder', JSON.stringify(keepInStorage));
      })
      .addCase(getMainDirectories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getAdirectory.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(getAdirectory.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.folders = action.payload
      })
      .addCase(getAdirectory.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.payload;
      })

      
      .addCase(receiveFile.pending, (state) => {
        state.receiveFileStatus = 'loading'; 
      })
      .addCase(receiveFile.fulfilled, (state, action) => {
        state.receiveFileStatus = 'succeeded';
      })
      .addCase(receiveFile.rejected, (state, action) => {
        state.receiveFileStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(generateSecretCode.pending, (state) => {
        state.generateSecretCodeStatus = 'loading';
      })
      .addCase(generateSecretCode.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.generateSecretCodeStatus = action.payload.secreteCode;
      })
      .addCase(generateSecretCode.rejected, (state, action) => {
        state.generateSecretCodeStatus = 'failed';
        state.error = action.payload;
      })

      // .addCase(downloadFile.pending, (state) => {
      //   state.downloadStatus = 'loading';
      // })
      // .addCase(downloadFile.fulfilled, (state, action) => {
      //   state.downloadStatus = 'succeeded'; 
      // })
      // .addCase(downloadFile.rejected, (state, action) => {
      //   state.downloadStatus = 'failed';
      //   state.error = action.payload;
      // });

      
  
    }})
  
  export const { 
    clearFilesAndFolders,
    clearMoveItemsArray,
    clearStudentFilesAndFolders,
    setSelectedFolders,
    clearSelectedIds
  } = fileFolderSlice.actions;

  export default fileFolderSlice.reducer;
  