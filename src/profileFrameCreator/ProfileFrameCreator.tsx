
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Box, Image as GrommetImage } from 'grommet';
import BasicUkraineImage from '../images/basic-ukraine.png';
import CircleUkraineImage from '../images/circle-ukraine.png';
import LeftBottomCircleUkraine from '../images/left-bottom-circle-ukraine.png';
import RightBottomFrameUkraine from '../images/right-bottom-frame-ukraine.png';
import './ProfileFrameCreator.css'

/**
  Class representing the ProfileFrameCreator.
*/
class ProfileFrameCreator extends React.Component {

  private profileImage = new Image();
  private canvasElement: HTMLCanvasElement | undefined;
  private canvasContext: CanvasRenderingContext2D | undefined;
  private fileReader = new FileReader();

  private filesElement: HTMLInputElement | undefined;

  private downloadLinkElement: HTMLAnchorElement | undefined;
  

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
      this.canvasContext?.drawImage(this.profileImage, 0, 0, 512, 512);
    }).bind(this));

    this.fileReader.addEventListener("load", ((event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result){
        this.profileImage.src = event.target.result as string;
      }
    }).bind(this));

    this.filesElement = document.querySelector('#myFile') as HTMLInputElement;

    this.downloadLinkElement = document.createElement('a');
    this.downloadLinkElement.download = "my-image.png";
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
      this.canvasContext?.drawImage(this.profileImage, 0, 0, 512, 512);
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
            <Box direction='column' >
              <GrommetImage className="profile-frame" width="100" height="100" src={BasicUkraineImage} onClick={(element) => { this.SetFrame(element.target as HTMLImageElement); }}></GrommetImage>
              <GrommetImage className="profile-frame" width="100" height="100" src={CircleUkraineImage} onClick={(element) => { this.SetFrame(element.target as HTMLImageElement); }}></GrommetImage>
              <GrommetImage className="profile-frame" width="100" height="100" src={LeftBottomCircleUkraine} onClick={(element) => { this.SetFrame(element.target as HTMLImageElement); }}></GrommetImage>
              <GrommetImage className="profile-frame" width="100" height="100" src={RightBottomFrameUkraine} onClick={(element) => { this.SetFrame(element.target as HTMLImageElement); }}></GrommetImage>
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