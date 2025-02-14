import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
function ChatContainer() {
  const {messsages, getMessages, isMessageLoading,selectedUser} = useChatStore();


  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if(isMessageLoading){
      return (
      <div className="flex-1 flex-col overflow-auto ">
        <ChatHeader selectedUser={selectedUser}/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>)
    }

  return (
    <div className="flex-1 flex-col overflow-auto ">
      <ChatHeader selectedUser={selectedUser}/>
        <p>....messages</p>
      <MessageInput/>

    </div>
  )
}

export default ChatContainer