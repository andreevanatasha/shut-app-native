import React from 'react';
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableHighlight, Image, StatusBar, ScrollView, BackHandler, Dimensions } from 'react-native';
import { Button } from './Button';
import { Textfit } from './Textfit';
import SlideTextInput from './SlideTextInput';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Font } from 'expo';

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
            '#090707',
            '#f9dd37'
            ],
            placeholder_colors: [
            '#66f',
            '#fe679c',
            '#8af8e6',
            '#555',
            '#fbe879'
            ],
            backgrounds_number: 4,
            dimensions: {},
            fontLoaded: false
        };

        this.clearInput = this.clearInput.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
        this.openFullScreen = this.openFullScreen.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);

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

    openFullScreen() {
        this.setState({fullscreen: true});
    }

    closeFullScreen() {
        this.setState({fullscreen: false});
    }

    goBack = () => {
        if (this.state.fullscreen) {
            this.setState({fullscreen: false});
            return true;
        };
            return false;
    }

    changeOrientation(dims) {
        this.setState({dimenstions: dims});
        console.log(this.state.dimenstions);
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack); 
        Dimensions.addEventListener('change', (dims) => {this.changeOrientation(dims)});

        await Font.loadAsync({
          'Roboto': require('./img/Roboto-Bold.ttf'),
      });

        this.setState({ fontLoaded: true });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
        Dimensions.removeEventListener('change', (dims) => {this.changeOrientation(dims)});
    }

    render() {
        let background_color, screenWidth, screenHeight, placeholder_color, containerWidth, containerHeight;
        background_color = this.state.backgrounds[this.state.background_id];
        placeholder_color = this.state.placeholder_colors[this.state.background_id];
        screenWidth = Dimensions.get('window').width;
        screenHeight = Dimensions.get('window').height;
        containerWidth = Math.floor(screenWidth * 0.94);
        containerHeight = screenHeight - 88;


        if (!this.state.fullscreen) { 
            return (
                <GestureRecognizer 
                    onSwipeLeft= { (state) => this.onSwipeLeft(state) }
                    onSwipeRight= { (state) => this.onSwipeRight(state) } 
                    style={{flex: 1}}>

                <KeyboardAvoidingView 
                    style={[styles.main, {backgroundColor: background_color}]} 
                    behavior='padding'>
                    <StatusBar 
                        barStyle="light-content" 
                        translucent={true} 
                        backgroundColor='black' /> 
                    <View style={[styles.header, {backgroundColor: background_color}]}>
                        <Button name='clear' disable={this.state.text} action={this.clearInput} />
                        <Button name='run' disable={this.state.text} action={this.openFullScreen}/>
                    </View>

                    {
                        this.state.fontLoaded ? (
                            <SlideTextInput 
                            style={styles.input} 
                            ref={component => this._textInput = component}
                            onChangeText={(text) => this.setState({text: text})}
                            placeholder={this.state.placeholder} 
                            value={this.state.text} 
                            multiline={true}
                            placeholderTextColor={placeholder_color}
                            returnKeyType='done' 
                            blurOnSubmit={true}
                            autocorrect={false}
                            numberOfLines={5}
                            underlineColorAndroid='transparent' 
                            maxLength={140}
                            autoFocus={true} 
                            onSubmitEditing={ this.state.text != '' ? this.openFullScreen : this.blur }/>
                            ) : null
                    }
                </KeyboardAvoidingView>
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
                    <View style={[styles.header, {flexDirection: 'row-reverse'}]}>
                        <Button name='close' disable={this.state.text} action={this.closeFullScreen}/>
                    </View>
                    <View style={styles.textContainer}>
                    {
                        this.state.fontLoaded ? (
                            <Textfit
                            style={styles.responsive} 
                            width={containerWidth}
                            height={containerHeight}
                            color={background_color}>
                            {this.state.text.toUpperCase()}
                            </Textfit>
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
      justifyContent: 'flex-start'
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
        lineHeight: 50,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '900',
        color: '#ffffff',
        //overflow: 'hidden',
        textAlignVertical: "top",
    },

    textContainer: {
        width: '94%',
        flex: 1,
        flexDirection: 'row'
    },

    responsive: {
        flex: 1,
        flexWrap: 'wrap',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '900',
        color: '#ffffff',
        textAlignVertical: "center",
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
