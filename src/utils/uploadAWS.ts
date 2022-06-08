import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

aws.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: process.env.reigion,
});

const s3 = new aws.S3();

//multer.upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.bucket_name,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      file.originalname = file.originalname.replace(/ /g, '_');
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

//upload singlefile
const uploadSingleFile = upload.single('file');

//upload multiplefiles
const uploadMultipleFiles = upload.array('files', 12);

//upload on aws s3
const uploadOnAwsS3 = (req, res, next) => {
  uploadSingleFile(req, res, (err) => {
    if (err) {
      console.log(err.message, err);
      res.status(500).json({
        error: err,
      });
    }
    next();
  });
};

export { uploadOnAwsS3, uploadMultipleFiles };
