export default async function resources(req, res) {
  let data = undefined;

  const { method, body } = req;
  console.log("yes");
  switch (method) {
    case "POST": {
      const {
        body: { title, description, link, priority, timeToFinish },
      } = req;

      if (!title || !description || !link || !priority || !timeToFinish)
        return res.status(422).json({ code: 422, message: "Data are missing" });

      data = await fetch(`${process.env.API_URL}/resources`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      break;
    }
    case "PATCH": {
      const {
        body: { title, description, link, priority, timeToFinish },
      } = req;

      if (!title || !description || !link || !priority || !timeToFinish)
        return res.status(422).json({ code: 422, message: "Data are missing" });

      data = await fetch(`${process.env.API_URL}/resources/${req.body.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      break;
    }
    default: {
      data = await fetch(`${process.env.API_URL}/resources`);
    }
  }

  if (!data.ok) {
    data = await data.json();
    return res.status(400).json(data);
  }
  data = await data.json();
  res.json(data);
}
