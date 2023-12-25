"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import menu from "@/app/utils/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

function Sidebar() {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathName = usePathname();
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay" />
        <div className="image">
          <Image width={70} height={70} src="/avatar.jpeg" alt="profile" />
        </div>
        <h1>
          <span>John</span>
          <span>Doe</span>
        </h1>
        <ul className="nav-items">
          {menu.map((item) => {
            return (
              <li
                className={`nav-item ${pathName === item.link ? "active" : ""}`}
                key={item.id}
                onClick={() => {
                  handleClick(item.link);
                }}
              >
                {item.icon}
                <Link href={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
`;
export default Sidebar;
