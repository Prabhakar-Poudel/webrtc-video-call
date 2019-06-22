import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("<div> It works !! </div>")
});

app.listen(3001);
