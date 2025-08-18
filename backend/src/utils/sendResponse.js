exports.send = (res, data = null, message = 'OK', status = 200) => {
  return res.status(status).json({ message, data });
};
