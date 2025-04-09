import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name : "toggleSlice",
    initialState : {
        searchBarToggle : false,
        loginToggle : false,
        isDiffRest : false ,
        isSimilarRestData : {
            isSimilarResDishes : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : ""
        },
        
    },
    reducers : {
        toggleClose : (state,action) =>{
            state.searchBarToggle = !state.searchBarToggle
        },
        loginClose : (state,action) =>{
            state.loginToggle = !state.loginToggle
        },
        toggleDiffRes : (state,action) =>{
            state.isDiffRest = !state.isDiffRest
        },
        // toggleSimilarRest : (state,action) =>{
        //     state.isSimilarRestData.isSimilarResDishes = !state.isSimilarResDishes.isSimilarResDishes
        // },
        
        setSimilarRest : (state,action) =>{
            state.isSimilarRestData = action.payload
            
            
        },
        resetSimilarResDish : (state) => {
            state.isSimilarRestData = {
                isSimilarResDishes : false,
                city : "",
                resLocation : "",
                resId : "",
                itemId : ""
            }
        }
    }
})

export const {toggleClose , loginClose, toggleDiffRes, toggleSimilarRest, setSimilarRest, resetSimilarResDish} = toggleSlice.actions

export default toggleSlice.reducer

