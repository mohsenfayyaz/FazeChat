import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native';
import { configColorPrimary, configColorPrimaryDark } from '../configStyle'
import { Header, Image } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';

export class ChatHeader extends Component {
	render() {
		return (
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
					<View style={{ width: "100%", justifyContent: "center" }}>
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
		);
	}
}

const styles = StyleSheet.create({
	
});
