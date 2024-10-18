import express from "express";
import path from "path";
import url from "url";
import dotenv from 'dotenv';
import { summarizeText } from "./public/services/summarize.js";
import { textToImage } from "./public/services/textToImage.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const rootPath = path.dirname(url.fileURLToPath(import.meta.url));
const resolvedPath = path.resolve(rootPath, 'public');

// middlewares and config
app.use(express.static(resolvedPath));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    console.log(`Method: ${req.method}\nPath: ${req.path}\n`, req.query);
    next();
});


// routes
app.get('/', (req, res) => {
    res.redirect('/summarizer');
});
app.get('/summarizer', (req, res) => {
    res.render('summarizer', {});
});
app.post('/summarizer', async (req, res) => {
    const { formText } = req.body;
    if (!formText || formText.trim() === '') {
        const errorMessage = 'Input cannot be empty. Please provide some text to summarize.';
        console.error(errorMessage);
        return res.render('summarizer', {
            formText: formText,
            summarizedText: errorMessage
        });
    }
    try {
        const sumText = await summarizeText(formText);
        res.render('summarizer', {
            formText: formText,
            summarizedText: sumText
        });
    } catch (error) {
        console.error('Error summarizing text:', error);
        res.render('summarizer', {
            formText: formText,
            summarizedText: 'Failed to generate summary. Please try again later.'
        });
    }
});

app.get('/textToImage', (req, res) => {
    res.render('textToImage', {});
});

app.post('/textToImage', async (req, res) => {
    const text = req.body.queryText;
    try {
        textToImage(text)
        .then(response => {
            return Buffer.from(response, 'binary').toString('base64');
        })
        .then(base64Image => {
            const imageUrl = `data:image/jpeg;base64,${base64Image}`;
            res.render('textToImage', {formText: text, generatedImage: imageUrl});
        })
    } catch(error) {
        console.error('Error generating image:', error);
        res.render('textToImage', {
            formText: formText,
            generatedImage: 'Failed to generate image. Please try again later.'
        });
    }
});

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});