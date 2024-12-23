import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Button } from '@mui/material';

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
     <Button 
        sx={{
          position:'fixed',
          background:'#FFF',
          color:'#000',
          top:{xs:9.5,md:10,lg:14.5},
          left:{xs:4,md:2,lg:5},
          paddingLeft:2,
          zIndex:999
        }}
        onClick={handleToggleDialog}>Go Back</Button>
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
