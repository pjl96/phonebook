
export const getStorage = key => {
    if (localStorage.getItem(key) !== null) {
        return localStorage.getItem(key);
    } else {
        return [];
    }
};

export const setStorage = (key, obj) => {
    let item;
    try {
        item = JSON.parse(getStorage(key));
    } catch {
        item = getStorage(key);
    }
    item.push(obj);
    localStorage.setItem(key, JSON.stringify(item));
};

export const removeStorage = phone => {
    const newContactList = JSON.parse(getStorage('Contacts'));
    for (let i = 0; i < newContactList.length; i++) {
        if (newContactList[i].phone === phone) {
            newContactList.splice(i, 1);
        }
    }
    localStorage.setItem('Contacts', JSON.stringify(newContactList));
};
