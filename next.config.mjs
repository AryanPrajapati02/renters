/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: [
            "localhost:3000",
            "6sv8xlp5-3000.inc1.devtunnels.ms"
          ]
        }
      },
      reactStrictMode: true,
      images: {
        domains: ['epfputdyovtehqlzerua.supabase.co'],
      },
};

export default nextConfig;
