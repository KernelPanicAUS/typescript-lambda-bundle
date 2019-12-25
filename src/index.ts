import EC2 from "aws-sdk/clients/ec2";

const client = new EC2({region: "eu-central-1"});

exports.handler = async (event: any, callback: any) => {
  console.info("hello from handler");
  const ids = await client.describeVpcs()
    .promise()
    .then(r => r)
    .catch(e => console.error(`Error occured: ${e.message}`));
  callback("hello world", null);
};
