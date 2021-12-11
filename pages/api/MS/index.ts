import type { NextApiRequest, NextApiResponse } from "next";
import Find from "../../../models/Find";
import connectDB from "../../../lib/atlas";
import MobileSuit from "../../../models/MobileSuit";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        const mobileSuits = await MobileSuit.find();
        res.status(200).json(mobileSuits);
        break;
      } catch (err) {
        console.error(err);
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
    case "PUT": {
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
