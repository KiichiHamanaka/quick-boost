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
        const users = await User.find();
        res.status(200).json(users);
        console.log(users);
        break;
      } catch (e) {
        console.error(e);
        break;
      }
    }
    case "POST": {
      try {
        // const user = await User.create(req.body);

        const testUser = {
          twitter: "dogages",
          handleName: "KIE",
          openSNSName: "Free",
        };
        const user = await User.create(testUser);
        res.status(201).json({ success: true, data: user });
        // リダイレクト

        break;
      } catch (e) {
        console.error(e);
        // リダイレクト
        break;
      }
    }
    default: {
      res.status(403).end();
    }
  }
};

export default handler;
