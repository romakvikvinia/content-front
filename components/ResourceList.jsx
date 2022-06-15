import React from "react";
import Link from "next/link";
import { ResourceLabel } from "./ResourceLabel";
import moment from "moment";

export const ResourceList = ({ resources }) => {
  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="columns is-multiline is-variable is-8">
              {resources.map((item) => (
                <div
                  className="column is-5 is-offset-1 "
                  key={`res-${item.id}`}
                >
                  <div className="content is-medium">
                    <h2 className="subtitle is-5 has-text-grey">
                      {moment(item.createdAt).format("LLL")}{" "}
                      <ResourceLabel status={item.status} />
                    </h2>
                    <h1 className="title has-text-black is-3">{item.title}</h1>
                    <p className="has-text-dark">{item.description}</p>
                    <Link href={`/resources/${item.id}`}>
                      <a className="button is-text"> More</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
