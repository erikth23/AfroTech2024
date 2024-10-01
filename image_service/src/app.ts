import express from 'express';
import { router as routes } from './routes/index';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', routes);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export {
  app
}
