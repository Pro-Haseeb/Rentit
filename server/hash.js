import bcrypt from 'bcrypt';

const generateHash = async () => {
  const plainPassword = 'admin123';
  const hash = await bcrypt.hash(admin123, 10);
  console.log("Hashed Password:", hash);
};

generateHash();
