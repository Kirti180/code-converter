const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors=require("cors")
const app = express();
require('dotenv').config();

app.use(cors({origin:"*"}))
app.use(bodyParser.json());



app.get("/",(req,res)=>{
    res.send("hi")
})
app.post('/convert', async (req, res) => {
    const { code, targetLanguage } = req.body;
    console.log(code, targetLanguage);
    
    // Make a request to the GPT API for code conversion
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `Translate the following code from ${targetLanguage.source} to ${targetLanguage.target}:\n${code}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  
    const convertedCode = response.data.choices[0].text.trim();
    console.log(convertedCode);
    res.status(200).send({ convertedCode });
  });
  


app.post('/debug',async (req, res) => {
    const { code } = req.body;

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: `Check this code and debug it and give me correct code:\n${code}`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
    
      const shayari = response.data.choices[0].text.trim();
      console.log(shayari)
      res.status(200).send({shayari})

})


app.post('/check',async (req, res) => {
    const { code } = req.body;

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: `Do quality Check for this code and give me  feedback:\n${code}`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
    
      const shayari = response.data.choices[0].text.trim();
      console.log(shayari)
      res.status(200).send({shayari})

})

app.listen(4500, () => {
  console.log('Server is running on port 4500');
});