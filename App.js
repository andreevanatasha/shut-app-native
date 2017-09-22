import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, StatusBar } from 'react-native';
import { Button } from './Button';
import SlideTextInput from './SlideTextInput';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

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
            '#ad9595'
            ],
            backgrounds_number: 3,
            orientation: 'portrait',
        };

        this.clearInput = this.clearInput.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
    }

    clearInput() {
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

    render() {
        let background_color, placeholder_color;
        background_color = this.state.backgrounds[this.state.background_id];
        placeholder_color = this.state.placeholder_colors[this.state.background_id];

        return (
            <GestureRecognizer 
                onSwipeLeft= { (state) => this.onSwipeLeft(state) }
                onSwipeRight= { (state) => this.onSwipeRight(state) } 
                style={{flex: 1}}>
            <View style={[styles.main, {backgroundColor: background_color}]} >
               <StatusBar barStyle="light-content" /> 
                <View style={[styles.header, {backgroundColor: background_color}]}>
                    <Button name='clear' disable={this.state.text} action={this.clearInput} />
                    <Text> {this.state.text} </Text>
                    <Button name='run' disable={this.state.text} action={this.openFullScreen}/>
                </View>
                <SlideTextInput 
                    style={[styles.input, {backgroundColor: background_color}]} 
                    onChangeText={(text) => this.setState({text: text})}
                    placeholder={this.state.placeholder} 
                    value={this.state.text} 
                    multiline={true} 
                    placeholderTextColor={placeholder_color}
                    returnKeyType='done' 
                    blurOnSubmit={true} />
            </View>
            </GestureRecognizer>
          );
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
  fontSize: 50,
  lineHeight: 1,
  width: '94%',
  flex: 1,

  fontFamily: 'Helvetica Neue',
  fontStyle: 'normal',
  fontWeight: '900',
  color: '#ffffff',

  overflow: 'hidden',

},
});
