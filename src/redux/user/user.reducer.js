import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_START:
            return {
                ...state,
            };
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            };
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                currentUser: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
