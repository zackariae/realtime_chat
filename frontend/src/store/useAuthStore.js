import {create} from "zustand";
import axiosInstance from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignedIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
    
            set({authUser: response.data});
        } catch (error) {
            console.log('Error in checkAuth',error);
            set({isCheckingAuth: null});
        }finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({authUser: response.data});
        } catch (error) {
            console.log('Error in signup',error);
        }
    },

}))