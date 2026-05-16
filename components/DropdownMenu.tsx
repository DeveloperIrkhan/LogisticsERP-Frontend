import Link from 'next/link';
import React from 'react'


type DropdownMenuProps = {
  title: string;
  navLinks: string;
};


const DropdownMenu = ({ title, navLinks }: DropdownMenuProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {navLinks.split(',').map((link, index) => (
          <li key={index}>
            <Link href={link.trim()}>{link.trim()}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownMenu