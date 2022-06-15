import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Layout } from "components/Layout";
import Link from "next/link";
import { ResourceLabel } from "components/ResourceLabel";
import moment from "moment";

const ResourceDetail = ({ id, createdAt, title, description, ...resource }) => {
  const router = useRouter();

  const activateResource = useCallback(async () => {
    try {
      let data = await fetch("/api/resources", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...resource,
          id,
          createdAt,
          title,
          description,
          status: "active",
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
  }, []);

  if (router.isFallback) return <div>Loading data...</div>;

  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {moment(createdAt).format("LLL")}{" "}
                      <ResourceLabel status={resource.status} />
                    </h2>
                    <h1 className="title">{title}</h1>
                    <p>{description}</p>
                    <p>Time to finish: {resource.timeToFinish} min</p>
                    {resource.status === "inactive" && (
                      <>
                        <Link href={`/resources/${id}/edit`}>
                          <a className="button is-info ">Edit</a>
                        </Link>
                        <button
                          onClick={activateResource}
                          type="button"
                          className="button ml-1 is-success"
                        >
                          Activate
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   let data = await fetch("http://localhost:3001/api/resources");
//   let resources = await data.json();

//   //   return {
//   //     paths: resources.map((res) => ({ params: { id: res.id.toString() } })),
//   //     fallback: false,
//   //   };
//   return {
//     paths: resources.map((res) => ({ params: { id: res.id.toString() } })),
//     fallback: true,
//   };
// }

// export async function getStaticProps(ctx) {
//   const { id } = ctx.params;
//   let item = await fetch(`http://localhost:3001/api/resources/${id}`);
//   item = await item.json();
//   return {
//     props: { ...item },
//   };
// }
export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  let item = await fetch(`${process.env.API_URL}/resources/${id}`);
  item = await item.json();
  return {
    props: { ...item },
  };
}
// ResourceDetail.getInitialProps = async function (ctx) {
//   const { id } = ctx.query;
//   let item = await fetch(`http://localhost:3001/api/resources/${id}`);
//   item = await item.json();
//   console.log(item);
//   return {
//     ...item,
//   };
// };

export default ResourceDetail;
