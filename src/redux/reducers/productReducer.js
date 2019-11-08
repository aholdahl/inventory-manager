//Each object contains the following: product_id, sku, product_description, inventory_quantity, order_quantity
const productReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        default:
            return state;
    };
};

export default productReducer;