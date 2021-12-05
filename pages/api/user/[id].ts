import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
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
        const user = await User.findById(id);
        res.status(200).json(user);

        // res.status(200).json({
        //   name: "馬場P",
        //   grade: "民間人",
        //   rank: "EXX",
        // });
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
