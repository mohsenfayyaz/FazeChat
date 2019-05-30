import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import {configColorPrimary, configColorAccent} from '../../configStyle'

export class ChatFlatListItem extends Component {
	render() {
		//console.warn(this.props.text);
		if (this.props.dir == "right") {
			dirProp = {
				rightAvatar: { rounded: true, source: require('../../images/avatar.png') },
				title: this.props.text,
				subtitle: this.props.time
			}
		} else {
			dirProp = {
				leftAvatar: { rounded: true, source: require('../../images/avatar.png') },
				title: this.props.text,
				subtitle: this.props.time
			}
		}
		return (
			<ListItem
				{...dirProp}
				containerStyle={styles.chatItem}
				Component={TouchableScale}
				friction={80}
				tension={70}
				activeScale={0.9}
				backgroundColor={"rgb(23,33,43)"}
				titleStyle={{ color: 'white', fontWeight: 'bold', direction: "rtl", textAlign: this.props.dir }}
				subtitleStyle={{ color: 'white', textAlign: this.props.dir }}
				roundAvatar
			/>

		);
	}
}

const styles = StyleSheet.create({
	chatItemTime: {
		fontSize: 40,
		color: "white",
	},
	chatItem: {
		backgroundColor: configColorAccent,
		marginBottom: 10,
		borderRadius: 10,
	}
});
