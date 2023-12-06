import { NatGatewayStrategy, SubnetType, Vpc } from '@pulumi/awsx/ec2';

export const vpc = new Vpc('redis-enterprise', {
  subnetSpecs: [{
    type: SubnetType.Public,
    cidrMask: 22,
  }],
  natGateways: {
    strategy: NatGatewayStrategy.None,
  }
});
