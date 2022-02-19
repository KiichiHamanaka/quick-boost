import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/models/User";
import connectDB from "../../../db/atlas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        const users = await User.find().populate({
          path: "grade",
          select: "name",
        });
        // .populate({
        //   path: "rank",
        //   select: "name power",
        // })
        // .populate({
        //   path: "favoriteMS",
        //   select: "name cost series",
        //   populate: { path: "series", select: "name" },
        // });
        const obj = {
          statusCode: 200,
          errorMessage: "Success",
          users,
        };
        console.dir(obj, { depth: null });
        res.status(200).json(obj);
        // console.log(users);
        break;
      } catch (e) {
        console.error(e);
        break;
      }
    }
    case "POST": {
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
        break;
      } catch (e) {
        console.error(e);
        break;
      }
    }
    default: {
      res.status(403).end();
    }
  }
};

export default handler;
