import { useCallback } from "react";

interface RoomStatusProps {
  status: string;
  contents: Record<string, string>;
  className?: string;
}

const RoomStatus = ({ status, contents, className }: RoomStatusProps) => {
  const getRoomStatusClass = useCallback(() => {
    switch (status) {
      case "Available":
        return "text-green-400 bg-green-400/10";
      case "Not available":
        return "text-rose-400 bg-rose-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  }, [status]);

  return (
    <div className={`flex items-center gap-x-2 ${className}`}>
      <div className={`flex-none rounded-full p-1 ${getRoomStatusClass()}`}>
        <div className="size-1.5 rounded-full bg-current" />
      </div>
      <div className="text-sm/6">
        {contents[status] || contents.room_status_undefined}
      </div>
    </div>
  );
};

export default RoomStatus;
