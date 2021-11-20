import React from "react";
import { Route } from "react-router-dom";
import CollectionPage from "../../components/collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { collection, onSnapshot } from "firebase/firestore";
import {
    convertCollectionSnapshotToMap,
    firestore,
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true,
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(firestore, "collections");

        this.unsubscribeFromSnapshot = onSnapshot(
            collectionRef,
            async (snapshot) => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot);

                updateCollections(collectionsMap);
                this.setState({ loading: false });
            }
        );
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionPageWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) =>
        dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
