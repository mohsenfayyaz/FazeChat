import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import {configColorPrimary, configColorAccent, configColorChatItemSelf, configColorChatItemUser} from '../../configStyle'

export class ChatFlatListItem extends Component {
	render() {
		//console.warn(this.props.text);
		if (this.props.dir == "right") {
			dirProp = {
				rightAvatar: { rounded: true, source: require('../../images/avatar.png') },
				title: this.props.text,
				subtitle: this.props.time
            }
            itemStyle = styles.chatItemSelf;
		} else {
			dirProp = {
				leftAvatar: { rounded: true, source: require('../../images/avatar.png') },
				title: this.props.text,
				subtitle: this.props.time
            }
            itemStyle = styles.chatItemUser;
		}
		return (
			<ListItem
				{...dirProp}
				containerStyle={itemStyle}
				Component={TouchableScale}
				friction={80}
				tension={70}
				activeScale={0.9}
				backgroundColor={"red"}
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
	chatItemSelf: {
		backgroundColor: configColorChatItemSelf,
		marginBottom: 10,
        borderRadius: 10,
        marginLeft: 15,
    },
    chatItemUser: {
		backgroundColor: configColorChatItemUser,
		marginBottom: 10,
        borderRadius: 10,
        marginRight: 15,
	}
});
