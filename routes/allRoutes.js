// products schema
const { default: axios } = require('axios');
const nasaNewsModel = require('../models/nasaNews');
const marsRoverPhotosModel = require('../models/marsRoverPhotos');

// user schema 
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const cron = require("node-cron");

const setupRoutes = (app) => {

  app.post("/register", async (req, resp) => {
    const user = new UserModel(req.body);
    const result = await user.save();
    resp.send(result);
  });

  app.post("/login", async (req, resp) => {
    const { email, password } = req.body;
    if (password && email) {
      let user = await UserModel.findOne(req.body).select("-password");

      const token = jwt.sign({ sub: user._id }, "ahmed", {
        expiresIn: 604800000,
      });

      if (user) {
        resp.send({ user, token });
      } else {
        resp.send({ result: "no user found" });
      }
    } else {
      resp.send({ result: "no  pass or email" });
    }
  });

  app.post("/getPostNasa", async (req, res) => {
    try {
      const dataFromApi = req.body;
      const existingData = await nasaNewsModel.findOne(dataFromApi);

      if (!existingData) {
        const dataNewsAtNASA = new nasaNewsModel(dataFromApi);
        const result = await dataNewsAtNASA.save();
        res.status(201).send(result);
        console.log(result);
      } else {
        res.status(200).json({ message: 'Data already exists' });
        console.log('Data already exists');
        console.log(dataFromApi);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });

  app.get("/getPostNasa", async (req, res) => {
    try {
      const data = await nasaNewsModel.find();
      res.status(200).json(data);

    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });


  // app.get("/marsRoverPhotos", async (req, res) => {
  //   // try {
  //   //   const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${keyApiNasa}`);
  //   //   const photoData = response.data.photos;

  //   //   const savedRecords = await Promise.all(photoData.map(async photo => {
  //   //     const dataMarsRoverPhotos = new marsRoverPhotosModel(photo);
  //   //     return await dataMarsRoverPhotos.save();
  //   //   }));

  //   //   res.status(200).json({
  //   //     message: `Successfully registered ${savedRecords.length} records.`,
  //   //     records: savedRecords,
  //   //   });
  //   // } catch (err) {
  //   //   res.status(500).json({ error: err.message });
  //   // }


  //   try {
  //     // استرجاع البيانات من قاعدة البيانات
  //     const data = await marsRoverPhotosModel.find().exec();
  //     res.json(data); // إرسال البيانات كاستجابة JSON إلى العميل
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }

  // });





  // app.put("/edit-item/:id", async (req, res) => {

  //   try {
  //     let result = await productModel.updateOne(
  //       { _id: req.params.id },
  //       { $set: req.body }
  //     )
  //     res.send(result);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }

  // })


  // app.delete("/delete-item/:id", async (req, res) => {
  //   try {
  //     let result = await productModel.deleteOne({ _id: req.params.id });
  //     res.send(result);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // })


}


module.exports = setupRoutes;



