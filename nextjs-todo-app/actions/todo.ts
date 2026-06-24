"use server";
import { prisma } from "@/lib/db";

export const createNewTodo = async (title: string) => {
  const todo = await prisma.todo.create({
    data: {
      title: title,
      completed: false,
    },
  });
  return todo.id;
};

export const getTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};

export const deleteTodoById = async (id: string) => {
  const todo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return todo.id;
};

export const completeTodoById = async (id: string) => {
  const todo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: true,
    },
  });
  return todo.id;
};
