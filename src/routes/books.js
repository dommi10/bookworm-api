import express from "express";

const route = express.Router();

route.get("/search", (_, res) => {
  res.status(200).json({
    books: [
      {
        goodreadsId: 1,
        title: "1984",
        authors: "Orwell",
        covers: [
          "https://images.gr-assets.com/books/13489905661/5470.jpg",
          "https://images.gr-assets.com/books/15046119571/9577857.jpg",
        ],
        pages: 198,
      },
      {
        goodreadsId: 2,
        title: "Three Men in a Boat",
        authors: "Jerome k. Jerome",
        covers: [
          "https://images.gr-assets.com/books/13927916561/2921.jpg",
          "https://images.gr-assets.com/books/13120368781/627830.jpg",
        ],
        pages: 198,
      },
    ],
  });
});

export default route;
