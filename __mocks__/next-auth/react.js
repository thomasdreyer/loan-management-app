module.exports = {
    useSession: jest.fn(() => {
      return {
        data: null,
        status: 'unauthenticated',
      };
    }),
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
  