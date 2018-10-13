import * as express from 'express';
import { logger } from './logger/index';

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/status', (req, res) => {
  return res.json({ status: 200 });
})

app.listen(PORT, () => {
  logger.info(`homeless-household-server running on port ${PORT}`);
})
