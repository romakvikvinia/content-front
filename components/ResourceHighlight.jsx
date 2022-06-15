import React from "react";
import Link from "next/link";
import { ResourceLabel } from "./ResourceLabel";
import moment from "moment";

const ResourceItem = ({ id, title, description, createdAt, status }) => (
  <section className="section">
    <div className="columns">
      <div className="column is-8 is-offset-2">
        <div className="content is-medium">
          <h2 className="subtitle is-4">
            {moment(createdAt).format("LLL")}
            <ResourceLabel status={status} />
          </h2>
          <h1 className="title">{title}</h1>
          <p>{description}</p>
          <Link href={`/resources/${id}`}>
            <a className="button is-text"> More</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export const ResourceHighlight = ({ resources }) => {
  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          {resources.map((resource) => (
            <React.Fragment key={`resource-item-${resource.id}`}>
              <ResourceItem {...resource} />
              <div className="is-divider"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
