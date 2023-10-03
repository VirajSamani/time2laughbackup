const isAuth = () => (localStorage.getItem("authToken") ? true : false);

export { isAuth };
