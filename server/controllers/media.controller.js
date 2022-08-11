import mongoose from "mongoose";
import formidable from "formidable";
import fs from "fs";
import Media from "../models/media.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { extend } from "lodash";

let gridfs = null;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "media",
  });
});

const create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video Could not be uploaded",
      });
    }
    let media = new Media(fields);
    media.postedBy = req.profile;
    if (files.video) {
      let writestream = await gridfs.openUploadStream(media._id, {
        contentType: files.video.type || "binary/octet-stream",
      })
       await fs.createReadStream(files.video.filepath).pipe(writestream);
    }
    try {
      let result = await media.save();
      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err),
      });
    }
  });
};
const mediaById = async (req, res, next, id) => {
  try {
    let media = await Media.findById(id)
      .populate("postedBy", "_id name")
      .exec();
      console.log(media, "media");

    if (!media) {
      return res.status("400").json({
        error: "Media not found",
      });
    }
    req.media = media;
    let files = await gridfs.find({ filename: media._id }).toArray();
      console.log(files, "files");

    if (!files[0]) {
      return res.status(404).send({
        error: "No video found",
      });
    }
    req.file = files[0];
    next();
  } catch (err) {
      console.log(err, "err");

    return res.status(404).send({
      error: "Could not retriver media file",
    });
  }
};

const video = (req, res) => {
  const range = req.headers["range"];
  if (range && typeof range === "string") {
    const parts = range.replace(/bytes=/, "").split("-");
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : req.file.length - 1;

    const chunksize = end - start + 1;
    res.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Range": "bytes " + start + "-" + end + "/" + req.file.length,
      Content: req.file.contentType,
    });
    let downloadStream = gridfs.openDownloadStream(req.file._id, {
      start,
      end: end + 1,
    });
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } else {
    res.headers("Content-Length", req.file.lengh);
    res.headers("Content-type", req.file.contentType);

    let downloadStream = gridfs.openDownloadStream(req.file._id);
    downloadStream.pipe(res);
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  }
};
const listPopular = async (req, res) => {
  try {
    let media = await Media.find()
      .populate("postedBy", "_id name")
      .sort("-views")
      .limit(9)
      .exec();
    res.json(media);
    console.log(media,'media')
  } catch (err) {
    console.log(err, "err");

    res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};
const listByUser = async (req, res) => {
  try {
    let media = await Media.find({ postedBy: req.profile._id })
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    res.json(media);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const incrementViews = async (req, res, next) => {
  try {
    await Media.findByIdAndUpdate(
      req.media._id,
      { $inc: { views: 1 } },
      { new: true }
    ).exec();
    next();
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const read = async (req, res) =>{
    try{
        return res.json(req.media)
    }catch(err){
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err),
        });

    }

}
const isPoster = (req, res, next)=>{
    let isPoster =req.media && req.auth && req.media.postedBy._id == req.auth._id;
    if(!isPoster){
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }
    next();
}
const update = async (req, res)=>{
    try{
        let media = req.media
        media = extend(media, req.body)
        media.updated = Date.now()
        await media.save()
        res.json(media)
    }catch(err){
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err),
        });
    }

}
const listRelated = async (req, res)=>{
  console.log(req.media, 'related media')
    try{
        let media = await Media.find({_id:{$ne: req.media._id}, genre: req.media.genre}).limit(4).sort('-views').populate('postedby', '_id name').exec()
        res.json(media);
    }catch(err){
      console.log(err, 'related err')
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)})
    }
}

export default {
  create,
  mediaById,
  video,
  listPopular,
  listByUser,
  incrementViews,
  read,
  isPoster,
  update,
  listRelated
};
