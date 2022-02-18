const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
})

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
})