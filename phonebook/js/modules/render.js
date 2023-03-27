
import create from './createElements.js';
import * as storage from './serviceStorage.js';

export const renderContacts = (elem) => {
    let item;
    try {
        item = JSON.parse(storage.getStorage('Contacts'));
    } catch {
        item = storage.getStorage('Contacts');
    }
    const allRow = item.map(create.createRow);
    elem.append(...allRow);
    return allRow;
};

export const renderPhoneBook = (app, title) => {
    const header = create.createHeader();
    const logo = create.createLogo(title);
    const main = create.createMain();
    const buttonGtoup = create.createButtonsGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'button',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger',
            type: 'button',
            text: 'Удалить',
        },
    ]);
    const table = create.createTable();
    const {form, overlay} = create.createForm();
    const footer = create.createFooter();
    const copyright = create.createCopyright();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGtoup.btnWrapper, table, overlay);
    footer.footerContainer.append(copyright);
    app.append(header, main, footer);

    return {
        list: table.tbody,
        logo,
        btnAdd: buttonGtoup.btns[0],
        btnDel: buttonGtoup.btns[1],
        formOverlay: overlay,
        form,
    };
};
