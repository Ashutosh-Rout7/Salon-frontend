import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon'
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const DrawerList = ({menu,menu2}) => {

    const navigate = useNavigate();
    const location = useLocation();
    //curring function
 const handleClick = (item)=>() =>{
    navigate(item.path);
 }

  return (
    <div className='h-full '>
      <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
        <div className='space-y-2'>
          {
            menu.map((item,index)=>{
                return (
               <div
                key={index}
                onClick={handleClick(item)}
               className={`${item.path === location.pathname
                                ? "bg-primary-color text-secondary-color"
                                : "text-primary-color"
                       } cursor-pointer flex items-center px-5 py-3 rounded-full`}
>
                        <ListItemIcon>
                            {item.path === location.pathname ?item.activeIcon:item.icon}
                        </ListItemIcon>
                        <ListItemIcon>
                            {item.name}
                        </ListItemIcon>
                </div>
                );
            })
          }
        </div>

          <Divider/>

         <div className='space-y-2'>
          {
            menu2.map((item,index)=>{
                return (
               <div
               key={index}
               onClick={handleClick(item)}
               className={`${item.path === location.pathname
                                ? "bg-primary-color text-secondary-color"
                                : "text-primary-color"
                       } cursor-pointer flex items-center px-5 py-3 rounded-full`}
>
                        <ListItemIcon>
                            {item.path === location.pathname ?item.activeIcon:item.icon}
                        </ListItemIcon>
                        <ListItemIcon>
                            {item.name}
                        </ListItemIcon>
                </div>
                );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default DrawerList