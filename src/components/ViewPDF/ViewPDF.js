import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Box, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ViewPDF({ uri, handleToggleDialog }) {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        if (uri && uri.name && uri.url) {
            setDocs(prev => [...prev, {
                filename: uri.name,
                uri: uri.url,
                fileType: uri.name.split('.').pop()
            }]);
        }

        return () => setDocs([]);
    }, [uri]);



    return (
      <>
     <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          position:'fixed',
          background:'#FFF',
          borderRadius:'40px',
          height:'0.1px',
          width:'0.05%',
          color:'#000',
          top:{xs:2,md:3,lg:3},
          left:{xs:4,md:2,lg:5},
          padding:0,
          padding:2,
          zIndex:999
        }}
        onClick={handleToggleDialog}>
          <HighlightOffIcon/>
        </Box>
       <div className='pdf-container'>
         <DocViewer 
            documents={docs} 
            pluginRenderers={DocViewerRenderers}
            style={{ 
                height: '100%',
                background:'#000'
             }}
        />
       </div>
      </>
    );
}
