const express = require('express');
const app = express();
require('dotenv').config();
const planetsRouter = require('./routes/planets'); 

app.use(express.json());
app.use(planetsRouter); 

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server avviato sulla porta ${process.env.PORT || 3000}`);
});
