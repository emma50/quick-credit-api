export default () => (err, req, res) => {
  res.status(500).json('Something Failed.');
  res.status(404).json('Error 404, no data was retrieved please');
};
