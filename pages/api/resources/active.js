export default async function active(req, res) {
  let data = undefined;
  let result = undefined;
  const { method, body } = req;

  switch (method) {
    default: {
      data = await fetch(`${process.env.API_URL}/resources/active`);
    }
  }

  if (!data.ok) {
    data = await data.json();

    return res.status(204).json(data);
  }
  if (data.status !== 204) result = await data.json();

  res.json(result || {});
}
