"use client";

import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const handleChange = (field: string) => (e: ChangeEvent) => {
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

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Task created successfully");
      }
    } catch (e) {
      toast.error("Something went wrong while processing the request.");
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={description}
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
      <div className="input-control">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange("important")}
        />
      </div>
      <div className="submit-btn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CreateContent;
