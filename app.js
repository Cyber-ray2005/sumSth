import express from "express";
import path from "path";
import url from "url";

const app = express();
const PORT = 3000;
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

// listen on port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});