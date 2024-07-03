
const userRouter = require('./routing');
const express = require('express');
const app = express();
app.use(express.json());

app.use('/api',userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
