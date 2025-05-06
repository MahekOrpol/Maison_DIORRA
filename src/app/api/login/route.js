// pages/api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const response = await fetch(
      `http://localhost:4000/users?email=${email}&password=${password}`
    );
    const users = await response.json();

    if (users.length === 1) {
      const user = users[0];
      // Simulate setting session or cookie here if needed
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
}
