
const TOGGLE = 'statusBar/toggling'


const initialState = {
    black:false
}




export default function statusBarManager(state = initialState, action) {
    switch (action.type) {
        case TOGGLE:
        return { ...state, black: action.black }
        default:
        return state
    }
}


export const toggleStatusBar=(black)=> ({
    type:TOGGLE,
    black:black
})


