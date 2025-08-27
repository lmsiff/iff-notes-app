import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import noteRoutes from './routes/noteRoutes.js';
import { setupSwagger } from './config/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api', noteRoutes);

setupSwagger(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

export default app;
