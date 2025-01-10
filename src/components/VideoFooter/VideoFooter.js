import { useState } from 'react';
import { Avatar } from '@mui/material'
import './VideoFooter.css'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function VideoFooter({channel,caption,likes,shares,avatarSrc}){
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Function to render caption with expand/collapse functionality
  const renderCaption = () => {
    const maxLength = 50; // Number of characters to show before truncating

    if (caption.length <= maxLength) {
      return <p>{caption}</p>;
    }

    return (
      <p>
        {isExpanded 
          ? caption 
          : `${caption.slice(0, maxLength)}...`}
        <span 
          onClick={() => setIsExpanded(!isExpanded)}
          className="caption-toggle"
        >
          {isExpanded ? ' Show less' : ' Show more'}
        </span>
      </p>
    );
  }

  return (
    <div className="videoFooter"> 
        <div className="videoFooter__left">
           
            <div className="videoFooter__captionInfo">
                {renderCaption()}
            </div>
        </div>
        <div className="videoFooter__right">

            <div className='videoFooter__icons'>
                <div className="videoFooter__text">
                    <Avatar src={avatarSrc}/>
                    <h3>
                        {channel}
                    </h3>
                </div>
                <div className="videoFooter__iconItem">
                    <ChatBubbleOutlineOutlinedIcon sx={{fontSize:'48px'}}/>
                    <p>{shares || 0}</p>
                </div>
                <div className="videoFooter__iconItem">
                    <FavoriteOutlinedIcon sx={{fontSize:'48px'}}/>
                    <p>{likes || 0}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoFooter