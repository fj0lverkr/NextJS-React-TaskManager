"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { plus } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import Modal from "../Modals/Modal";
import TaskItem from "../TaskItem/TaskItem";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, modal, toggleModal } = useGlobalState();
  return (
    <>
      {modal ? <Modal content={<CreateContent />} /> : null}
      <TaskStyled theme={theme}>
        <h1>{title}</h1>
        {!isLoading ? (
          <div className="tasks grid">
            {tasks.map((t) => (
              <TaskItem
                title={t.title}
                description={t.description}
                date={t.date}
                isCompleted={t.isCompleted}
                isImportant={t.isImportant}
                id={t.id}
                key={t.id}
              />
            ))}
            <button className="create-task" onClick={toggleModal}>
              {plus} Add New Task
            </button>
          </div>
        ) : (
          <div className="tasks-loader w-full h-9 flex justify-center content-center">
            <span className="loader"></span>
          </div>
        )}
      </TaskStyled>
    </>
  );
}

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorgrey1};
    }
  }

  .tasks {
    margin: 2rem 0;
  }
`;

export default Tasks;
