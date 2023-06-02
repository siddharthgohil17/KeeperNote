const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/keeperDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
main().catch((err) => console.log(err));

const keeperSchema = mongoose.Schema({
  title: String,
  description: String
});

const Keeper = new mongoose.model("Keeper", keeperSchema);

app.get("/api/getAll", (req, res) => {
  Keeper.find({})
    .then((keeperlist) => {
      const filteredList = keeperlist.filter(item => !item.isDeleted);
      res.status(200).json(filteredList);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});




app.post("/api/addnew", (req, res) => {
  const { title, description } = req.body;
  const keeperObj = new Keeper({
    title,
    description,
  });

  // console.log(keeperObj);

  keeperObj
    .save()
    .then(() => {
      Keeper.find({})
        .then((keeperlist) => {
          res.status(200).json(keeperlist);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post("/api/delete", (req, res) => {
  const { _id } = req.body;

  Keeper.findByIdAndDelete(_id)
    .then(() => {
  
      res.sendStatus(200);
      
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});


app.listen(3001, () => {
  console.log("Server running on port 3001");
});
