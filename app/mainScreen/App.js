/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Input, Card, Button, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import TimerMixin from 'react-timer-mixin';

class timeHandler {
	pastTime = 0
	constructor() {
		setInterval(() => {
			this.pastTime = this.pastTime + 1
		}, 1000);
	}
	getpastTime = (startTime) => {
		return this.pastTime + " seconds"
	}
	getCurrentTime = () => {
		date = new Date();
		hour = date.getHours();
		if (hour <= 11) {
			TimeType = 'AM';
		}
		else {
			TimeType = 'PM';
		}
		if (hour > 12) {
			hour = hour - 12;
		}
		if (hour == 0) {
			hour = 12;
		}
		minutes = date.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes.toString();
		}
		fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
		return fullTime
	}
}

class ChatTextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	onPressSend = (text) => {
		this.props.home.onPressSend(this.state.text);
		this.textInput.clear();
		this.state = {
			text: ""
		};
	}

	render() {
		if (this.state.text != ""){
			touchableProp = {
				onPress: this.onPressSend
			}
		}else{
			touchableProp = {}
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
					<TouchableOpacity {...touchableProp}>
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

class ChatFlatListItem extends Component {
	render() {
		//console.warn(this.props.text);
		if (this.props.dir == "right") {
			dirProp = {
				rightAvatar: { rounded: true, source: require('../images/avatar.png') },
				title: this.props.text,
				subtitle: this.props.time
			}
		} else {
			dirProp = {
				leftAvatar: { rounded: true, source: require('../images/avatar.png') },
				title: this.props.text,
				subtitle: this.props.time
			}
		}
		return (
			<ListItem
				{...dirProp}
				containerStyle={styles.chatItem}
				Component={TouchableScale}
				friction={80} //
				tension={70} // These props are passed to the parent component (here TouchableScale)
				activeScale={0.9} //
				backgroundColor={"rgb(23,33,43)"}
				titleStyle={{ color: 'white', fontWeight: 'bold', direction: "rtl", textAlign: this.props.dir }}
				subtitleStyle={{ color: 'white',  textAlign: this.props.dir }}
				roundAvatar
			/>

		);
	}
}

class ChatFlatList extends Component {
	render() {
		return (
			<FlatList
				ref={ref => { this.scrollView = ref; }}
				onContentSizeChange={() => {
					this.scrollView.scrollToOffset({ offset: 0, animated: true });
				}}
				style={styles.chatFlatList}
				inverted={true}
				data={this.props.data}
				renderItem={({ item }) => <ChatFlatListItem text={item.text} time={item.time} dir={item.dir} />}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	}
}

type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		mainTimeHandler = new timeHandler()
		this.state = {
			data:
				[
					{ text: "Hello", dir: "left", time: mainTimeHandler.getCurrentTime() },
				],
			responseCounter: 1,
			startTime: new Date()
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
			newData = [{ text: "It's been " + mainTimeHandler.getpastTime(this.state.startTime) + " since we started talking!", dir: "left", time: mainTimeHandler.getCurrentTime() }].concat(newData)
			this.setState({
				data: newData,
				responseCounter: this.state.responseCounter + 1
			})
		}, 2000);
	}

	render() {
		return (
			<View style={styles.container}>
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
		backgroundColor: 'rgb(14,22,33)',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	bottomView: {
		width: '100%',
		minHeight: 60,

		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		bottom: 10,
		backgroundColor: "rgb(23,33,43)",
	},
	ChatTextInput: {
		width: '100%',
		backgroundColor: "rgb(23,33,43)",
		color: "rgb(245,245,245)",
		padding: 0,

	},
	ChatTextInputLabel: {
		color: "rgb(245,245,245)"
	},
	chatFlatList: {
		backgroundColor: "rgb(14,22,33)",
		// backgroundColor: "red",
		position: "relative",
		width: "100%",
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
	},
	chatItemTime: {
		fontSize: 40,
		color: "white",
	},
	chatItem: {
		backgroundColor: "rgb(43,63,63)",
		marginBottom: 10,
		borderRadius: 10,
	}
});
