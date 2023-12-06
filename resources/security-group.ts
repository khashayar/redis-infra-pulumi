import { SecurityGroup } from '@pulumi/aws/ec2';
import { Vpc } from '@pulumi/awsx/ec2';

export const securityGroup = (vpc: Vpc): SecurityGroup => {
  const sg = new SecurityGroup('rc-redis-enterprise', {
    vpcId: vpc.vpcId,
    ingress: [{
      description: 'SSH Access',
      fromPort: 22,
      toPort: 22,
      protocol: 'tcp',
      cidrBlocks: ['0.0.0.0/0'],
    }, {
      description: 'RE: pDNS',
      fromPort: 53,
      toPort: 53,
      protocol: 'udp',
      cidrBlocks: ['0.0.0.0/0'],
    }, {
      description: 'RE: Admin UI',
      fromPort: 8443,
      toPort: 8443,
      protocol: 'tcp',
      cidrBlocks: ['0.0.0.0/0'],
    }, {
      description: 'RE: RESTful API',
      fromPort: 9443,
      toPort: 9443,
      protocol: 'tcp',
      cidrBlocks: ['0.0.0.0/0'],
    }, {
      description: 'Database',
      fromPort: 10000,
      toPort: 19999,
      protocol: 'tcp',
      cidrBlocks: ['0.0.0.0/0'],
    }],
    egress: [{
      fromPort: 0,
      toPort: 0,
      protocol: '-1',
      cidrBlocks: ['0.0.0.0/0'],
    }]
  });

  return sg;
}
