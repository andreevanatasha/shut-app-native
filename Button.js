import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export class Button extends React.Component {
    render() {

        let icon;

        if (this.props.name === 'run') {
          icon = require('./img/run.png');
        } else if (this.props.name === 'clear') {
          icon = require('./img/clear.png');
        } else if (this.props.name === 'close') {
          icon = require('./img/close.png');
        };

        if (this.props.disable === '') {
            return (
                <View style={styles.btn}> 
                    <Image source={icon} style={{opacity: 0.4}} />  
                </View>
                )
        } else {
            return (
              <TouchableOpacity onPress={this.props.action}>
                <View style={styles.btn}> 
                    <Image source={icon} />  
                </View>
              </TouchableOpacity>
                )
        };
    }
}

const styles = StyleSheet.create({

btn: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: 64,
},

});