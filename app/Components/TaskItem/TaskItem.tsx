"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import formatDate from "@/app/utils/formatDate";
import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
  onEditClick: () => void;
}
function TaskItem({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
  onEditClick,
}: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              updateTask(id, {
                title,
                description,
                date,
                isCompleted: false,
                isImportant,
              });
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              updateTask(id, {
                title,
                description,
                date,
                isCompleted: true,
                isImportant,
              });
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit" onClick={onEditClick}>
          {edit}
        </button>
        <button className="delete" onClick={() => deleteTask(id)}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 30px;
      background-color: ${(props) => props.theme.colorDanger};
    }

    .completed {
      background-color: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

export default TaskItem;
