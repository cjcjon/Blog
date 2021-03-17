const path = require("path");

module.exports = {
  // 프록시 설정
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
  sassOptions: {
    // sass 에서 @import의 기본 경로가 styles 부터 시작하게 해준다
    includePaths: [path.join(__dirname, "styles")],
  },
};
