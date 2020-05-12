import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";
import authenticate from "../middlewares/authenticate";

const route = express.Router();
route.use(authenticate);

route.get("/search", (req, res) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`
    )
    .then((result) =>
      parseString(result, (err, goodResult) => {
        if (err) {
          res.status(403).json({ errors: { global: "something went wrong" } });
        } else
          res.json({
            books: goodResult.GoodreadsResponse.search[0].results[0].work.map(
              (work) => ({
                goodreadsId: parseInt(work.best_book[0].id[0]._, 2),
                title: work.best_book[0].title[0],
                authors: work.best_book[0].author[0].name[0],
                covers: [work.best_book[0].image_url[0]],
                // pages: 198,
              })
            ),
          });
      })
    );
});

export default route;
