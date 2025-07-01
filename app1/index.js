const amqp = require('amqplib');
const { performance } = require('perf_hooks');

const fileCount = 100;
const fileSize = 1 * 1024 * 1024 * 1024; // 1GB
const s3Path = 's3://your-bucket/path';

async function main() {
  const conn = await amqp.connect('amqp://rabbitmq');
  const ch = await conn.createChannel();
  const q = 'upload_file_tasks';
  await ch.assertQueue(q);

  const startTime = performance.now();

  for (let i = 0; i < fileCount; i++) {
    const msg = {
      fileId: `file_${i + 1}`,
      fileSize,
      s3Path,
    };
    ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)));
  }

  console.log(`[x] ${fileCount} tasks sent`);

  setTimeout(() => {
    const endTime = performance.now();
    const timeToCopy = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`✅ All files uploaded. Time: ${timeToCopy} sec`);
    process.exit(0);
  }, fileCount * 300);
}

main().catch(console.error);
