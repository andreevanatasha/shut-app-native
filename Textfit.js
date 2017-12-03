import React from 'react';
import { Text } from 'react-native';

export class Textfit extends React.Component {

  constructor(props) {
    super(props);

    let fontsize;
    //console.log(this.props.children.length)
    switch (true) {
      case (this.props.children.length < 2):
        fontsize = 400;
        break;

      case (this.props.children.length >= 2):
        fontsize = 250;
        break;

      case (this.props.children.length >= 5):
        fontsize = 200;
        break;

      case (this.props.children.length >= 15):
        fontsize = 150;
        break;
    }

    this.state = {
      ready: false,
      fontsize: fontsize,
      color: this.props.color
    }
  }

  render() {

    return (
        <Text
        textBreakStrategy='highQuality'
        style={[this.props.style, {fontSize: this.state.fontsize, color: this.state.color}]} 
        onLayout={this.onLayout}>
        {this.props.children}
        </Text>
    )
  }

    onLayout = event => {
    let {width, height} = event.nativeEvent.layout;
    width = width - 2; 
    //console.log(this.props.width, this.props.height);
    //console.log(width, height);
    if ( width <= this.props.width && height <= this.props.height) {
      this.setState({color: '#ffffff'});
    } else {
      let _fontsize = this.state.fontsize - 5;
      this.setState({fontsize: _fontsize});
    }
    
  }

}