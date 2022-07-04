import connectMongo from "../../../utils/connectMongo";
import Task from "../../../models/tasks";

export default async function handler(req, res) {
  try {
    await connectMongo();
    if (req.method === "GET") {
      //   const tasks = await Task.find();
      //   res.json({ tasks });

      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 5,
        // sort: req.query.sort?.replace(" ", "+") || "",
        sort: req.query.sort || "",
      };
      console.log(options);
      const data = await Task.paginate(req.query, options);
      res.json(data);
    } else if (req.method === "POST") {
      try {
        let data = new Task(req.body);
        const task = await data.save();
        res.status(200).json({ task });
      } catch (e) {
        console.log("something went wrong :", e);
      }
    } else if (req.method === "DELETE") {
    }
  } catch (error) {
    console.log(error);
  }
}
