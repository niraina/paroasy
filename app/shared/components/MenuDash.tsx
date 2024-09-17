"use client";
import { useState, FC } from "react";
import { Home, User, Cog, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  label: string;
  icon: JSX.Element;
  subItems?: SubItems[];
}

interface SubItems {
  link: string;
  title: string;
}

const MenuItem: FC<MenuItemProps> = ({ label, icon, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div>
      <div
        className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </div>
        {subItems && (
          <div>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </div>
      {isOpen && subItems && (
        <div className="pl-8">
          {subItems.map((subItem: SubItems, index: number) => (
            <Link
              href={subItem.link}
              key={index}
              className={`p-2 hover:bg-gray-600 cursor-pointer block ${
                pathName === subItem.link && "bg-gray-600"
              } `}
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const MenuDash: FC = () => {
  return (
    <div className="min-h-screen h-full w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-2xl p-4 font-bold">Dashboard</div>
      <Link href="/" className="ps-4 text-[12px] uppercase">
        Aller au site
      </Link>
      <nav className="flex flex-col flex-1 p-4 space-y-2">
        <MenuItem
          label="Site web"
          icon={<Home size={24} />}
          subItems={[
            {
              link: "/dashboard/accueil",
              title: "Couverture",
            },
            {
              link: "/dashboard/article",
              title: "Actualitées",
            },
            {
              link: "/dashboard/diocese-page",
              title: "Page Diocèse",
            },
            {
              link: "/dashboard/tonokira",
              title: "Paroles",
            },
            {
              link: "/dashboard/radio/history",
              title: "Historique radio",
            },
            {
              link: "/dashboard/radio/daily-program",
              title: "Programme radio",
            },
            {
              link: "/dashboard/radio/personel",
              title: "Responsable radio",
            },
          ]}
        />
        <MenuItem
          label="Gestion"
          icon={<Cog size={24} />}
          subItems={[
            {
              link: "/dashboard/eglise",
              title: "Eglises",
            },
            {
              link: "/dashboard/preast",
              title: "Prêtres",
            },
            {
              link: "/dashboard/etablisement",
              title: "DIDEC",
            },
            {
              link: "/dashboard/ecole-cathesiste",
              title: "Ecole cathesiste",
            },
            {
              link: "/dashboard/eleve-cathesiste",
              title: "Etudiant cathesiste",
            },
            {
              link: "/dashboard/sante",
              title: "Centre de santé",
            },
          ]}
        />
      </nav>
    </div>
  );
};

export default MenuDash;
