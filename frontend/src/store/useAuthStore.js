import {create} from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignedIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
    
            set({authUser: response.data.user});
        } catch (error) {
            console.log('Error in checkAuth',error);
            set({isCheckingAuth: null});
        }finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({authUser: response.data});
            toast.success("Account created successfully");
            get().connectSocket(response.data.socket);
        } catch (error) {
            console.log('Error in signup',error);
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({authUser: response.data});
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            console.log('Error in login',error);
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            console.log('Error in logout',error);
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const response = await axiosInstance.put("/auth/update", data);
            set({authUser: response.data.user});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log('Error in updateProfile',error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) {
            console.log("not connected");
            return;
        }

        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
          });
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    
    },

}))