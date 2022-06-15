import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import moment from "moment";

const ActiveResource = () => {
  const [state, setState] = useState({});
  const [seconds, setSeconds] = useState(0);
  const fetchActiveResource = useCallback(async () => {
    try {
      let data = await fetch("/api/resources/active");
      if (!data.ok) {
        data = await data.json();
        throw new Error(data.message);
      }
      data = await data.json();

      const timeToFinish = parseInt(data.timeToFinish, 10);
      const elapsedTime = moment().diff(moment(data.activationDate), "seconds");
      const updatedTimeToFinish = timeToFinish * 60 - elapsedTime;

      if (updatedTimeToFinish >= 0) {
        data.timeToFinish = updatedTimeToFinish;
        setSeconds(updatedTimeToFinish);
      }
      setState(data);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const completeResource = useCallback(async () => {
    try {
      let data = await fetch("/api/resources", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state,
          status: "complete",
        }),
      });
      if (!data.ok) {
        data = await data.json();
        throw new Error(data.message);
      }
      location.reload();
    } catch (error) {
      alert(error.message);
    }
  }, [state]);

  useEffect(() => {
    fetchActiveResource();
  }, [fetchActiveResource]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds <= 0) clearInterval(interval);
      setSeconds((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const hasResource = state && state.id;
  return (
    <div className="active-resource">
      <h1 className="resource-name">
        {hasResource ? state.title : "No Active Resource"}
      </h1>
      <div className="time-wrapper">
        {hasResource &&
          (seconds > 0 ? (
            <h2 className="elapsed-time"> {seconds}</h2>
          ) : (
            <h2 className="elapsed-time">
              <button className="button is-success" onClick={completeResource}>
                Click and Done
              </button>
            </h2>
          ))}
      </div>
      {hasResource ? (
        <Link href={`/resources/${state.id}`}>
          <a className="button">Go to resource</a>
        </Link>
      ) : (
        <Link href={`/`}>
          <a className="button">Go to resources</a>
        </Link>
      )}
    </div>
  );
};
export default ActiveResource;
