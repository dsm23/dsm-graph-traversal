/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import 'twin.macro';

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    ref={ref}
    tw="bg-teal-900
  text-white 
  font-semibold
  py-2
  px-4
  border
  rounded
  shadow-xl
  hover:bg-teal-700
  focus:border-yellow-500
  focus:shadow-outline"
    {...props}
  />
));

export { Button };
