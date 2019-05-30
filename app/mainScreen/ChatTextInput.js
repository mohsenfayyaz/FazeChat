import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Input} from 'react-native-elements';

import {configColorPrimary} from '../configStyle'

export class ChatTextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	onPressSend = () => {
		this.props.home.onPressSend(this.state.text);
		this.textInput.clear();
		this.setState({
			text: ""
		})
	}

	render() {
		if (this.state.text != "") {
			touchableOnPressProp = {
				onPress: this.onPressSend
			}
		} else {
			touchableOnPressProp = {}
		}
		return (
			<Input
				ref={input => { this.textInput = input }}
				onChangeText={(value) => this.setState({ text: value })}
				placeholder='Write a message...'
				inputStyle={styles.ChatTextInput}
				labelStyle={styles.ChatTextInputLabel}
				multiline={true}
				borderBottomWidth={0}
				borderColor='red'
				placeholderTextColor="rgba(245,245,245,.7)"
				shake={true}
				rightIcon={
					<TouchableOpacity {...touchableOnPressProp}>
						<Icon
							name='send'
							type='material-community'
							color={"white"}
							size={26}
							style={{ paddingRight: 10, }}
						/>
					</TouchableOpacity>
				}
			/>
		);
	}
}


const styles = StyleSheet.create({

	ChatTextInput: {
		width: '100%',
		backgroundColor: configColorPrimary,
		color: "rgb(245,245,245)",
		padding: 0,

	},
	ChatTextInputLabel: {
		color: "rgb(245,245,245)"
	},
	
});
