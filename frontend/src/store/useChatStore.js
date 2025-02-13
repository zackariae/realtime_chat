import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users:[] ,
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({isUserLoading: true});
        try {
            const response = await axiosInstance.get("/messages/users");
            set({users: response.data.users});
        } catch (error) {
            console.log('Error in getUsers',error);
            toast.error(error.response.data.message);
        }finally {
            set({isUserLoading: false});
        }
    },
    getMessages: async (userId) => {
        set({isMessageLoading: true});
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            console.log('messages ',response.data);
            set({messages: response.data});
        } catch (error) {
            console.log('Error in getMessages',error);
            toast.error(error.response.data.message);
        }finally {
            set({isMessageLoading: false});
        }
    },
    // todo: optimize this one later
    setSelectedUser: (user) => set({selectedUser: user}), 

}));