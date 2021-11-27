import { takeEvery, call, put, all } from "redux-saga/effects";
import { collection, getDocs } from "@firebase/firestore";
import {
    convertCollectionSnapshotToMap,
    firestore,
} from "../../firebase/firebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = collection(firestore, "collections");
        const snapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(
            convertCollectionSnapshotToMap,
            snapshot
        );

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}
