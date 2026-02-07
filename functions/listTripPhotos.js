const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.dudbxqaxs,
  api_key: process.env.585216166498316,
  api_secret: process.env.FdqG2K6WrYIl7NIDpTEiAqiWCdk
});

exports.handler = async (event, context) => {
  const slug = event.queryStringParameters.slug; // e.g., "romero-canyon"
  const folder = `hikes/${slug}`;

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder + '/'
    });

    const urls = result.resources.map(r => r.secure_url);
    return {
      statusCode: 200,
      body: JSON.stringify(urls)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
