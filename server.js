import Express from 'express';
import db from './config/connection';

const routes = require('./routes');

const PORT = 3001 || process.env.PORT;
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
