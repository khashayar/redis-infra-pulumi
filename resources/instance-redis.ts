import { readFileSync } from 'fs';
import { getAmiOutput, Instance, KeyPair, SecurityGroup } from '@pulumi/aws/ec2';
import { Vpc } from '@pulumi/awsx/ec2';

export const instanceRedis = async (vpc: Vpc, sg: SecurityGroup, keyPair: KeyPair): Promise<Instance> => {
  const userData = readFileSync('./cloud-init/redis-enterprise.sh', { encoding: 'utf-8' });

  const ami = getAmiOutput({
    filters: [{
      name: 'name',
      values: ['ubuntu/images/hvm-ssd/ubuntu-jammy*'],
    }, {
      name: 'architecture',
      values: ['x86_64']
    }],
    owners: ['099720109477'],
    mostRecent: true
  });

  const ec2 = new Instance('rc-redis-enterprise-1', {
    instanceType: 't2.large',
    vpcSecurityGroupIds: [ sg.id ],
    subnetId: vpc.publicSubnetIds.apply(x => x![0]),
    ami: ami.id,
    userData,
    keyName: keyPair.id,
    tags: {
      owner: 'Redis Professional Services',
      organization: 'Redis',
      env: 'dev',
      skip_delete: 'no'
    }
  });

  return ec2;
}
