
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: {
        firstName: undefined,
        lastName: undefined,
        username: undefined,
        phoneNumber: undefined,
        email: undefined,

    },
  
}

const myProfile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => { state.profileData = action.payload },
        // setLastName: (state, action) => { state.initialState.profileData.lastname = action.payload },
        // setEmail: (state, action) => { state.initialState.email = action.payload },
        // setPhoneNumber: (state, action) => { state.initialState.phone = action.payload }
        

    }
})

export const { setProfile } = myProfile.actions
export default myProfile.reducer