"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "../src/components/Header";
import QuestionCard from "../src/components/QuestionCard";
import {
  approveQuestion,
  disapproveQuestion,
  getAllQuestionsWithAnswers,
  approveAnswer,
  disapproveAnswer,
} from "./actions";

export default function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // These placeholders will be populated later in this guide
  const fetchQuestions = async () => {
    const questions = await getAllQuestionsWithAnswers();
    setQuestions(questions);
  };

  const onQuestionApproved = async (id: number) => {
    await approveQuestion(id);
    fetchQuestions();
  };

  const onQuestionDisapproved = async (id: number) => {
    await disapproveQuestion(id);
    fetchQuestions();
  };

  const onAnswerApproved = async (answerId: number) => {
    await approveAnswer(answerId);
    fetchQuestions();
  };

  const onAnswerDisapproved = async (answerId: number) => {
    await disapproveAnswer(answerId);
    fetchQuestions();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
        <div className="mb-4 flex justify-end">
          <Button>
            <Link href="/admin/set-user-roles">Set Roles</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onQuestionApproved={onQuestionApproved}
              onQuestionDisapproved={onQuestionDisapproved}
              onAnswerApproved={onAnswerApproved}
              onAnswerDisapproved={onAnswerDisapproved}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
