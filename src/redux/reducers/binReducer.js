//Each object contains the following: bin_id, sku, bin_name, inventory_contents
//inventory_contents includes inventory_id, product_id, bin_id, quantity, sku, product_description
const binReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BINS':
            return action.payload;
        default:
            return state;
    }
}

export default binReducer;