import type { NextApiRequest, NextApiResponse } from "next";
import Find from "../../../models/Find";
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
        // console.log(`id is ${id}`);
        if (typeof id === "string") {
          const find = await Find.findById(id);
          res.status(200).json(find);
          // console.log(find);
        }
        // const find = await Find.findById(numId);
        //
        // res.status(200).json(find);
        // console.log(find);
        // res.status(200).json({
        //   id: 1,
        //   name: "ぼしゅゅ",
        //   user: {
        //     name: "馬場P",
        //     grade: "民間人",
        //     rank: "EXX",
        //   },
        //   message: "逃げないで戦ってください",
        //   body:
        //     "　宇宙世紀００７９。人類が、増えすぎた人口を宇宙に移民させるようになって、すでに半世紀。地球から最も遠い宇宙都市サイド３は、ジオン公国を名乗り地球連邦政府に独立戦争を挑んできた。1ヶ月余りの戦いでジオン公国と連邦軍は、総人口の半分を死に至らしめ、連邦軍劣勢のまま戦争は膠着状態に陥る。\n" +
        //     "　サイド７の少年アムロ・レイは、ジオン軍の奇襲をきっかけに偶然、連邦軍の新型モビルスーツ・ガンダムに乗り込み、パイロットとなる。戦火を生き残るため、戦艦ホワイトベースで少年少女たちとともに軍人としての戦いを強いられていくうちに、やがて“ニュータイプ”として覚醒していく。",
        //   mobileSuites: [
        //     {
        //       name: "ガンダム",
        //       series: "機動戦士ガンダム",
        //       imagePath: "/assets/ms/1.png",
        //     },
        //   ],
        // });
        break;
      } catch (e) {
        console.error(e);
        break;
      }
    }
    case "PUT": {
      try {
        const find = await Find.create(req.body); //mongooseでcreateではなくupdateがあるか調べる
        res.status(201).json({ find });
        break;
      } catch (e) {
        break;
      }
    }
    case "DELETE": {
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
