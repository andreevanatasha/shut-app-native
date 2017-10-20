import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, StatusBar } from 'react-native';
import { Button } from './Button';
import SlideTextInput from './SlideTextInput';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { Font } from 'expo';
const Dimensions = require('Dimensions');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            placeholder: 'Type anything. \nSwipe to change background.',
            background_id: 0,
            fullscreen: false,
            backgrounds: [
            '#0000ff',
            '#FE2370',
            '#3AF4D5',
            '#090707'
            ],
            placeholder_colors: [
            '#ddf',
            '#ffbbd3',
            '#cbfcf4',
            '#f7f5f5'
            ],
            backgrounds_number: 3,
            orientation: 'portrait',
            fontLoaded: false
        };

        this.clearInput = this.clearInput.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
        this.openFullScreen = this.openFullScreen.bind(this);

    }

    clearInput() {
        this.refs.input.clear();
        this.refs.input.blur();
        this.setState({text: ''});
    }

    onSwipeLeft() {
        let current_background = this.state.background_id;

        if (current_background === 0) {
            this.setState({background_id: this.state.backgrounds_number});
        } else {
            current_background -= 1;
            this.setState({background_id: current_background});
        };
    }

    onSwipeRight() {
        let current_background = this.state.background_id;

        if (current_background === this.state.backgrounds_number) {
            this.setState({background_id: 0});
        } else {
            current_background += 1;
            this.setState({background_id: current_background});
        };
    }

    openFullScreen() {
        this.setState({fullscreen: true});
    }

    closeFullScreen() {
        this.setState({fullscreen: false});
    }


    async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('./img/Roboto-Bold.ttf'),
      });

        this.setState({ fontLoaded: true });
    }

    render() {
        let background_color, screenWidth, screenHeight, placeholder_color;
        background_color = this.state.backgrounds[this.state.background_id];
        placeholder_color = this.state.placeholder_colors[this.state.background_id];
        screenWidth = Dimensions.get('window').width;
        screenHeight = Dimensions.get('window').height;

        if (this.state.fullscreen === false) { 
            return (
                <GestureRecognizer 
                    onSwipeLeft= { (state) => this.onSwipeLeft(state) }
                    onSwipeRight= { (state) => this.onSwipeRight(state) } 
                    style={{flex: 1}}>
                <View style={[styles.main, {backgroundColor: background_color}]} >
                   <StatusBar barStyle="light-content" /> 
                    <View style={[styles.header, {backgroundColor: background_color}]}>
                        <Button name='clear' disable={this.state.text} action={this.clearInput} />
                    {/*<Text>{this.state.text}</Text>*/}
                        <Button name='run' disable={this.state.text} action={this.openFullScreen}/>
                    </View>

                    {
                        this.state.fontLoaded ? (
                            <TextInput 
                            style={styles.input} 
                            ref='input'
                            onChangeText={(text) => this.setState({text: text})}
                            placeholder={this.state.placeholder} 
                            value={this.state.text} 
                            multiline={true} 
                            placeholderTextColor={placeholder_color}
                            returnKeyType='done' 
                            blurOnSubmit={true}
                            underlineColorAndroid='transparent' />
                            ) : null
                    }
                </View>
                </GestureRecognizer>
              );
        } else {
            return (
                <GestureRecognizer 
                    onSwipeLeft= { (state) => this.onSwipeLeft(state) }
                    onSwipeRight= { (state) => this.onSwipeRight(state) } 
                    style={{flex: 1}}>
                <View style={[styles.main, {backgroundColor: background_color}]} >
                   <StatusBar barStyle="light-content" /> 
                    <View style={styles.header}>
                        <Button name='close' disable={this.state.text} action={this.closeFullScreen}/>
                    </View>
                    <View style={{width: '94%', flex: 1}}>
                    {
                        this.state.fontLoaded ? (
                            <Text
                            adjustsFontSizeToFit={true}
                            style={[styles.input, styles.responsive]} >
                            {this.state.text}
                            </Text>
                            ) : null
                    }
                    </View>
                </View>
                </GestureRecognizer>
            );
        }
    }
}

const styles = StyleSheet.create({
main: {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
    },

header: {
    height: 88,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

input: {
    width: '94%',
    flex: 1,

  fontSize: 50,
  lineHeight: 1,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '900',
  color: '#ffffff',

  overflow: 'hidden',
  textAlignVertical: "top"

    },

responsive: {
    fontSize: responsiveFontSize(5),
    //fontSize: 100,
  lineHeight: 1,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '900',
  color: '#ffffff',

},
});
