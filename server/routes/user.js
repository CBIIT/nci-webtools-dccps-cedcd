import Router from "express-promise-router";

const router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    status: 200,
    data: [
      {
        id: 1,
        username: "Kevin",
      },
      {
        id: 2,
        username: "David",
      },
    ],
  });
});

export default router;
