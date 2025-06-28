
const SET_ORDERS = 'ordersManager/setOrders'
const ADD_ORDERS = 'ordersManager/addOrders'
const SET_UPDATED_ORDERS = 'ordersManager/setUpdatedOrders'
const SET_ORDER_VIEW = 'ordersManager/setOrderView'


const initialState = {
    orders:{},
    updatedOrders:[],
    orderView:[false,{}]
}


export default function ordersManager(state = initialState, action) {
    switch (action.type) {
        case SET_ORDERS:
        return { ...state, orders: action.orders}
        case ADD_ORDERS:
        return { ...state, orders: {...state.orders,...action.orders}}
        case SET_UPDATED_ORDERS:
        return { ...state, updatedOrders: action.updatedOrders}
        case SET_ORDER_VIEW:
        return { ...state, orderView: action.orderView}      
        default:
        return state
    }
}

export const setOrders=(orders)=> ({
    type:SET_ORDERS,
    orders:orders
})

export const addOrders=(orders)=> ({
    type:ADD_ORDERS,
    orders:orders
})

export const setUpdatedOrders=(updatedOrders)=> ({
    type:SET_UPDATED_ORDERS,
    updatedOrders:updatedOrders
})

export const setOrderView=(orderView)=> ({
    type:SET_ORDER_VIEW,
    orderView:orderView
})

