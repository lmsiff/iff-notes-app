import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import noteRoutes from './routes/noteRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api', noteRoutes);


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
