import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";


export default function VideoActions({fullScreen,toggleFullScreen}){

    return (
        <div className="video-actions" onClick={() => toggleFullScreen()}>
        {fullScreen ? (
          <FullscreenIcon
            sx={{
              fontSize: "32px",
              cursor: "pointer",
              filter: "drop-shadow(2px 2px 4px rgba(9, 8, 8, 0.5))",
            }}
          />
        ) : (
          <FullscreenExitIcon
            sx={{
              fontSize: "32px",
              cursor: "pointer",
              filter: "drop-shadow(2px 2px 4px rgba(9, 8, 8, 0.5))",
            }}
          />
        )}
      </div>
    )
}