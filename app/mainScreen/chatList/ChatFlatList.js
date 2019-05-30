import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import {configColorPrimary, configColorPrimaryDark} from '../../configStyle'
import {ChatFlatListItem} from './ChatFlatListItem'

export class ChatFlatList extends Component {
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

const styles = StyleSheet.create({
	chatFlatList: {
		backgroundColor: configColorPrimaryDark,
		position: "relative",
		width: "100%",
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
	},
});
