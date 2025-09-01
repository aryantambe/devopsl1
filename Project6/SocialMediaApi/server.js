const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('👋 SocialMedia API is up. Try /posts or /compute?loops=30000000');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, author: 'anushree', text: 'hello world' },
    { id: 2, author: 'devops',    text: 'k8s autoscaling demo' }
  ]);
});

// CPU-burn endpoint to trigger HPA scaling
app.get('/compute', (req, res) => {
  const loops = Number(req.query.loops || 30000000); // 30M default
  let acc = 0;
  for (let i = 0; i < loops; i++) {
    acc += Math.sqrt(i);
  }
  res.json({ ok: true, loops, acc, pid: process.pid, host: process.env.HOSTNAME });
});

app.listen(PORT, () => {
  console.log(`SocialMedia API listening on port ${PORT}`);
});
