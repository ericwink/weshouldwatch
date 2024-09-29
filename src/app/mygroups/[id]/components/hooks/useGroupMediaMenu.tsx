import { useState } from "react";

type MenuControl = {
  menuActive: boolean;
  chatActive: boolean;
  reasonActive: boolean;
};

const defaultMenuState: MenuControl = {
  chatActive: false,
  menuActive: false,
  reasonActive: false,
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

  return { toggleDrawer, menuState };
};

export default useGroupMediaMenu;
