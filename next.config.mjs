/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [75, 80, 85, 90],
  },
  async redirects() {
    return [
      // Old admin route — redirect to 404 so it reveals nothing
      {
        source: '/sanctum',
        destination: '/404',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
