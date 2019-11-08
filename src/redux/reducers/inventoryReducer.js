//Each object contains the following: inventory_id, product_id, bin_id, quantity, sku, product_description, bin_name
const inventoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INVENTORY':
            return action.payload;
        default:
            return state;
    };
};

export default inventoryReducer;