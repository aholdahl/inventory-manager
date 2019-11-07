const binReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BINS':
            return action.payload;
        default:
            return state;
    }
}

export default binReducer;