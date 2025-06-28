const SET_ROSMV = 'appVars/setROSMV'
const SET_DSMV = 'appVars/setDSMV'
const SET_SELECTED_PAGE = 'appVars/setSelectedPage'
const SET_NAVIGATION = 'appVars/setNavigation'
const TOGGLE_LOADING = 'appVars/toggleLoading'
const SET_EDITING = 'appVars/setEditing'
const TOGGLE_SIGN_OUT_HANDLED = 'appVars/toggleSignOutHandled'


const initialState = {
    ROSMV:[false,{}],
    DSMV:[false,{}],
    navigation:{},
    loading:true,
    signOutHandled:false,
    selectedPage:'Managing',
    editing:[false,{}]
}




export default function appVars(state = initialState, action) {
    switch (action.type) {
        case SET_ROSMV:
        return { ...state, ROSMV: action.ROSMV }
        case SET_DSMV:
        return { ...state, DSMV: action.DSMV }
        case SET_SELECTED_PAGE:
        return { ...state, selectedPage: action.selectedPage }      
        case SET_NAVIGATION:
        return { ...state, navigation: action.navigation }  
        case TOGGLE_LOADING:
        return { ...state, loading: action.loading }  
        case SET_EDITING:
        return { ...state, editing: action.editing }         
        case TOGGLE_SIGN_OUT_HANDLED:
        return { ...state, signOutHandled: action.signOutHandled }                  
        default:
        return state
    }
}


export const setROSMV=(ROSMV)=> ({
    type:SET_ROSMV,
    ROSMV:ROSMV
})

export const setDSMV=(DSMV)=> ({
    type:SET_DSMV,
    DSMV:DSMV
})

export const setSelectedPage=(selectedPage)=> ({
    type:SET_SELECTED_PAGE,
    selectedPage:selectedPage
})

export const setNavigation=(navigation)=> ({
    type:SET_NAVIGATION,
    navigation:navigation
})

export const toggleLoading=(loading)=> ({
    type:TOGGLE_LOADING,
    loading:loading
})

export const setEditing=(editing)=> ({
    type:SET_EDITING,
    editing:editing
})

export const toggleSignOutHandled=(signOutHandled)=> ({
    type:TOGGLE_SIGN_OUT_HANDLED,
    signOutHandled:signOutHandled
})


