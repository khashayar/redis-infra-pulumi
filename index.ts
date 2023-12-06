import { Config } from '@pulumi/pulumi';
import { vpc } from './resources/vpc';
import { keyPair } from './resources/keypair';
import { securityGroup } from './resources/security-group';
import { instanceRedis } from './resources/instance-redis';


export = async () => {
  const config = new Config();
  const publicKey = config.require('publicKey');

  const sg = securityGroup(vpc);
  const accessKey = keyPair(publicKey);

  const reInstance = await instanceRedis(vpc, sg, accessKey);

  return {
    redisEndpoint: reInstance.publicIp
  }
}
