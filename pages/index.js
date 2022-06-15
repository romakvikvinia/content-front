import { Layout } from "components/Layout";
import { NewsLetter } from "components/NewsLetter";
import { ResourceHighlight } from "components/ResourceHighlight";
import { ResourceList } from "components/ResourceList";

function Home({ resources }) {
  return (
    <>
      <Layout>
        <ResourceHighlight resources={resources ? resources.slice(0, 2) : []} />
        <NewsLetter />

        <ResourceList resources={resources ? resources.slice(2) : []} />
      </Layout>
    </>
  );
}

// export async function getStaticProps() {
//   let data = await fetch("http://localhost:3000/api/resources");
//   let resources = await data.json();
//   return {
//     props: {
//       resources,
//     },
//   };
// }

export async function getServerSideProps() {
  let data = await fetch(`${process.env.API_URL}/resources`);
  let resources = await data.json();
  console.log(
    "resources",
    resources.map((res) => ({ params: { id: res.id } }))
  );
  return {
    props: {
      resources,
    },
  };
}

export default Home;
