import { MONGODB_URI, PORT } from '../config/config';
import app from './express';
import mongoose from 'mongoose';


mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, {
    useNewUrlParser:true,
});

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
  console.log("DB connected...");
});


app.listen(PORT, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on %s.",PORT);
});