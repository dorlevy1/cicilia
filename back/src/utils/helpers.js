const {getBucket} = require("../utils/firebase");
const validateSchema = (schema, data) => {
    const {error} = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

const uploadFile = (dir, file) => {
    return new Promise((resolve, reject) => {
        const fileName = file.originalname;

        const blob = getBucket().file(`${dir}/${fileName}`);
        const steam = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        steam.on('error', (err) => {
            reject({message: 'Error uploading the file.', success: false});
        });

        steam.on('finish', async () => {
            await blob.makePublic();
        });

        steam.end(file.buffer);
        resolve({data: `https://storage.googleapis.com/${getBucket().name}/${blob.name}`, success: true})

    })
}


module.exports = {validateSchema, uploadFile};
