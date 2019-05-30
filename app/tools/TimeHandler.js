export class TimeHandler {
	pastTime = 0
	constructor() {
		setInterval(() => {
			this.pastTime = this.pastTime + 1
		}, 1000);
	}
	getpastTime = () => {
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