const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/NASA_NEWS", {
	useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
	console.log('connect');
}).catch((err) => {
	console.log(err);
})