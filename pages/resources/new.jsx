import React, { useCallback } from "react";
import { Layout } from "components/Layout";
import { ResourceForm } from "components/ResourceForm";

function New() {
  const createResource = useCallback(
    (form) =>
      fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }),
    []
  );
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="resource-form">
              <h1 className="title">Add New Resource</h1>
              <ResourceForm onSubmitForm={createResource} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default New;
