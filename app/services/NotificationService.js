import * as Notifications from 'expo-notifications';

let listener = null;

function registerNotificationHandler ( handleNotification ) {
	if (listener) return;
	listener = Notifications.addNotificationReceivedListener(handleNotification);
}


export default { registerNotificationHandler }
export { registerNotificationHandler };
