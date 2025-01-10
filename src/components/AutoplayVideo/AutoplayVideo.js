
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Material UI Play Icon
import  './AutoplayVideo.css'

const AutoplayVideo = ({videoRef,onVideoPress,url, isMuted ,isVideoPlaying}) => {

  return (
    <>
         <div className="video-container" onClick={onVideoPress}>
         <video
           ref={videoRef}
           type="video/mp4"
           className='video__player'
           src={url}
           alt='meme-me'
           loop
           muted={isMuted}
           playsInline
           preload="metadata"
         />
         {!isVideoPlaying && (
           <div className="play-button-overlay">
             <PlayArrowIcon style={{ fontSize: 50, color: 'white' }} />
           </div>
         )}
       </div>
    </>
 )
}

export default AutoplayVideo