import { S3CreateEvent } from "aws-lambda";
import EC2 from "aws-sdk/clients/ec2";

const client = new EC2({ region: "eu-central-1" });
interface IResponse {
  statusCode: number;
  body: string;
}

exports.handler = async (event: S3CreateEvent) => {
  const ids: string[] | void = await client.describeVpcs()
    .promise()
    .then((r) => {
      if (r.Vpcs === undefined) {
        throw Error("Response did not contain any VPCs");
      }
      return r.Vpcs.map((v: EC2.Vpc) => v.VpcId ? v.VpcId : "");
    })
    .catch((e) => console.error(`Error occured: ${e.message}`));

  const response: IResponse = {
    body: JSON.stringify({ ids, input: event }),
    statusCode: 200,
  };

  return response;
};
