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
import { Input } from 'react-native-elements';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

class ChatTextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text:""
		};
	}

	onPressSend = (text) => {
		this.props.home.onPressSend(this.state.text);
		this.textInput.clear();
	}

	render() {
		return (
			<Input
				ref={input => { this.textInput = input }}
				onChangeText={(value) => this.setState({text: value})}
				placeholder='Write a message...'
				inputStyle={styles.ChatTextInput}
				labelStyle={styles.ChatTextInputLabel}
				multiline={true}
				borderBottomWidth={0}
				borderColor='red'
				placeholderTextColor="rgba(245,245,245,.7)"
				shake={true}
				rightIcon={
					<TouchableOpacity onPress={this.onPressSend}>
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
		return (
			<Text style={styles.chatSelfItem}>{this.props.text}</Text>
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
				renderItem={({ item }) => <ChatFlatList text={item.text}/>}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	}
}

type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			data:
				[
					{ text: "hello" },
				]
		};
	}
	onPressSend = (newText) => {
		newData = this.state.data;
		newData = [{ text: newText }].concat(newData)
		this.setState({
			data: newData
		})
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
	chatSelfItem: {
		fontSize: 40,
		color: "white",

	}
});
