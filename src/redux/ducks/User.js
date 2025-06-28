
const SET_APP_USER = 'user/setAppUser'
const SET_OWNER = 'user/setOwner'


const initialState = {
    appUser:undefined,
    owner:{image:'defaultNoPic.jpg?alt=media&token=871a946e-e782-4a89-9573-80cad208be7f',storeName:'Store Name',name:'Owner',revenue:0}
}




export default function user(state = initialState, action) {
    switch (action.type) {
        case SET_APP_USER:
        return { ...state, appUser: action.appUser }   
        case SET_OWNER:
        return { ...state, owner: action.owner }                  
        default:
        return state
    }
}


export const setAppUser=(appUser)=> ({
    type:SET_APP_USER,
    appUser:appUser
})

export const setOwner=(owner)=> ({
    type:SET_OWNER,
    owner:owner
})


