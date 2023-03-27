
import control from './modules/control.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';

{
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
        const {closeModal} = control.modalControl(btnAdd, formOverlay);

        control.hoverRow(allRow, logo);
        control.deleteControl(btnDel, list);
        control.formControl(form, list, closeModal);
    };

    window.phoneBookInit = init;
}
