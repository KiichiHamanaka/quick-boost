import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "GET": {
      // const { val1, val2 } = req.query;
      try {
        // const result = { val1, val2 };
        res.status(200).json({
          title: "aaaa",
          result: [
            {
              id: 1,
              name: "ぼしゅゅ",
              user: {
                name: "馬場P",
                grade: "民間人",
                rank: "EXX",
              },
              message: "逃げないで戦ってください",
              body:
                "　宇宙世紀００７９。人類が、増えすぎた人口を宇宙に移民させるようになって、すでに半世紀。地球から最も遠い宇宙都市サイド３は、ジオン公国を名乗り地球連邦政府に独立戦争を挑んできた。1ヶ月余りの戦いでジオン公国と連邦軍は、総人口の半分を死に至らしめ、連邦軍劣勢のまま戦争は膠着状態に陥る。\n" +
                "　サイド７の少年アムロ・レイは、ジオン軍の奇襲をきっかけに偶然、連邦軍の新型モビルスーツ・ガンダムに乗り込み、パイロットとなる。戦火を生き残るため、戦艦ホワイトベースで少年少女たちとともに軍人としての戦いを強いられていくうちに、やがて“ニュータイプ”として覚醒していく。",
              mobileSuites: [
                {
                  name: "ガンダム",
                  series: "機動戦士ガンダム",
                  imagePath: "/assets/ms/1.png",
                },
              ],
            },
            {
              id: 2,
              name: "ぼしゅゅ",
              user: {
                name: "シャア・アナルズブ",
                grade: "大元帥",
                rank: "EXX",
              },
              message: "逃げないで戦ってください",
              body:
                "シャア！ シャア！\n" +
                "\n" +
                "今はいいのさ すべてを忘れて\n" +
                "一人残った 傷ついた俺が\n" +
                "この戦場で あとに戻れば地獄におちる\n" +
                "シャア！        シャア！\n" +
                "ビーム 輝く\n" +
                "フラッシュバックに 奴の影\n" +
                "シャアシャアシャア シャアシャアシャア\n" +
                "流した血しぶき 後で後で拭け\n" +
                "狙いさだめる 俺がターゲット\n" +
                "シャアシャアシャア シャアシャアシャア\n" +
                "\n" +
                "今はいいのさ すべてを捨てて\n" +
                "一人残った 屍の俺が\n" +
                "この戦場で もがき苦しむ地獄の炎\n" +
                "シャア！      シャア！\n" +
                "ビーム 輝く\n" +
                "フラッシュバックに 奴の影\n" +
                "シャアシャアシャア シャアシャアシャア\n" +
                "一人で死ぬかよ 奴も奴も呼ぶ\n" +
                "狙いさだめる シャアがターゲット\n" +
                "シャアシャアシャア シャアシャアシャア\n" +
                "\n" +
                "ビームきらめく 雲を裂く\n" +
                "生きて見つめる……",
              mobileSuites: [
                {
                  name: "ガンダム",
                  series: "機動戦士ガンダム",
                  imagePath: "/assets/ms/1.png",
                },
              ],
            },
          ],
        });
        break;
      } catch (err) {
        break;
      }
    }
    case "POST": {
      // atlasに保存する処理
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
}
