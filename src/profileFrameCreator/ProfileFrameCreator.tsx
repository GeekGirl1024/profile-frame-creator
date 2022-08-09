
import React, { createRef, ReactElement, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, FileInput, Image as GrommetImage, Text, ThemeContext } from 'grommet';
import BasicUkraineImage from '../images/basic-ukraine.png';
import CircleUkraineImage from '../images/circle-ukraine.png';
import LeftBottomCircleUkraine from '../images/left-bottom-circle-ukraine.png';
import RightBottomFrameUkraine from '../images/right-bottom-frame-ukraine.png';
import CircleAbortionIsHealthcare from '../images/circle-abortion-is-healthcare.png';
import CircleMyBodyMyChoice from '../images/circle-my-body-my-choice.png';
import CircleBillFosterForCongress from '../images/circle-bill-foster-for-congress.png';
import './ProfileFrameCreator.css'

/**
  Class representing the ProfileFrameCreator.
*/
class ProfileFrameCreator extends React.Component {
  private containerRef = createRef<HTMLDivElement>();

  private profileImage = new Image();
  private profileImageSet = false;
  private backgroundImage = new Image();
  private canvasElement: HTMLCanvasElement | undefined;
  private canvasContext: CanvasRenderingContext2D | undefined;
  private fileReader = new FileReader();
  private filesElement: HTMLInputElement | undefined;
  private downloadLinkElement: HTMLAnchorElement | undefined;

  private frames: string[] = [
    BasicUkraineImage,
    CircleUkraineImage,
    LeftBottomCircleUkraine,
    RightBottomFrameUkraine,
    CircleAbortionIsHealthcare,
    CircleMyBodyMyChoice,
    CircleBillFosterForCongress
  ];
  

  /**
   * Creates a ProfileFrameCreator
   */
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.canvasElement = this.containerRef?.current?.querySelector(".profile-canvas") as HTMLCanvasElement;
    this.canvasContext = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.profileImage.addEventListener("load", ((event: Event) => {
      this.SetProfileImage();
      
    }).bind(this));

    this.backgroundImage.style.filter="blur(5px)";

    this.fileReader.addEventListener("load", ((event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result){
        this.backgroundImage.src = event.target.result as string;
        this.profileImage.src = event.target.result as string;
        
      }
    }).bind(this));

    this.filesElement = this.containerRef?.current?.querySelector('.files-input') as HTMLInputElement;

    this.downloadLinkElement = document.createElement('a');
    this.downloadLinkElement.download = "my-image.png";
  }

  SetProfileImage(){
    if (!this.canvasContext){
      return;
    }

    this.canvasContext.fillStyle="#FFFFFF";
    this.canvasContext.clearRect(0,0,512,512);
    if (!this.profileImageSet){
      return;
    }

    let width = 512;
    let height = 512;
    let offsetx = 0;
    let offsety = 0;
    
    this.canvasContext.fillStyle="#555555";
    this.canvasContext.fillRect(0,0,512,512);
    if (this.profileImage.height == this.profileImage.width){
    } else if (this.profileImage.height > this.profileImage.width) {
      width = this.profileImage.width / this.profileImage.height * 512;
      offsetx = (512 - width)/2;
    } else {
      height = this.profileImage.height / this.profileImage.width * 512;
      offsety = (512 - height)/2;
    }
    
    this.canvasContext.drawImage(this.profileImage, offsetx, offsety, width, height);
  }

  DownloadImage(){
    let imageDataUrl = this.canvasElement?.toDataURL("image/png")
    if (this.downloadLinkElement && imageDataUrl){
      this.downloadLinkElement.href = imageDataUrl;
      this.downloadLinkElement.click();
    }
  }

  LoadProfilePix(){
    if (!this.filesElement || !this.filesElement.files) {
      return;
    }
    let file = this.filesElement.files[0];
    if (file){
      this.profileImageSet = true;
      this.fileReader.readAsDataURL( file );
    } else {
      this.profileImage.src = "";
      this.profileImageSet = false;
      this.SetProfileImage();
    }
    
  }

  SetFrame(htmlImageElement: HTMLImageElement) {
    if (this.profileImageSet) {
      this.SetProfileImage();
      this.canvasContext?.drawImage(htmlImageElement, 0, 0, 512, 512);
    }
  }
  
  /**
   * renders the component
   */
  render() {
    return (
      <div className='profile-frame-creator-container' ref={this.containerRef} >
        <h1>Profile Frame Creator</h1>
        <Box direction="row" align='center' >
          <Box direction='column' className='profile-frame-container'>
            {
              this.frames.map(
                (src:string) => {
                  return <GrommetImage
                      key={src}
                      className="profile-frame"
                      width="100"
                      height="100"
                      src={src}
                      onClick={(element) => { this.SetFrame(element.target as HTMLImageElement); }}
                      >
                    </GrommetImage>
                }
              )
            }
          </Box>
          <Box direction='column' width="530px">
            <Box direction='row-reverse' className='controls-container'>
            <Button className='download-button' onClick={() => { this.DownloadImage(); }}>Download File</Button>
            <FileInput
              messages = {{ dropPrompt: "Select Profile Picture" }}
              className = "files-input"
              onChange={() => { this.LoadProfilePix() } } ></FileInput>
            </Box>
            <canvas className='profile-canvas' width="512" height="512"></canvas>
          </Box>
        </Box>
      </div>
    )
  }
}

export default ProfileFrameCreator;