import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/common/config/db.js';

const PORT = process.env.PORT ?? 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.log(`Error in connecting to the database: ${err}`);
  process.exit(1);
});
