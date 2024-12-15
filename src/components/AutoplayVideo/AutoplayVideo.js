
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Material UI Play Icon
import  './AutoplayVideo.css'
import Footer from '../Footer/Footer';

const AutoplayVideo = ({currentTime,duration,index,videoRef,onVideoPress,url, isMuted,seekVideo ,isVideoPlaying}) => {

  console.log('isVideoPlaying',isVideoPlaying)

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
         {!isVideoPlaying &&(
           <div className="play-button-overlay">
             <PlayArrowIcon style={{ fontSize: 50, color: 'white' }} />
           </div>
         )}

         <div className='video-footer'>
         <Footer 
             currentTime={currentTime} 
             index={index}
             duration={duration}
             seekVideo={seekVideo}
          />
         </div>
       </div>
    </>
 )
}

export default AutoplayVideo