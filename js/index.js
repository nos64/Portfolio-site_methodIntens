{
  //Модальное окно и запрет скрола при октрыпии модального окна
  const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.scrollPosition = window.scrollY;
    document.documentElement.style.cssText = `
    position: relstive;
    height: 100vh;
    `;

    document.body.style.cssText = `
  overflow: hidden;
  position: fixed;
  top: -${document.body.scrollPosition}px;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding-right: ${widthScroll}px;
`;
  };

  const enableScroll = () => {
    document.documentElement.style.cssText = ``;
    document.body.style.cssText = `position: relative`;
    window.scroll({ top: document.body.scrollPosition });
  };

  const presentOrderBtn = document.querySelector(".present__order-btn");
  const pageOverlayModal = document.querySelector(".page__overlay_modal");
  const modalClose = document.querySelector(".modal__close");

  const handlerModal = (
    openBtn,
    modal,
    openSelector,
    closeTrigger,
    speedKey = "default"
  ) => {
    let opacity = 0;

    const speed = {
      slow: 0.02,
      medium: 0.05,
      fast: 0.1,
    };

    const openModal = () => {
      disableScroll();
      modal.style.opacity = opacity;

      modal.classList.add(openSelector);
      const anim = () => {
        opacity += speed[speedKey];
        modal.style.opacity = opacity;
        if (opacity < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    };

    const closeModal = () => {
      disableScroll();
      const anim = () => {
        opacity -= speed[speedKey];
        modal.style.opacity = opacity;
        if (opacity > 0) {
          requestAnimationFrame(anim);
        } else {
          modal.classList.remove(openSelector);
        }
      };
      requestAnimationFrame(anim);
    };

    openBtn.addEventListener("click", openModal);

    closeTrigger.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  };

  handlerModal(
    presentOrderBtn,
    pageOverlayModal,
    "page__overlay_modal_open",
    modalClose,
    "medium"
  );
}

{
  // Бургер-меню

  const headerContactsBurger = document.querySelector(
    ".header__contacts-burger"
  );
  const headerContacts = document.querySelector(".header__contacts");

  const handlerBurger = (openBtn, menu, openSelector) => {
    openBtn.addEventListener("click", () => {
      if (menu.classList.contains(openSelector)) {
        menu.style.height = "";
        menu.classList.remove(openSelector);
      } else {
        menu.style.height = menu.scrollHeight + "px";
        menu.classList.add(openSelector);
      }
    });
  };

  handlerBurger(headerContactsBurger, headerContacts, "header__contacts_open");
}
