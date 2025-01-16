"use client";
import { Doc } from "yjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";

import Markdown from "react-markdown";

type Language =
  | "english"
  | "chinese"
  | "hindi"
  | "spanish"
  | "french"
  | "arabic"
  | "bengali"
  | "russian"
  | "portuguese"
  | "urdu"
  | "indonesian"
  | "german"
  | "japanese"
  | "swahili"
  | "marathi"
  | "telugu"
  | "farsi"
  | "vietnamese"
  | "korean";

const languages: Language[] = [
  "english",
  "chinese",
  "hindi",
  "spanish",
  "french",
  "arabic",
  "bengali",
  "russian",
  "portuguese",
  "urdu",
  "indonesian",
  "german",
  "japanese",
  "swahili",
  "marathi",
  "telugu",
  "farsi",
  "vietnamese",
  "korean",
];

const TranslateDocument = ({ doc }: { doc: Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      // ask question
      const documentData = doc.get("document-store").toJSON();
      const prompt = `Get the summary of this content and translate it to ${language}: ${documentData} please only return the translated summary. Do not use the original language`;

      try {
        const res = await fetch("/api/requestGemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const result = await res.json();
        if (result.status) {
          toast.success("AI was able to translate and summarize your content!");
          // console.log("Response:", result?.message);
          setSummary(result?.message);
        } else {
          toast.error("Failed to fetch response.");
          console.error("Error:", result);
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error("Error:", error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <LanguagesIcon /> Translate
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate a summary of the document in
            the selected language
          </DialogDescription>
          <hr className="mt-5" />
          {question && (
            <p className="mt-5 text-gray-500">Question: {question}</p>
          )}
        </DialogHeader>
        {summary && (
          <div className="flex flex-col items-center gap-2 p-5 overflow-y-scroll bg-gray-100 max-h-96">
            <div className="flex">
              <BotIcon className="flex-shrink-0 w-10" />
              <div
                className={`${
                  language === "farsi" || language === "arabic"
                    ? "rtl text-right"
                    : "ltr text-left"
                }`}
              >
                {`${
                  language === "arabic" || language === "farsi"
                    ? "هوش مصنوعی"
                    : "AI "
                }:`}
                {isPending ? "is translating" : <Markdown>{summary}</Markdown>}
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <Select
            value={language || ""}
            onValueChange={(value: Language) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDocument;
