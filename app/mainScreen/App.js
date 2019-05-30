import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Input, Card, Button, ListItem, Header, Image } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import TimerMixin from 'react-timer-mixin';

import { TimeHandler } from '../tools/TimeHandler'
import {configColorPrimary, configColorPrimaryDark} from '../configStyle'
import {ChatTextInput} from './ChatTextInput'
import {ChatFlatList} from './chatList/ChatFlatList'



type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		mainTimeHandler = new TimeHandler()
		this.state = {
			data:
				[
					{ text: "Hello", dir: "left", time: mainTimeHandler.getCurrentTime() },
				],
		};
	}
	onPressSend = (newText) => {
		newData = this.state.data;
		newData = [{ text: newText, dir: "right", time: mainTimeHandler.getCurrentTime() }].concat(newData)
		this.setState({
			data: newData
		})
		this.sendResponse();
	}
	sendResponse = () => {
		TimerMixin.setTimeout(() => {
			newData = this.state.data;
			newData = [{ text: "It's been " + mainTimeHandler.getpastTime() + " since we started talking!", dir: "left", time: mainTimeHandler.getCurrentTime() }].concat(newData)
			this.setState({
				data: newData,
			})
		}, 2000);
	}

	render() {
		return (
			<View style={styles.container}>
				<Header
					leftComponent={
						< Image
							source={require('../images/avatar.png')}
							style={{ width: 40, height: 40 }}
						/>
					}
					centerComponent={{ text: 'Talking Bot', style: { color: '#fff' } }}
					containerStyle={{
						backgroundColor: configColorPrimary,
						justifyContent: 'space-around',
					}}
				/>
				<ChatFlatList data={this.state.data} />
				<View style={styles.bottomView}>
					<ChatTextInput home={this} />
				</View>

			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: configColorPrimary,
	},
	bottomView: {
		width: '100%',
		minHeight: 60,

		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		bottom: 10,
		backgroundColor: configColorPrimary,
	},
});
