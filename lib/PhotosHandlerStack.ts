import { Fn, Stack, StackProps } from "aws-cdk-lib";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class PhotosHandlerStack extends Stack {
    private stackSuffix: string;
    private targetBucket = Fn.importValue('photos-bucket');

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new LambdaFunction(this, 'PhotosHandler', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: Code.fromInline(`
                export async function handler(event) => {
                    console.log("hello!: " + process.env.TARGET_BUCKET);
                }
                `),
            environment: {
                TARGET_BUCKET: this.targetBucket,
            }
        });
    }
}