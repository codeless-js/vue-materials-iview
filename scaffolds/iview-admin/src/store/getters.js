const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  phone: state => state.user.phone,
  role: state => state.user.role,
  email: state => state.user.email,
};
export default getters;
