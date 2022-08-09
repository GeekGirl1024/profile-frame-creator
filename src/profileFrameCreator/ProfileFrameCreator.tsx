
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Box, Image as GrommetImage } from 'grommet';
import BasicUkraineImage from '../images/basic-ukraine.png';
import CircleUkraineImage from '../images/circle-ukraine.png';
import LeftBottomCircleUkraine from '../images/left-bottom-circle-ukraine.png';
import RightBottomFrameUkraine from '../images/right-bottom-frame-ukraine.png';
import CircleAbortionIsHealthcare from '../images/circle-abortion-is-healthcare.png';
import './ProfileFrameCreator.css'

/**
  Class representing the ProfileFrameCreator.
*/
class ProfileFrameCreator extends React.Component {

  private profileImage = new Image();
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
    CircleAbortionIsHealthcare];
  

  /**
   * Creates a ProfileFrameCreator
   */
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.canvasElement = document.getElementById('mycanvas') as HTMLCanvasElement;
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

    this.filesElement = document.querySelector('#myFile') as HTMLInputElement;

    this.downloadLinkElement = document.createElement('a');
    this.downloadLinkElement.download = "my-image.png";
  }

  SetProfileImage(){
    if (!this.canvasContext){
      return;
    }
    let width = 512;
    let height = 512;
    let offsetx = 0;
    let offsety = 0;
    this.canvasContext.clearRect(0,0,512,512);
    this.canvasContext.fillStyle="#555555";
    this.canvasContext.fillRect(0,0,512,512);
    if (this.profileImage.height == this.profileImage.width){
    } else if (this.profileImage.height > this.profileImage.width) {
      width = this.profileImage.width / this.profileImage.height * 512;
      offsetx = (512 - width)/2;

      /*
      this.canvasContext.drawImage(this.backgroundImage, (512-width*3)/2, (512-height*3), width*3, height*3);
      
      this.canvasContext.save();
      this.canvasContext.filter = "blur(10px)";
      let backgroundDataUrl = this.canvasElement?.toDataURL();
      
      this.canvasContext.restore();
      //this.canvasContext.putImageData(backgroundDataUrl, 0, 0);
      */
      
    } else {
      height = this.profileImage.height / this.profileImage.width * 512;
      offsety = (512 - height)/2;

      /*
      this.canvasContext.drawImage(this.backgroundImage, (512-width*3)/2, (512-height*3), width*3, height*3);
      
      this.canvasContext.save();
      this.canvasContext.filter = "blur(10px)";
      let backgroundDataUrl = this.canvasContext.getImageData(0,0,512,512);
      this.canvasContext.restore();
      this.canvasContext.putImageData(backgroundDataUrl, 0, 0);

      */
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
    this.fileReader.readAsDataURL( file );
  }

  SetFrame(htmlImageElement: HTMLImageElement) {
    if (this.profileImage.src) {
      this.SetProfileImage();
      this.canvasContext?.drawImage(htmlImageElement, 0, 0, 512, 512);
    }
  }
  
  /**
   * renders the component
   */
  render() {
    return (
      <>
          <h1>Profile Frame Creator</h1>
          <Box direction="row" >
            <Box direction='column' background="#888888" >
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
            <Box direction='column'>
              <Box direction='row'>
                <input type="file" id="myFile" name="filename" onChange={() => { this.LoadProfilePix()} } />
                <button type="button" onClick={() => { this.DownloadImage(); }}>Download File</button>
              </Box>
              
              <canvas id="mycanvas" width="512" height="512">
              </canvas>
            </Box>

          </Box>
          
      </>
    )
  }
}

export default ProfileFrameCreator;