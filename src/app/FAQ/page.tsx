import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "../assets/text/faqText";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import AuthHeader from "../(auth)/auth-header";

const FAQPage = async () => {
  const session = await getServerSession(authOption);
  return (
    <main className="container m-auto flex min-h-screen flex-col items-center justify-between p-5 lg:p-10 xl:p-24">
      {!session && (
        <div className="absolute left-0 top-0">
          <AuthHeader />
        </div>
      )}
      <div className="w-full text-left relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/6 after:bg-gradient-conic after:from-green-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-teal-900 after:dark:via-[#1601ff] after:dark:opacity-40 sm:before:w-[280px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="flex gap-2 flex-col w-full text-left mt-10 lg:mt-0">
          <h1 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <Accordion
            type="single"
            collapsible
            className="w-full lg:max-w-[70%] xl:max-w-[60%]"
          >
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="font-mono font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-gray-700 dark:text-gray-300/80 leading-loose">
                  {faq.response}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
