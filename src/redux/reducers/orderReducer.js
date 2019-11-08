//Each object contains the following: order_id, order_number, date_ordered, customer_name, costumer_address, order_lines
//order_lines contains: order_line_id, order_id, product_id, quantity, sku, product_description
const orderReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return action.payload;
        default:
            return state;
    };
};

export default orderReducer;