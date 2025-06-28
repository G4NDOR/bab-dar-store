
const SET_ITEMS = 'setItems'


const initialState = {
    items:[]
}




export default function storeItems(state = initialState, action) {
    switch (action.type) {
        case SET_ITEMS:
        return { ...state, items:action.items }
        default:
        return state
    }
}


export const setItems=(items)=> ({
    type:SET_ITEMS,
    items:items
})

