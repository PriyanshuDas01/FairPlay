'use client'

import { useState } from 'react'
// import Link from 'next/link'
import Image from 'next/image'
// import { ArrowLeft } from 'lucide-react'
import { quizQuestions } from '@/lib/quiz-question'
import Img1 from '@/images/frontpagesm.jpg'
import Img2 from '@/images/logo.png'

export default function DrugAwarenessQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = quizQuestions[currentStep]

  const handleNext = () => {
    if (currentStep === quizQuestions.length - 1) {
      // Calculate score
      const finalScore = Object.entries(selectedAnswers).reduce((acc, [questionId, answerId]) => {
        const question = quizQuestions.find(q => q.id === questionId)
        return acc + (question?.correctAnswer === answerId ? 1 : 0)
      }, 0)
      setScore(finalScore)
      setIsComplete(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setSelectedAnswers({})
    setIsComplete(false)
    setScore(0)
  }

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              <div className="p-8 lg:p-12">
                <h1 className="text-4xl font-bold text-green-600 mb-6">Quiz Complete!</h1>
                <div className="space-y-6">
                  <p className="text-xl">Your score: {score} out of {quizQuestions.length}</p>
                  <p className="text-green-600">
                    {score === quizQuestions.length 
                      ? "Excellent! You have a great understanding of drug awareness in sports."
                      : "Good effort! Consider reviewing the material to improve your knowledge of drug awareness in sports."}
                  </p>
                  <button 
                    onClick={handleRestart}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center bg-white p-12">
                <div className="relative w-full max-w-sm">
                  <Image
                    src={Img2}
                    alt="Quiz complete illustration"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
   
    <div className="min-h-screen bg-green-100">
    <h1 className=' pt-5 flex justify-center items-center font-bold text-4xl'>
      Quick Quiz!
    </h1>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Column */}
            <div className="p-8 lg:p-12">
            

              <div className="space-y-6">
                <div>
                  <div className="text-green-300 mb-2">
                    Question {currentStep + 1}/{quizQuestions.length}
                  </div>
                  <h1 className="text-4xl font-bold text-green-600 mb-2">
                    {currentQuestion.question}
                  </h1>
                  <p className="text-green-400">Select one answer</p>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className={`relative flex items-center rounded-xl border-2 p-4 transition-colors ${
                        selectedAnswers[currentQuestion.id] === option.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-200'
                      }`}
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name={currentQuestion.id}
                        value={option.id}
                        checked={selectedAnswers[currentQuestion.id] === option.id}
                        onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={option.id}
                        className="block w-full cursor-pointer text-base"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="px-4 py-2 border border-green-200 text-green-600 rounded-md hover:bg-sky-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestion.id]}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-12">
                <p className="text-green-600 font-medium">Drug Awareness Quiz</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="hidden lg:flex items-center justify-center bg-white p-12">
              <div className="relative w-full max-w-sm">
                <Image
                  src={Img1}
                 
                  alt="Quiz illustration"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

