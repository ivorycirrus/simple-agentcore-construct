import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  name: 'simple-agentcore-runtime-patterns',
  description:
    'AWS CDK construct library for deploying Bedrock AgentCore Runtime',
  author: '@ivorycirrus',
  authorAddress: 'ivorycirrus@gmail.com',
  repositoryUrl:
    'https://github.com/ivorycirrus/simple-agentcore-construct.git',
  licensed: true,
  license: 'MIT-0',
  copyrightOwner: '@ivorycirrus',
  copyrightPeriod: '2025',

  // Project Configs
  projenrcTs: true,
  cdkVersion: '2.221.0',
  jsiiVersion: '~5.9.0',
  deps: [
    'cdk-nag',
    'cdk-ecr-deployment',
    '@aws-cdk/aws-lambda-python-alpha',
  ],

  // Packing Options
  packageName: 'simple-agentcore-runtime-patterns',
  publishToPypi: {
    distName: 'simple-agentcore-runtime-patterns',
    module: 'simple_agentcore_runtime_patterns',
  },

  // Release options
  defaultReleaseBranch: 'release',
  buildWorkflowOptions: { mutableBuild: false }, // Disable self-mutation in build workflow
  depsUpgrade: false, // Disable automatic dependency upgrades
  mergify: false, // Disable mergify
  npmignore: ['AGENTS.md'], // Exclude AGENTS.md from package
});

// ESLint Rules
project.eslint?.addRules({
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
});

project.synth();
