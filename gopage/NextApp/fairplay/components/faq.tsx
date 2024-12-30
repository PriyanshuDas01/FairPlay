'use client';
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is anti-doping in sports?",
      answer:
        "Anti-doping refers to policies, rules, and regulations established to ensure that athletes compete fairly and without using prohibited substances or methods to enhance their performance artificially.",
    },
    {
      question: "Why is anti-doping important?",
      answer:
        "Anti-doping promotes fair play, protects the health of athletes, and maintains the integrity of sports by deterring the use of performance-enhancing drugs and methods.",
    },
    {
      question: "What are the common anti-doping measures?",
      answer:
        "Common anti-doping measures include athlete education, random drug testing, biological passports, and strict enforcement of prohibited substance lists published by organizations like WADA.",
    },
    {
      question: "What happens if an athlete is caught doping?",
      answer:
        "If an athlete is caught doping, they may face penalties such as suspension, disqualification, stripping of medals or titles, and damage to their reputation.",
    },
    {
      question: "How can athletes avoid accidental doping?",
      answer:
        "Athletes can avoid accidental doping by consulting the prohibited substance list, using only approved medications and supplements, and ensuring all consumed products are free from banned substances.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-900 pt-[5vh]">
      <h2 className="text-3xl font-bold text-green-100 mb-6 flex justify-center items-center">FAQs</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-green-200 rounded-lg shadow-lg shadow-green-500 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 bg-green-600  text-white text-lg font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 bg-gray-900 text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
