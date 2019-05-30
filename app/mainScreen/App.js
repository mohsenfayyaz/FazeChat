import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Header, Image } from 'react-native-elements';
import TimerMixin from 'react-timer-mixin';
import Lightbox from 'react-native-lightbox';

import { TimeHandler } from '../tools/TimeHandler'
import { configColorPrimary, configColorPrimaryDark } from '../configStyle'
import { ChatTextInput } from './ChatTextInput'
import { ChatFlatList } from './chatList/ChatFlatList'



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
						<Lightbox underlayColor={configColorPrimaryDark}
							style={{ justifyContent: "center" }}
							renderContent={() => (
								< Image
									resizeMode="contain"
									source={require('../images/avatar.png')}
									style={{ width: "100%" }}
								/>
							)}
						>
							< Image
								resizeMode="contain"
								source={require('../images/avatar.png')}
								style={{ width: 50, height: 50 }}
							/>
						</Lightbox>
					}
					centerComponent={
						<View style={{width: "100%", justifyContent: "center"}}>
							<Text style={{ color: '#fff', fontWeight: "bold" }}> Talking Bot </Text>
							<Text style={{ color: 'rgba(255,255,255,0.7)' }}> Online </Text>
						</View>
					}
					containerStyle={{
						backgroundColor: configColorPrimary,
						justifyContent: 'space-around',
						paddingTop: 0,
						paddingLeft: 30,
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
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: configColorPrimary,
	},
	contain: {
		flex: 1,
	},
});
