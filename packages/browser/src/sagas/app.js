import { put, call, takeEvery } from 'redux-saga/effects';

import { APP } from '../actions/constants';
import { testConnection } from '../apis';
import {
	connectAppSuccess,
	connectAppFailure,
	setError,
	clearError,
} from '../actions';
import { trimUrl } from '../utils';

function* handleConnectApp({ appname, url, headers }) {
	const appUrl = trimUrl(url);
	try {
		yield put(clearError());
		yield call(testConnection, appname, appUrl, headers);
		yield put(connectAppSuccess(appname, appUrl));
	} catch (error) {
		yield put(connectAppFailure());
		yield put(
			setError({
				message: error.message,
				description: error.description,
			}),
		);
	}
}

export default function* watchConnectApp() {
	yield takeEvery(APP.CONNECT_REQUEST, handleConnectApp);
}
