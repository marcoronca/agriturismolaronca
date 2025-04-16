import {
  AlbumIcon,
  ClockArrowDownIcon,
  ClockArrowUpIcon,
  HandCoinsIcon,
  Icon,
  Snowflake,
} from "lucide-react";
import { broom } from "@lucide/lab";

const IconSwitch = ({ icon }: { icon: string }) => {
  switch (icon.trim()) {
    case "Snowflake":
      return <Snowflake className="w-6 h-6" />;
    case "Broom":
      return <Icon iconNode={broom} className="w-6 h-6" />;
    case "HandCoins":
      return <HandCoinsIcon className="w-6 h-6" />;
    case "Album":
      return <AlbumIcon className="w-6 h-6" />;
    case "ClockArrowUp":
      return <ClockArrowUpIcon className="w-6 h-6" />;
    case "ClockArrowDown":
      return <ClockArrowDownIcon className="w-6 h-6" />;
    default:
      return null;
  }
};

export default IconSwitch;
