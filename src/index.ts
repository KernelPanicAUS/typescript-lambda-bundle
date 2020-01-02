import { Callback, S3CreateEvent } from "aws-lambda";
import EC2 from "aws-sdk/clients/ec2";

require("source-map-support").install({
  environment: "node",
});
const client = new EC2({ region: "eu-central-1" });

// tslint:disable-next-line: interface-name
interface Response {
  statusCode: number;
  body: string;
}
throw new Error("hello from the other side");
exports.handler = async (event: S3CreateEvent, callback: Callback) => {
  const ids: string[] | void = await client.describeVpcs()
    .promise()
    .then((r) => {
      if (r.Vpcs === undefined) {
        throw Error("Response did not contain any VPCs");
      }
      return r.Vpcs.map((v: EC2.Vpc) => v.VpcId ? v.VpcId : "");
    })
    .catch((e) => console.error(`Error occured: ${e.message}`));

  const response: Response = {
    body: ids ? ids[0] : "empty",
    statusCode: 200,
  };

  callback("hello world", null);
};
