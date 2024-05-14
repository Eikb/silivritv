/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    swcMinify:false,
    env:{
       BASE_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    }
};

export default nextConfig;
