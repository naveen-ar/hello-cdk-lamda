import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import { CfnOutput } from 'aws-cdk-lib';

export class HelloCdkLamdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaFn = new NodejsFunction(this, "hello-cdk-lamda", {
      functionName: "my-hello-cdk-lambda",
      description: "Test Lambda function through CDK and CLI",
      // Node - LTS version
      runtime: Runtime.NODEJS_20_X,
      // Lamda function Path
      entry: "lib/lamdas/hello-lamda.tsx",
      // Additional config for esbuild
      bundling:{
        format: OutputFormat.ESM
      }
    });

    new CfnOutput(this, "LambdaFn-name", {
      value: lambdaFn.functionName,
    });

    new CfnOutput(this, "LambdaFn-Arn", {
      value: lambdaFn.functionArn
    });

    

    const functionUrl = lambdaFn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE
    })

    new CfnOutput(this, "LamdaFn-url", {
      value: functionUrl.url
    });
  
    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkLamdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
