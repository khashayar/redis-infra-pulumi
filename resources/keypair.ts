import { KeyPair } from '@pulumi/aws/ec2';

export const keyPair = (publicKey: string): KeyPair => {
  return new KeyPair('redis-enterprise', { publicKey })
}
