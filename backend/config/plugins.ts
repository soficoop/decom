module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        cdn: env("DO_SPACE_CDN", "false"),
        accessKeyId: env("DO_SPACE_ACCESS_KEY"),
        secretAccessKey: env("DO_SPACE_SECRET_KEY"),
        endpoint: env("DO_SPACE_ENDPOINT"),
        params: {
          Bucket: env("DO_SPACE_BUCKET"),
        }
      },
    },
  },
});