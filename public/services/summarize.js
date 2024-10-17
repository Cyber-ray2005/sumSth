import axios from "axios";

async function summarizeText(text) {
   let data = JSON.stringify({
     "inputs": text,
     "parameters": {
       "max_length": 100,
       "min_length": 30
     }
   });

   let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.SUMKEY
    },
    data: data
  };
    try {
        const response = await axios.request(config);
        if (response.data.error) {
          throw new Error(response.data.error);
      }
        return response.data[0].summary_text;
    } catch (err) {
        console.log(err);
    }
}

export {summarizeText};