function storeUser(user) {
    if (typeof user !== 'object' || user === null) {
        throw new Error('Invalid user object');
    }
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function removeUser() {
    localStorage.removeItem('user');
}

export { storeUser, getUser, removeUser };