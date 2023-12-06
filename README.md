# Redis Connect Infrastructure

This project provisions a zero-config infrastructure on AWS.

The only input needed is the AWS credentials and a public key to be able to SSH into the EC2 instance.

# Prerequisites

- Install [Pulumi](https://www.pulumi.com/docs/get-started/install/)
- Install Language Runtime ([Node.js](https://nodejs.org/en/download/))
- Configure Pulumi to access your AWS account

If you have previously installed and configured the AWS CLI, Pulumi will respect and use your configuration settings.

If you do not have the AWS CLI installed or plan on using Pulumi from within a CI/CD pipeline, retrieve your access key ID and secret access key and then set the following environment variables on your workstation:

```shell
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
export AWS_REGION=<YOUR_AWS_REGION>
```

Your AWS credentials file is now located in your home directory at .aws/credentials.

You can also create the shared credentials file by hand. For example:

```shell
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

<details>
  <summary>Set AWS region</summary>

  You may alternatively set the AWS region in your Pulumi.yaml:

  ```shell
  pulumi config set aws:region <your-region>
  ```
</details>

<details>
  <summary>Set AWS profile</summary>

  You can specify which profile to use with Pulumi through one of the following methods:

  - Set AWS_PROFILE as an environment variable
  ```shell
  export AWS_PROFILE=<YOUR_PROFILE_NAME>
  ```

  - Set `aws:profile` in your Pulumi.yaml
  ```shell
  pulumi config set aws:profile <profilename>
  ```
</details>

# Configuration

From the project root, run the following command to install the npm dependencies:

```bash
npm install
```

Your public key is needed to be able to SSH into the EC2 instances. To do so, copy your public key and run the following command:

```bash
pulumi config set redis-connect-infra:publicKey 'YOUR_SSH_PUBLIC_KEY'
```

# Deployment

To deploy the infrastrucre on AWS, run the following command:

```bash
pulumi up
```

# Access

Check the output of Pulumi deployment, where you can find the endpoints to Redis Enterprise as well as Redis Connect instances:
```
     Type                                    Name                       Status
 +   pulumi:pulumi:Stack                     redis-connect-infra-dev    created (73s)
 +   ├─ awsx:x:ec2:Vpc                       redis-connect              created (2s)
 +   │  ├─ awsx:x:ec2:InternetGateway        redis-connect              created (1s)
 +   │  │  └─ aws:ec2:InternetGateway        redis-connect              created (2s)
 +   │  ├─ awsx:x:ec2:Subnet                 redis-connect-public-0     created (2s)
 +   │  │  ├─ aws:ec2:RouteTable             redis-connect-public-0     created (1s)
 +   │  │  ├─ aws:ec2:Subnet                 redis-connect-public-0     created (11s)
 +   │  │  ├─ aws:ec2:Route                  redis-connect-public-0-ig  created (1s)
 +   │  │  └─ aws:ec2:RouteTableAssociation  redis-connect-public-0     created (1s)
 +   │  ├─ aws:ec2:Vpc                       redis-connect              created (14s)
 +   │  └─ awsx:x:ec2:Subnet                 redis-connect-public-1     created (2s)
 +   │     ├─ aws:ec2:Subnet                 redis-connect-public-1     created (11s)
 +   │     ├─ aws:ec2:RouteTable             redis-connect-public-1     created (2s)
 +   │     ├─ aws:ec2:Route                  redis-connect-public-1-ig  created (1s)
 +   │     └─ aws:ec2:RouteTableAssociation  redis-connect-public-1     created (1s)
 +   ├─ aws:ec2:KeyPair                      redis-connect-access       created (0.98s)
 +   ├─ aws:ec2:SecurityGroup                rc-redis-enterprise        created (5s)
 +   ├─ aws:ec2:SecurityGroup                rc-redis-connect           created (5s)
 +   ├─ aws:ec2:Instance                     rc-redis-enterprise-1      created (24s)
 +   └─ aws:ec2:Instance                     rc-redis-connect           created (17s)

Outputs:
    redisEndpoint : "ec2-54-196-112-162.compute-1.amazonaws.com"

Resources:
    + 20 created

Duration: 1m15s
```

- SSH ports are open on both EC2 instances `ssh ubuntu@ec2-54-196-112-162.compute-1.amazonaws.com`
- Ports 8443, 9443, 12000 (Demo DB) are open on Redis Enterprise instance.
- Username and password for RE are `admin@example.com` and `admin` respectively.

# Clean-up

Don't forget to destroy the created resources after you're done with it.

```bash
pulumi destroy
```
