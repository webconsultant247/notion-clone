"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircleCode } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Markdown from "react-markdown";

const ChatToDocument = ({ data }: { data: string }) => {
  const [conversation, setConversation] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendQuestion = async () => {
    if (!question) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/chatGemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: `You are an assistant helping the user to chat with a document. The document is about ${data}`,
          userMessage: question,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setConversation((prev) => [
          ...prev,
          `User: ${question}`,
          `AI: ${result.response}`,
        ]);
      } else {
        console.error("Error:", result.error);
        toast.error("Failed to send question");
      }
    } catch (error) {
      console.error("Error sending question:", error);
      toast.error(`Failed to send question: ${error}`);
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    // <div>
    //   <h1>Chat with Document</h1>
    //   <div>
    //     <textarea
    //       value={question}
    //       onChange={(e) => setQuestion(e.target.value)}
    //       placeholder="Ask a question about the document"
    //     ></textarea>
    //     <button onClick={sendQuestion} disabled={isLoading}>
    //       {isLoading ? "Sending..." : "Send"}
    //     </button>
    //   </div>
    //   <div>
    //     <h2>Conversation:</h2>
    //     <ul>
    //       {conversation.map((line, index) => (
    //         <li key={index}>{line}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          {/* Translate */}
          <MessageCircleCode /> Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat with Document</DialogTitle>
          <DialogDescription>
            Start chatting with the document here
          </DialogDescription>
          <hr className="mt-5" />
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the document"
          />

          <Button onClick={sendQuestion} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
        {conversation.length > 0 && (
          <div>
            <h2>Conversation:</h2>
            <ul className="space-y-1">
              {conversation.map((line, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-md ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } text-sm`}
                >
                  <Markdown>{line}</Markdown>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatToDocument;
