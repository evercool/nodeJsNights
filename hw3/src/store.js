let data = [];

const getLastId = () =>
    data.reduce((acc, val) => {
        return Math.max(acc, val.id);
    }, 0);

module.exports = {
    readAll: () => data,
    read: id => data.find(item => item.id === id),
    create: dog => {
        const item = { ...dog, id: getLastId() + 1 };
        data.push(item);
        return item;
    },
    delete: id => {
        const index = data.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        } else {
            data.splice(index, 1);
            return true;
        }
    },
    update: dog => {
        const { id } = dog;
        const index = data.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }

        data[index] = { ...data[index], ...dog };
    },
};
