const mongoose = require("mongoose")

const marsRoverPhotosSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    sol: { type: Number, required: true },
    camera: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        rover_id: { type: Number, required: true },
        full_name: { type: String, required: true },
    },
    img_src: { type: String, required: true },
    earth_date: { type: String, required: true },
    rover: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        landing_date: { type: String, required: true },
        launch_date: { type: String, required: true },
        status: { type: String, required: true },
        max_sol: { type: Number, required: true },
        max_date: { type: String, required: true },
        total_photos: { type: Number, required: true },
        cameras: [
            {
                name: { type: String, required: true },
                full_name: { type: String, required: true },
            },
        ],


    },
})

module.exports = mongoose.model('marsRoverPhotos', marsRoverPhotosSchema)