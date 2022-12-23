const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routerApi = require('./router');
const {
  errorLog,
  errorHandler,
  errorBoomHandler,
  errorOrmHandler,
} = require('./middlewares/error.handler');

const { config } = require('./config');

require('./utils/auth');

const app = express();
const port = config.port;
const whiteList = ['http://localhost:8080', 'https://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('URL not allowed'));
    }
  },
};
app.use(cors(options));

app.use(morgan('tiny'));

app.use(express.json());

routerApi(app);

app.use(errorLog);
app.use(errorOrmHandler);
app.use(errorBoomHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log('App running on port http://localhost:' + port);
});
