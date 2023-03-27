
import control from './modules/control.js';
import * as render from './modules/render';

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
        } = render.renderPhoneBook(app, title);

        // Функционал
        const allRow = render.renderContacts(list);
        const {closeModal} = control.modalControl(btnAdd, formOverlay);

        control.hoverRow(allRow, logo);
        control.deleteControl(btnDel, list);
        control.formControl(form, list, closeModal);
    };

    window.phoneBookInit = init;
}
