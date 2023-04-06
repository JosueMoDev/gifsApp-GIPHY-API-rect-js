import React from "react";
import {  MenuAccountComponent, AuthComponent } from "./";
import { useAuth } from "../hooks";

export const AccountComponent = () => {
  const { status } = useAuth()
  if (status === 'checking') { 
    return (<div className="flex w-full justify-center"><p className="text-lg text-white text-center">Checking authentication ...</p></div>)
  }
  return <>{(status === 'authenticated') ? <MenuAccountComponent /> : <AuthComponent/>}</>;
};