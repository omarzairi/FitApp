import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<center><b>Hello 3ASISOS Welcome To FitApp!</b></center>");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
