import type { NextApiRequest, NextApiResponse } from "next";
import Find from "../../../models/Find";
import connectDB from "../../../lib/atlas";

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        console.log("aaaaaaaaaaa");
        const finds = await Find.find();
        res.status(200).json(finds);
        console.log(finds);
        break;
      } catch (err) {
        break;
      }
    }
    case "POST": {
      try {
        const find = await Find.create(req.body);
        res.status(200).json(find);
        break;
      } catch (e) {
        break;
      }
    }
    default: {
      res.status(403).end();
    }
  }
};

export default handler;
