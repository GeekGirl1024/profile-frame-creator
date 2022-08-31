import React, { createRef, ReactElement, RefObject } from 'react';
import { Box, Button, FileInput, Image as GrommetImage, Text, ThemeContext } from 'grommet';
import BasicUkraineImage from '../images/basic-ukraine.png';
import CircleUkraineImage from '../images/circle-ukraine.png';
import LeftBottomCircleUkraine from '../images/left-bottom-circle-ukraine.png';
import RightBottomFrameUkraine from '../images/right-bottom-frame-ukraine.png';
import CircleAbortionIsHealthcare from '../images/circle-abortion-is-healthcare.png';
import CircleMyBodyMyChoice from '../images/circle-my-body-my-choice.png';
import CircleBillFosterForCongress from '../images/circle-bill-foster-for-congress.png';
import './ProfileFrameCreator.css'
import { CustomFrame } from '../customFrame/CustomFrame';

class ProfileFrameCreatorProps {

}

class ProfileFrameCreatorState {
  frames: string[] | null = null;
  title: string | null = null;
  render: boolean = false;
}

/**
  Class representing the ProfileFrameCreator.
*/
class ProfileFrameCreator extends React.Component<ProfileFrameCreatorProps, ProfileFrameCreatorState> {
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

  private title: string = "Profile Frame Creator";
  

  /**
   * Creates a ProfileFrameCreator
   */
  constructor(props: any) {
    super(props);
    this.state = { frames: null, title: null, render:false };
  }

  async GetConfig() {
    await fetch('/static/config.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(function(response){
        return response.json();
    }).then(((myConfig: any)=>{
        if (myConfig.files) {
          let myFrames = myConfig.files as string[];
          if (myFrames) {
            this.frames = myFrames;
          }  
        }
        let myTitle = myConfig.title as string;
        if (myTitle) {
          this.title = myTitle;
        }
    }).bind(this)).finally((()=>{
      this.setState({frames:this.frames, title:this.title, render: true});
    }).bind(this));
  }

  componentDidMount(){
    this.canvasElement = this.containerRef?.current?.querySelector(".profile-canvas") as HTMLCanvasElement;
    this.canvasContext = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
    
    this.profileImage.addEventListener("load", ((event: Event) => {
      this.SetProfileImage();
      
    }).bind(this));

    this.fileReader.addEventListener("load", ((event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result){
        this.backgroundImage.src = event.target.result as string;
        this.profileImage.src = event.target.result as string;
        
      }
    }).bind(this));

    this.filesElement = this.containerRef?.current?.querySelector('.files-input') as HTMLInputElement;
    this.downloadLinkElement = document.createElement('a');
    this.downloadLinkElement.download = "my-image.png";

    this.GetConfig();
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
      <div className={ this.state.render ? 'profile-frame-creator-container' : 'profile-frame-creator-container display-none'} ref={this.containerRef} >
        <h1>{ this.state.title }</h1>
        <Box direction="row" align='center' >
          <Box direction='column' className='profile-frame-container'>
          
          <CustomFrame text='wheeeeeee' ></CustomFrame>
            {
              this.state.frames?.map(
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