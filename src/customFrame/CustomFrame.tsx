import React, { createRef, ReactElement, RefObject } from 'react';
import { Box, Button, FileInput, Image as GrommetImage, Text, ThemeContext } from 'grommet';
import BasicUkraineImage from '../images/basic-ukraine.png';
import CircleUkraineImage from '../images/circle-ukraine.png';
import LeftBottomCircleUkraine from '../images/left-bottom-circle-ukraine.png';
import RightBottomFrameUkraine from '../images/right-bottom-frame-ukraine.png';
import CircleAbortionIsHealthcare from '../images/circle-abortion-is-healthcare.png';
import CircleMyBodyMyChoice from '../images/circle-my-body-my-choice.png';
import CircleBillFosterForCongress from '../images/circle-bill-foster-for-congress.png';
import { JsxElement } from 'typescript';
import frameimage from '../images/custom-round.svg';

type CustomFrameProps = {
  text: string,

}

type CustomFrameState = {
  text: string,
}

/**
  Class representing the CustomFrame.
*/
class CustomFrame extends React.Component<CustomFrameProps, CustomFrameState> {
  constructor(props: CustomFrameProps) {
    super(props);
    this.state = { text: props.text }
  }

  render() {

    return (
      <svg
              
              className="profile-frame" width="100" height="100" viewBox="0 0 200 200" style={ { background: "rgba(0,0,0,0)", overflow:"visible"} }  xmlns="http://www.w3.org/2000/svg">
            
            <path id="circle-path" fill="rgba(0,0,0,0)"  strokeWidth="0" stroke="rgba(0,0,0,1)" d="
                  M 100 20 
                  a 80 80 10 1 0 0 160 
                  a 80 80 10 1 0 0 -160
              "/>
            

          <text style={ { fontFamily: "Helvetica, sans-serif", fontSize: "18px" } } >
            <textPath  startOffset="50%" textAnchor="middle" href="#circle-path">
            { this.state.text }
            </textPath>
          </text>

          <circle cx="100" cy="100" r="120"
                stroke="blue" fill="purple"
                fillOpacity="0" strokeOpacity="0.4" strokeWidth="120" clipPath="url(#my-clip)" />
          
          <clipPath id="my-clip">
      
          <rect width="200" height="200" x="0" y="0" fill="pink" fillOpacity="1"  />
          </clipPath>
        </svg>
      );
  }
}

export { CustomFrame }