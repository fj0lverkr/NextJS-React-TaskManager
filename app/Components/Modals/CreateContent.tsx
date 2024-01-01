"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { add, save } from "@/app/utils/Icons";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { Task } from "@prisma/client";

interface Props {
  editTask: Task | null;
}

function CreateContent({ editTask }: Props) {
  const [title, setTitle] = useState(editTask ? editTask.title : "");
  const [description, setDescription] = useState(
    editTask ? editTask.description : "",
  );
  const [date, setDate] = useState(editTask ? editTask.date : "");
  const [completed, setCompleted] = useState(
    editTask ? editTask.isCompleted : false,
  );
  const [important, setImportant] = useState(
    editTask ? editTask.isImportant : false,
  );
  const { theme, createTask, updateTask } = useGlobalState();

  const handleChange = (field: string) => (e: any) => {
    switch (field) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(Boolean(e.target.value));
        break;
      case "important":
        setImportant(Boolean(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };
    if (editTask) {
      await updateTask(editTask.id, task);
    } else {
      await createTask(task);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g., build a web-app with NextJS and React."
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description!}
          name="description"
          onChange={handleChange("description")}
          rows={4}
          placeholder="e.g., build a web-app with NextJS and React."
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          checked={completed}
          className="
          h-3.5
          w-8
          appearance-none
          rounded-[0.4375rem]
          after:absolute
          after:z-[2]
          after:-mt-[0.1875rem]
          after:h-5
          after:w-5
          after:rounded-full
          after:border-none
          after:content-['']
          checked:after:absolute
          checked:after:z-[2]
          checked:after:-mt-[3px]
          checked:after:ml-[1.0625rem]
          checked:after:h-5
          checked:after:w-5
          checked:after:rounded-full
          checked:after:border-none
          checked:after:content-['']"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          role="switch"
          checked={important}
          className="
          h-3.5
          w-8
          appearance-none
          rounded-[0.4375rem]
          after:absolute
          after:z-[2]
          after:-mt-[0.1875rem]
          after:h-5
          after:w-5
          after:rounded-full
          after:border-none
          after:content-['']
          checked:after:absolute
          checked:after:z-[2]
          checked:after:-mt-[3px]
          checked:after:ml-[1.0625rem]
          checked:after:h-5
          checked:after:w-5
          checked:after:rounded-full
          checked:after:border-none
          checked:after:content-['']"
          onChange={handleChange("important")}
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={editTask ? "Save changes" : "Create Task"}
          icon={editTask ? save : add}
          padding="0.8rem 2rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          background={theme.colorBlue}
        />
      </div>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  color: ${(props) => props.theme.colorGrey1};

  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      border: none;
      padding: 1rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;
    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorGreenDark} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      flex: 1;
      cursor: pointer;
      margin-bottom: 0;
    }

    input {
      width: 2rem;
      padding: 0;
      -webkit-box-shadow: inset 0px 0px 3px 2px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: inset 0px 0px 3px 2px rgba(0, 0, 0, 0.3);
      box-shadow: inset 0px 0px 3px 2px rgba(0, 0, 0, 0.3);
      background-color: ${(props) => props.theme.colorDanger};
      &::after {
        background-color: ${(props) => props.theme.colorGreyDark};
      }
      &:checked {
        background-color: ${(props) => props.theme.colorGreenDark};
      }
    }
  }
`;

export default CreateContent;
