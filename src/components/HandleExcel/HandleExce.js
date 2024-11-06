import { read, utils } from 'xlsx';

export const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            const jsonData = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            
            // Process jsonData to extract and format the data
            const editedJsonData = jsonData.reduce((acc, value) => {
                const { 'Index Number': indexNumber, 'Student Name': studentName, 'Student Number': studentNumber } = value;
                acc.push({ indexNumber, studentName, studentNumber });
                return acc;
            }, []);

            resolve(editedJsonData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};
