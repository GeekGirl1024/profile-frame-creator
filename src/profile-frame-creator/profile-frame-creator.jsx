import React from 'react';
import ReactDOM from 'react-dom';
import BasicUkraineImage from '/images/basic-ukraine.png';

/**
  Class representing the ProfileFrameCreator.
*/
class ProfileFrameCreator extends React.Component {
  /**
   * Creates a ProfileFrameCreator
   */
  constructor(props) {
    super(props);
    this.frame = new Image();
    this.frame.src = BasicUkraineImage;
  }

  downloadImage(){
  var canvas = document.getElementById("mycanvas");
  var image = canvas.toDataURL("image/png")//.replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
}

  getFile() {
    let file = document.querySelector('#myFile').files[0];

    var FR= new FileReader();

    let frameImage = this.frame;
    
    FR.addEventListener("load", function(e) {
      

      var myImage = new Image();
      myImage.addEventListener("load", function(e) {
              var canvas = document.getElementById('mycanvas');
              var ctx = canvas.getContext('2d');
              ctx.drawImage(myImage, 0, 0, 512, 512);
              ctx.drawImage(frameImage, 0, 0, 512, 512);

      });
      myImage.src = e.target.result;

      //document.getElementById("img").src       = e.target.result;
      //document.getElementById("b64").innerHTML = e.target.result;

      /*
      ctx.beginPath();
      ctx.arc(100, 100, 50, 1.5 * Math.PI, 0.5 * Math.PI, false);
      ctx.lineWidth = 10;
      ctx.stroke();
      */

    }); 
    
    FR.readAsDataURL( file );

  }
  
  /**
   * renders the component
   */
  render() {
    return (
      <div>
          Is this working?
          <input type="file" id="myFile" name="filename" />
          <button type="button" onClick={() => { this.getFile(); }}>
            Use File
          </button>
          <button type="button" onClick={() => { this.downloadImage(); }}>
            Download File
          </button>
          <canvas id="mycanvas" width="512" height="512">
          </canvas>
          <p id="b64"></p>
          <img id="img" height="150" />
      </div>
    )
  }
}

export default ProfileFrameCreator;