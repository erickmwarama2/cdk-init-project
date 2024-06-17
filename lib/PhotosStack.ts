import { CfnOutput, Fn, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends Stack {
    private stackSuffix: string;
    public readonly photosBucketArn: string;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.initializeSuffix();

        const myBucket = new Bucket(this, 'PhotosBucket', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });

        // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket1165');

        // new CfnOutput(this, 'photos-bucket', {
        //     value: myBucket.bucketArn,
        //     exportName: 'photos-bucket'
        // });
        this.photosBucketArn = myBucket.bucketArn;
    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    }
}