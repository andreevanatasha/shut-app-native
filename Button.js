import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
/*import trash from './img/check-mark.png';
import megaphone from './img/check-mark.png';
import close from './img/check-mark.png';*/

export class Button extends React.Component {
    render() {
        let assets = {
            'run': './img/check.png',
            'clear': './img/check.png',
            'close': './img/check.png'
        };

        if (this.props.disable === '') {
            return (
                <View style={styles.btn}> 
                    <Image source={require('./img/check.png')} style={{opacity: 0.75}} />  
                </View>
                )
        } else {
            return (
              <TouchableHighlight onPress={this.props.action}>
                <View style={styles.btn}> 
                    <Image source={require('./img/check.png')} />  
                </View>
              </TouchableHighlight>
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