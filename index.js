const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getResponse(req,res) {
	const openai = new OpenAIApi(configuration);

	const response = await openai.createImage({
	  prompt: req.query.prompt,
	  n: 1,
	  size: "1024x1024",
	});
	image_url = response.data.data[0].url;

	res.send(image_url)
}


app.get('/img',getResponse)

app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(3000,() => console.log('Server active on port 3000'))