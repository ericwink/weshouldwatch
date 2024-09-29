import { useState } from "react";

type MenuControl = {
  menuActive: boolean;
  chatActive: boolean;
  reasonActive: boolean;
  deleteActive: boolean;
};

const defaultMenuState: MenuControl = {
  chatActive: false,
  menuActive: false,
  reasonActive: false,
  deleteActive: false,
};

const useGroupMediaMenu = () => {
  const [menuState, setMenuState] = useState<MenuControl>(defaultMenuState);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setMenuState((prev) => ({ ...prev, menuActive: !prev.menuActive }));
  };

  const toggleChat = () =>
    setMenuState((prev) => ({ ...prev, chatActive: !prev.chatActive }));

  const toggleReasonModal = () =>
    setMenuState((prev) => ({ ...prev, reasonActive: !prev.reasonActive }));

  const toggleDeleteModal = () =>
    setMenuState((prev) => ({ ...prev, deleteActive: !prev.deleteActive }));

  return {
    toggleDrawer,
    menuState,
    toggleChat,
    toggleDeleteModal,
    toggleReasonModal,
  };
};

export default useGroupMediaMenu;
