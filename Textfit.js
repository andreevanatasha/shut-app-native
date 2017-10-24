import React from 'react';
import { Text } from 'react-native';

export class Textfit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      fontsize: 200,
      dimensions: void 0,
      color: this.props.color
    }
  }

  render() {


    return (
        <Text
        style={[this.props.style, {fontSize: this.state.fontsize, color: this.state.color}]} 
        onLayout={this.onLayout}>
        {this.props.children}
        </Text>
    )
  }

    onLayout = event => {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout;
    if ( width <= this.props.width && height <= this.props.height) {
      this.setState({dimensions: {width, height}, color: '#ffffff'});
    } else {
      _fontsize = this.state.fontsize - 5;
      this.setState({fontsize: _fontsize});
    }
    
  }

}