import React, { Component } from 'react';
import {TextInput, TouchableWithoutFeedback, StyleSheet, Text} from 'react-native';
const Platform = require('Platform');
const requireNativeComponent = require('requireNativeComponent');
const emptyFunction = require('fbjs/lib/emptyFunction');
const invariant = require('fbjs/lib/invariant');

if (Platform.OS === 'android') {
  var AndroidTextInput = requireNativeComponent('AndroidTextInput', null);
} else if (Platform.OS === 'ios') {
  var RCTTextView = requireNativeComponent('RCTTextView', null);
  var RCTTextField = requireNativeComponent('RCTTextField', null);
}

const onlyMultiline = {
  onTextInput: true,
  children: true,
};

class SlideTextInput extends TextInput {

  constructor() {
    super();
    this._renderIOS = this._renderIOSWithoutEventSteal;
  }

  _renderIOSWithoutEventSteal() {
    var textContainer;

    var onSelectionChange;
    if (this.props.selectionState || this.props.onSelectionChange) {
      onSelectionChange = (event: Event) => {
        if (this.props.selectionState) {
          var selection = event.nativeEvent.selection;
          this.props.selectionState.update(selection.start, selection.end);
        }
        this.props.onSelectionChange && this.props.onSelectionChange(event);
      };
      this.forceUpdate();
    }

    var props = Object.assign({}, this.props);
    props.style = [styles.input, this.props.style];
    if (!props.multiline) {
      if (__DEV__) {
        for (var propKey in onlyMultiline) {
          if (props[propKey]) {
            const error = new Error(
              'TextInput prop `' + propKey + '` is only supported with multiline.'
            );
            warning(false, '%s', error.stack);
          }
        }
      }
      textContainer =
        <RCTTextField
          ref="input"
          {...props}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onSelectionChange={onSelectionChange}
          onSelectionChangeShouldSetResponder={emptyFunction.thatReturnsTrue}
          text={this._getText()}
        />;
    } else {
      var children = props.children;
      var childCount = 0;
      React.Children.forEach(children, () => ++childCount);
      invariant(
        !(props.value && childCount),
        'Cannot specify both value and children.'
      );
      if (childCount >= 1) {
        children = <Text style={props.style}>{children}</Text>;
      }
      if (props.inputView) {
        children = [children, props.inputView];
      }

      textContainer =
        <RCTTextView
          ref="input"
          {...props}
          children={children}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onContentSizeChange={this.props.onContentSizeChange}
          onSelectionChange={onSelectionChange}
          onTextInput={this._onTextInput}
          onSelectionChangeShouldSetResponder={emptyFunction.thatReturnsTrue}
          text={this.props.value}
        />;
    }

    return (
      <TouchableWithoutFeedback
        onLayout={props.onLayout}
        onPress={this._onPress}
        rejectResponderTermination={false}
        accessible={props.accessible}
        accessibilityLabel={props.accessibilityLabel}
        accessibilityTraits={props.accessibilityTraits}
        testID={props.testID}>
        {textContainer}
      </TouchableWithoutFeedback>
    );
  }
}

var styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
  },
});

export default SlideTextInput;