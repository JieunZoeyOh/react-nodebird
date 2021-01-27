module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { //MySQL에는 posts 테이블 생성
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // 필수
    },
  }, {
    // 이모티콘 사용 위해서 mb4 추가
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
  });
  Post.associate = (db) => { };
  return Post;
};
