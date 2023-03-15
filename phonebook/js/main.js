'use strict';

// const data = [
//     {
//         name: 'Иван',
//         surname: 'Петров',
//         phone: '+79514545454',
//     },
//     {
//         name: 'Игорь',
//         surname: 'Семёнов',
//         phone: '+79999999999',
//     },
//     {
//         name: 'Семён',
//         surname: 'Иванов',
//         phone: '+79800252525',
//     },
//     {
//         name: 'Мария',
//         surname: 'Попова',
//         phone: '+79876543210',
//     },
// ];

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);

        header.headerContainer = headerContainer;

        return header;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;

        return h1;
    };

    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();

        main.append(mainContainer);
        main.mainContainer = mainContainer;

        return main;
    };

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerContainer = createContainer();
        footer.append(footerContainer);

        footer.footerContainer = footerContainer;

        return footer;
    };

    const createCopyright = () => {
        const copyright = document.createElement('p');
        copyright.textContent = `Все права защищены ©️ Олег`;

        return copyright;
    };

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');

            button.type = type;
            button.textContent = text;
            button.className = className;

            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
            </tr>
        `);

        const tbody = document.createElement('tbody');
        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');

        form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя:</label>
                <input class="form-input" name="name"
                 id="name" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия:</label>
                <input class="form-input" name="surname"
                 id="surname" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон:</label>
                <input class="form-input" name="phone"
                 id="phone" type="number" required>
            </div>
        `);

        const buttonGtoup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);

        form.append(...buttonGtoup.btns);
        overlay.append(form);

        return {
            overlay,
            form,
        };
    };

    const getStorage = key => {
        if (localStorage.getItem(key) !== null) {
            return localStorage.getItem(key);
        } else {
            return [];
        }
    };

    const setStorage = (key, obj) => {
        let item;
        try {
            item = JSON.parse(getStorage(key));
        } catch {
            item = getStorage(key);
        }
        item.push(obj);
        localStorage.setItem(key, JSON.stringify(item));
    };

    const removeStorage = phone => {
        const newContactList = JSON.parse(getStorage('Contacts'));
        for (let i = 0; i < newContactList.length; i++) {
            if (newContactList[i].phone === phone) {
                newContactList.splice(i, 1);
            }
        }
        localStorage.setItem('Contacts', JSON.stringify(newContactList));
    };

    const createRow = ({name: firstName, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDel = document.createElement('td');

        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);
        tdDel.classList.add('delete');

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);

        tr.append(tdDel, tdName, tdSurname, tdPhone);


        return tr;
    };

    const renderContacts = (elem) => {
        let item;
        try {
            item = JSON.parse(getStorage('Contacts'));
        } catch {
            item = getStorage('Contacts');
        }
        const allRow = item.map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const main = createMain();
        const buttonGtoup = createButtonsGroup([
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
        const table = createTable();
        const {form, overlay} = createForm();
        const footer = createFooter();
        const copyright = createCopyright();

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

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

    const modalControl = (btnAdd, formOverlay) => {
        const openModal = () => {
            formOverlay.classList.add('is-visible');
        };

        const closeModal = () => {
            formOverlay.classList.remove('is-visible');
        };

        btnAdd.addEventListener('click', openModal);

        formOverlay.addEventListener('click', e => {
            const target = e.target;
            if (target === formOverlay ||
                 target.closest('.close')) {
                closeModal();
            }
        });

        return {
            closeModal,
        };
    };

    const deleteControl = (btnDel, list) => {
        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            });
        });

        list.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.del-icon')) {
                target.closest('.contact').remove();
                const removeContact = target.closest('.contact')
                    .cells[3].textContent;
                removeStorage(removeContact);
            }
        });
    };

    const addContactPage = (contact, list) => {
        list.append(createRow(contact));
    };

    const formControl = (form, list, closeModal) => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const newContact = Object.fromEntries(formData);

            addContactPage(newContact, list);
            setStorage('Contacts', newContact);
            form.reset();
            closeModal();
        });
    };

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const {
            list,
            logo,
            form,
            btnAdd,
            btnDel,
            formOverlay,
        } = renderPhoneBook(app, title);

        // Функционал
        const allRow = renderContacts(list);
        const {closeModal} = modalControl(btnAdd, formOverlay);

        hoverRow(allRow, logo);
        deleteControl(btnDel, list);
        formControl(form, list, closeModal);
    };

    window.phoneBookInit = init;
}
