const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});


const getImage = (imgID = "823ff5d09468bec077198e27a3822d93") => {
    cloudinary.api
    .resource_by_asset_id(imgID)
    .then(console.log)
}


module.exports = {
    storage,
    getImage
};
