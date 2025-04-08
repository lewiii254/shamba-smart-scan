
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Clock } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

interface ChatMessageProps {
  message: Message;
  specialistAvatar: string;
  specialistName: string;
}

const ChatMessage = ({ message, specialistAvatar, specialistName }: ChatMessageProps) => {
  return (
    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
          <AvatarImage src={specialistAvatar} />
          <AvatarFallback>{specialistName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div>
        <div 
          className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
        >
          {message.text}
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {message.isUser && (
        <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
