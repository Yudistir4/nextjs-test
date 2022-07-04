// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Task from "../../../models/tasks";

interface Task {
  id: string;
  task: string;
}

interface Tasks {
  tasks: Task[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    if (req.method === "GET") {
      const task = await Task.findById(req.query.id);
      res.json({ task });
    } else if (req.method === "POST") {
      try {
        let data = new Task(req.body);
        const task = await data.save();
        res.status(200).json({ task });
      } catch (e) {
        console.log("something went wrong :", e);
      }
    } else if (req.method === "DELETE") {
      try {
        let data = await Task.deleteOne({ _id: req.query.id });

        res.status(200).json({ data });
      } catch (e) {
        res.status(400).json({ message: "error" });
        console.log("something went wrong");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
