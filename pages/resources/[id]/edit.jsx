import React, { useCallback } from "react";
import { Layout } from "components/Layout";
import { ResourceForm } from "components/ResourceForm";

const Edit = ({ id, title, description, link, priority, timeToFinish }) => {
  const updateResource = useCallback((form) =>
    fetch(`/api/resources`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...form,
      }),
    })
  );
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="resource-form">
              <h1 className="title">Editing Resource</h1>
              <ResourceForm
                onSubmitForm={updateResource}
                data={{
                  id,
                  title,
                  description,
                  link,
                  priority,
                  timeToFinish,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  let item = await fetch(`${process.env.API_URL}/resources/${id}`);
  item = await item.json();
  return {
    props: { ...item },
  };
}

export default Edit;
