import nextMdx from '@next/mdx';

const withMDX = nextMdx();

const nextConfig = {
  experimental: {
    appDir: true
  }
};

export default withMDX(nextConfig);
