/** @type {import('next').NextConfig} */
const nextConfig = {
  // Outras opções da config (caso você tenha)
  eslint: {
    ignoreDuringBuilds: true, // ← Essa linha faz a Vercel ignorar erros do ESLint
  },
};

export default nextConfig;
