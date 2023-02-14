import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import getMetaData from "metadata-scraper";

const prisma = new PrismaClient();
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/offers", async (req, res) => {
  const offers = await prisma.offer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json(offers);
});

app.post("/offers", async (req, res) => {
  const { url, title, img, description, user_id } = req.body;
  const offer = await prisma.offer.create({
    data: {
      url,
      title,
      img,
      description,
      user_id,
    },
  });

  res.json(offer);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({ message: "Missing username" });
  } else if (!password) {
    res.status(400).json({ message: "Missing password" });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (user.password === password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
});

app.post("/metadata", async (req, res) => {
  const { metadata_url } = req.body;
  if (!metadata_url) {
    res.status(400).json({ message: "Invalid URL or internal problem" });
  } else {
    const metadata = await getMetaData(metadata_url);
    res.status(200).json(metadata);
  }
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
