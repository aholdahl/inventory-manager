const orderLineReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDER_LINES':
            return action.payload;
        default:
            return state;
    }
}

export default orderLineReducer;