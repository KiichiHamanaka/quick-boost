import type { NextApiRequest, NextApiResponse } from "next";
import Tnread from "../../../models/Thread";
import connectDB from "../../../lib/atlas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        const finds = await Tnread.find();
        res.status(200).json(finds);
        break;
      } catch (err) {
        console.error(err);
        break;
      }
    }
    case "POST": {
      try {
        const find = await Tnread.create(req.body);
        res.status(200).json(find);
        break;
      } catch (e) {
        break;
      }
    }
    case "PUT": {
      try {
        const find = await Tnread.create(req.body);
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
