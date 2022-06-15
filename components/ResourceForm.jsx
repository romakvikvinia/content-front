import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";

export const ResourceForm = ({ onSubmitForm, data }) => {
  const [{ title, description, link, priority, timeToFinish }, setState] =
    useState({
      title: data?.title,
      description: data?.description,
      link: data?.link,
      priority: data?.priority,
      timeToFinish: data?.timeToFinish,
    });
  const router = useRouter();

  const handleChange = useCallback((e) => {
    let { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setState({
      title: "",
      description: "",
      link: "",
      priority: 2,
      timeToFinish: 60,
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let data = await onSubmitForm({
          title,
          description,
          link,
          priority,
          timeToFinish,
        });

        if (!data.ok) {
          data = await data.json();
          throw new Error(data.message);
        }
        router.push("/");
      } catch (error) {
        alert(error?.message);
      }

      // await axios.post("/api/resources", {
      //   title,
      //   description,
      //   link,
      //   priority,
      //   timeToFinish,
      // });
    },
    [title, description, link, priority, timeToFinish, router]
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Description"
            value={description}
            name="description"
            onChange={handleChange}
          >
            {/* {description} */}
          </textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Link</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Link"
            name="link"
            value={link}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Priority</label>
        <div className="control">
          <div className="select">
            <select name="priority" value={priority} onChange={handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Time To Finish</label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="60"
            name="timeToFinish"
            value={timeToFinish}
            onChange={handleChange}
          />
          <p className="help">Time is in minutes</p>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            onClick={resetForm}
            className="button is-link is-light"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
