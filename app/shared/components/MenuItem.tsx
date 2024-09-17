"use client";
import Link from "next/link";
import React from "react";
import { menuItems } from "../data/MenuItem";
import { ModeToggle } from "./theme_mode/ModeToggle";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";
import originPath from "../data/PathHelper";

const MenuItem = () => {
  const path = usePathname();
  const token = localStorage.getItem("token");

  return (
    <>
      {path?.includes("dashboard") ? (
        ""
      ) : (
        <header className="">
          <div className="container">
            <div className="flex items-center justify-between">
              <Link href="/" className="site-name flex items-center gap-1">
                <Image
                  src={originPath.logo}
                  width={40}
                  height={40}
                  alt="Diocèse de Tolagnaro"
                />
                Diocèse de Tolagnaro
              </Link>
              <div className="flex items-center gap-3">
                {menuItems?.map(
                  (item: { to: string; label: string }, index: number) => (
                    <Link
                      className="menu-item-link md:flex hidden"
                      href={item?.to}
                      key={index}
                    >
                      {item?.label}
                    </Link>
                  )
                )}
                {!token && (
                  <Link className="menu-item-link md:flex hidden" href="/login">
                    Se connecter
                  </Link>
                )}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      className="rounded-[5px] flex md:hidden dark:text-[#ffe009] text-[#22364f]"
                      size="icon"
                    >
                      <AlignJustify className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="menu-item-sheet">
                    <div className="flex flex-col gap-3">
                      {menuItems?.map(
                        (
                          item: { to: string; label: string },
                          index: number
                        ) => (
                          <Link
                            className="menu-item-link text-[#ffe009]"
                            href={item?.to}
                            key={index}
                          >
                            {item?.label}
                          </Link>
                        )
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
                <ModeToggle />
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default MenuItem;
