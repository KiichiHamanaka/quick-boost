import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
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
        const user = await User.findOne({ twitter: id });
        res.status(200).json(user);
        break;
      } catch (err) {
        break;
      }
    }
    case "PUT": {
      try {
        const { val1, val2 } = req.body;
        const result = val1 + val2;
        res.status(200).json({ result });
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
