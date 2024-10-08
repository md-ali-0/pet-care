import * as Icon from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface MenuItem {
    name: string;
    icon: string;
    path: string;
}

interface SideBarMenuItemProps {
    menu: MenuItem;
}

const SideBarMenuItem: FC<SideBarMenuItemProps> = ({ menu }) => {
    const { name, icon, path } = menu;
    const IconComponent = Icon[icon as keyof typeof Icon] as FC<{
        size?: number;
    }>;
    const pathname = usePathname();
    
    return (
        <li className="py-0.5 ">
            <Link
                href={path}
                className={pathname === path ? "sideLinkActive" : "sideLink"}
            >
                {IconComponent && <IconComponent size={20} />}
                {name}
            </Link>
        </li>
    );
};

export default SideBarMenuItem;
