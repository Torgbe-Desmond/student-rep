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
  status: 'idle',
  moveItemStatus:'idle',
  mainFolders:[],
  selectedFolders:null,
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
    console.log('reference_id inside get all folders',reference_Id)
    const response = await FolderService.getAllDirForMoving(reference_Id);
    return response;
  } catch (error) {
    let message = error?.response?.message?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAdirectory = createAsyncThunk('folder/getAdirectory', async ({ reference_Id, directoryId }, thunkAPI) => {
  console.log('inside getADirectory',reference_Id, directoryId )
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
        state.fileStatus = 'loading'; // Change status to fileStatus
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.fileStatus = 'succeeded'; // Change status to fileStatus
         const idsToDelete = new Set([
          ...action.payload
         ]);
        state.folders = state.folders.filter(item => !idsToDelete.has(item._id));
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.fileStatus = 'failed'; // Change status to fileStatus
        state.error = action.payload;
      })
      .addCase(moveFile.pending, (state) => {
        state.fileStatus = 'loading'; // Change status to fileStatus
      })
      .addCase(moveFile.fulfilled, (state, action) => {
        state.fileStatus = 'succeeded'; // Change status to fileStatus
        state.files = state.files.filter(file => !action.payload.includes(file._id));
      })
      .addCase(moveFile.rejected, (state, action) => {
        state.fileStatus = 'failed'; // Change status to fileStatus
        state.error = action.payload;
      })
      .addCase(uploadFile.pending, (state) => {
        state.fileStatus = 'loading'; // Change status to fileStatus
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.fileStatus = 'succeeded'; // Change status to fileStatus
        state.folders = [...state.folders, ...action.payload.files];
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.fileStatus = 'failed'; // Change status to fileStatus
        state.error = action.payload;
      })
      .addCase(downloadFile.pending, (state) => {
        state.downloadStatus = 'loading'; // Change status to downloadStatus
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.downloadStatus = 'succeeded'; // Change status to downloadStatus
        state.downloadData = action.payload;
        // Handle download file success
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.downloadStatus = 'failed'; // Change status to downloadStatus
        state.error = action.payload;
      })
      .addCase(deleteFolder.pending, (state) => {
        state.folderStatus = 'loading'; // Change status to folderStatus
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
          state.folderStatus = 'succeeded'; 
          const { filesAndDirectoriesToDelete } = action.payload;
          console.log('filesAndDirectoriesToDelete',filesAndDirectoriesToDelete)
                const idsToDelete = new Set([
              ...filesAndDirectoriesToDelete
          ]);
          state.folders = state.folders.filter(item => !idsToDelete.has(item._id));
       })
    
      .addCase(deleteFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; // Change status to folderStatus
        state.error = action.payload;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(createFolder.pending, (state) => {
        state.folderStatus = 'loading'; // Change status to folderStatus
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folderStatus = 'succeeded'; // Change status to folderStatus
        state.folders = [...state.folders, action.payload];
        const { name, _id } = action.payload
        const newLabelObject = {label:name,path:_id}
        state.moveItemsArray = [...state.moveItemsArray, newLabelObject];
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; // Change status to folderStatus
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(moveFolder.pending, (state) => {
        state.folderStatus = 'loading'; // Ensure status for moveFolder
      })
      .addCase(moveFolder.fulfilled, (state, action) => {
        state.folderStatus = 'succeeded'; // Ensure status for moveFolder
        state.folders = state.folders.filter(folder => !action.payload.includes(folder._id));
      })
      .addCase(moveFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; // Ensure status for moveFolder
        state.error = action.payload;
      })
      .addCase(renameFolder.pending, (state) => {
        state.folderStatus = 'loading'; // Ensure status for renameFolder
      })
      .addCase(renameFolder.fulfilled, (state, action) => {
        state.folderStatus = 'succeeded'; // Ensure status for renameFolder
        const { _id, name } = action.payload;
        state.folders = updateFolderName(state.folders, _id, name);
      })
      .addCase(renameFolder.rejected, (state, action) => {
        state.folderStatus = 'failed'; // Ensure status for renameFolder
        state.error = action.payload;
      })
      .addCase(getAllFolders.pending, (state) => {
        state.moveItemStatus = 'loading'; // Ensure moveItemStatus for getAllFolders
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        state.moveItemStatus = 'succeeded'; // Ensure moveItemStatus for getAllFolders
        state.moveItemsArray = [...action.payload];
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        state.moveItemStatus = 'failed'; // Ensure moveItemStatus for getAllFolders
        state.error = action.payload;
      })
      .addCase(getMainDirectories.pending, (state) => {
        state.status = 'loading'; // Ensure status for getMainDirectories
      })
      .addCase(getMainDirectories.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Ensure status for getMainDirectories
        const combinedFolders = [...state.folders, ...action.payload];
        state.folders = Array.from(new Set(combinedFolders.map(folder => JSON.stringify(folder)))).map(folder => JSON.parse(folder));
        let keepInStorage = storeIdsAndNameOfMainFoldersInStorage(action.payload);
        localStorage.setItem('mainFolder', JSON.stringify(keepInStorage));
      })
      .addCase(getMainDirectories.rejected, (state, action) => {
        state.status = 'failed'; // Ensure status for getMainDirectories
        state.error = action.payload;
      })

      .addCase(getAdirectory.pending, (state) => {
        state.status = 'loading'; // Ensure status for getAdirectory
      })
      .addCase(getAdirectory.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Ensure status for getAdirectory
        state.folders = action.payload
      })
      .addCase(getAdirectory.rejected, (state, action) => {
        state.status = 'failed'; // Ensure status for getAdirectory
        state.error = action.payload;
      })
     
      // .addCase(downloadFile.pending, (state) => {
      //   state.downloadStatus = 'loading'; // Ensure status for getFilesInFolder
      // })
      // .addCase(downloadFile.fulfilled, (state, action) => {
      //   state.downloadStatus = 'succeeded'; // Ensure status for getFilesInFolder
      // })
      // .addCase(downloadFile.rejected, (state, action) => {
      //   state.downloadStatus = 'failed'; // Ensure status for getFilesInFolder
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
  