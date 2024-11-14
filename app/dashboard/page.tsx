import MenuDash from '../shared/components/MenuDash';
import { PopLogOut } from '../shared/components/PopLogOut';

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex">
      <div className="w-64">
        <MenuDash />
      </div>
      <div className="flex-1">
        <div className="w-full bg-gray-800 text-white flex justify-end">
          <div className="w-[200px] py-2">
            <PopLogOut />
          </div>
        </div>
        <div className="px-[12px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
