import app from './app';

const PORT = 3333;

app.listen(PORT, () => {
  console.clear();
  console.log(`⚡ Server is running on port ${PORT}.`);
});
