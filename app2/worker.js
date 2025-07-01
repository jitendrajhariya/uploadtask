const amqp = require('amqplib');

async function uploadFile(file) {
  console.log(`[>] Creating and uploading ${file.fileId} of size ${file.fileSize}B to ${file.s3Path}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`[✔] Uploaded ${file.fileId}`);
}

async function main() {
  const conn = await amqp.connect('amqp://rabbitmq');
  const ch = await conn.createChannel();
  const q = 'upload_file_tasks';
  await ch.assertQueue(q);

  ch.consume(q, async msg => {
    if (msg !== null) {
      const file = JSON.parse(msg.content.toString());
      await uploadFile(file);
      ch.ack(msg);
    }
  });

  console.log('[*] Worker ready. Waiting for messages...');
}

main().catch(console.error);
