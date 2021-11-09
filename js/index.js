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

  openBtn.addEventListener("click", () => {
    modal.style.opacity = opacity;

    modal.classList.add(openSelector);

    const anim = () => {
      opacity += speed[speedKey];
      modal.style.opacity = opacity;
      if (opacity < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  });

  closeTrigger.addEventListener("click", () => {
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
  });
};

handlerModal(
  presentOrderBtn,
  pageOverlayModal,
  "page__overlay_modal_open",
  modalClose,
  "medium"
);
