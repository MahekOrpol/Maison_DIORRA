export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`
    );
    const users = await response.json();

    if (users.length === 1) {
      const user = users[0];
      return Response.json(
        {
          id: user.id,
          name: user.name,
          email: user.email
        },
        { status: 200 }
      );
    }

    return Response.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
