
import createRow from './createElements.js';
import * as storage from './serviceStorage.js';

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
            storage.removeStorage(removeContact);
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
        storage.setStorage('Contacts', newContact);
        form.reset();
        closeModal();
    });
};

export default {
    hoverRow,
    modalControl,
    deleteControl,
    formControl,
};
