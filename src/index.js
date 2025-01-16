import express from 'express';
import dbConnection from './database/index.js';
import { PORT } from './utils/config.js';
import { info } from './utils/logger.js';
import { routerNotes } from './routes/notes.js';
import { routerAuth } from './routes/auth.js';

const app = express();

dbConnection();

app.use(express.json());

app.use('/api/notes', routerNotes);
app.use('/api/auth', routerAuth);

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`);
});