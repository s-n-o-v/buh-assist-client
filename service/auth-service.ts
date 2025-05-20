const AuthService = () => {
  const login = async (email: string, password: string) => {
    const { data, error } = await useFetch(`/api/auth/login`, {
      method: "POST",
      body: {
        email,
        password
      },
    });
    if (error.value) {
      throw new Error(error.value?.data?.message || 'Ошибка входа');
    }

    const auth = useState('auth', () => false);
    auth.value = true;

    return data.value;
  };

  const logout = async () => {
    const { data, error } = await useFetch('/api/auth/logout', {
      method: "POST",
    });

    if (error.value) {
      throw error.value;
    }

    const auth = useState('auth', () => false);
    auth.value = false;

    navigateTo('/login');

    return data.value;
  };

  return {
    login,
    logout,
  };
};

export default AuthService;
